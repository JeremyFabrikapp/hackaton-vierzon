import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Marketplace", function () {
  async function deployMarketplaceFixture() {
    const [owner, seller, buyer] = await ethers.getSigners();

    const HybridESGMultiToken = await ethers.getContractFactory("HybridESGMultiToken");
    const hybridESGMultiToken = await HybridESGMultiToken.deploy("https://example.com/token/{id}.json");

    const CertifiedResourceExchange = await ethers.getContractFactory("CertifiedResourceExchange");
    const certifiedResourceExchange = await CertifiedResourceExchange.deploy();

    // Create and mint token batches
    await hybridESGMultiToken.createBatch(1, 100, "0x");
    await hybridESGMultiToken.createBatch(2, 100, "0x");
    await hybridESGMultiToken.setBatchESGCriteria(1, 80, 70, 90);
    await hybridESGMultiToken.setBatchESGCriteria(2, 75, 85, 80);

    // Deploy a mock ERC20 token for payments
    const MockERC20 = await ethers.getContractFactory("CustomERC20");
    const mockERC20 = await MockERC20.deploy("Mock Token", "MTK", 30000000000);

    // Mint some tokens for the buyer
    await mockERC20.mint(buyer.address, 1000);

    return { hybridESGMultiToken, certifiedResourceExchange, mockERC20, owner, seller, buyer };
  }

  describe("Marketplace Functionality", function () {
    it("Should list a resource, create an offer, list offers, and complete a purchase", async function () {
      const { hybridESGMultiToken, certifiedResourceExchange, mockERC20, seller, buyer } = await loadFixture(deployMarketplaceFixture);

      // Seller gives allowance to marketplace for ESG tokens
      await hybridESGMultiToken.connect(seller).setApprovalForAll(await certifiedResourceExchange.getAddress(), true);

      // Buyer gives allowance to marketplace for ESG tokens
      await hybridESGMultiToken.connect(buyer).setApprovalForAll(await certifiedResourceExchange.getAddress(), true);

      // Buyer gives allowance to marketplace for CustomERC20 tokens
      await mockERC20.connect(buyer).approve(await certifiedResourceExchange.getAddress(), ethers.parseEther("1000"));

      // Verify allowances
      expect(await hybridESGMultiToken.isApprovedForAll(seller.address, await certifiedResourceExchange.getAddress())).to.be.true;
      expect(await hybridESGMultiToken.isApprovedForAll(buyer.address, await certifiedResourceExchange.getAddress())).to.be.true;
      expect(await mockERC20.allowance(buyer.address, await certifiedResourceExchange.getAddress())).to.equal(ethers.parseEther("1000"));
      // Transfer ESG tokens to seller and buyer
      await hybridESGMultiToken.safeTransferFrom(await hybridESGMultiToken.getAddress(), seller.address, 1, 1, "0x");
      await hybridESGMultiToken.safeTransferFrom(await hybridESGMultiToken.getAddress(), buyer.address, 2, 1, "0x");

      // Seller lists their resource
      await expect(certifiedResourceExchange.connect(seller).listResource(100, await hybridESGMultiToken.getAddress(), 1))
        .to.emit(certifiedResourceExchange, "ResourceListed")
        .withArgs(1, await hybridESGMultiToken.getAddress(), 1, 100, seller.address);

      // Buyer creates an offer using their ESG token
      await expect(certifiedResourceExchange.connect(buyer).createOffer(1, 90, await hybridESGMultiToken.getAddress()))
        .to.emit(certifiedResourceExchange, "OfferCreated")
        .withArgs(1, 1, buyer.address, 90, await hybridESGMultiToken.getAddress());

      // List available offers
      const offers = await certifiedResourceExchange.getResourceOffers(1);
      expect(offers.length).to.equal(1);
      expect(offers[0]).to.equal(1);

      // Buyer creates another offer using CustomERC20
      await mockERC20.connect(buyer).approve(await certifiedResourceExchange.getAddress(), 95);
      await expect(certifiedResourceExchange.connect(buyer).createOffer(1, 95, await mockERC20.getAddress()))
        .to.emit(certifiedResourceExchange, "OfferCreated")
        .withArgs(2, 1, buyer.address, 95, await mockERC20.getAddress());

      // Set approval for the marketplace to transfer ESG tokens on behalf of the seller
      await hybridESGMultiToken.connect(seller).setApprovalForAll(await certifiedResourceExchange.getAddress(), true);

      // Seller accepts the CustomERC20 offer
      await expect(certifiedResourceExchange.connect(seller).acceptOffer(2))
        .to.emit(certifiedResourceExchange, "OfferAccepted")
        .withArgs(2, 1, seller.address, buyer.address)
        .and.to.emit(certifiedResourceExchange, "ResourceSold")
        .withArgs(1, buyer.address, 95);

      // Verify the transfer of tokens
      expect(await hybridESGMultiToken.balanceOf(buyer.address, 1)).to.equal(1);
      expect(await mockERC20.balanceOf(seller.address)).to.equal(95);
    });
  });

  describe("ESG Criteria", function () {
    it("Should correctly set and retrieve ESG criteria", async function () {
      const { hybridESGMultiToken } = await loadFixture(deployMarketplaceFixture);

      const criteria1 = await hybridESGMultiToken.getBatchESGCriteria(1);
      expect(criteria1.environmental).to.equal(80);
      expect(criteria1.social).to.equal(70);
      expect(criteria1.governance).to.equal(90);

      const criteria2 = await hybridESGMultiToken.getBatchESGCriteria(2);
      expect(criteria2.environmental).to.equal(75);
      expect(criteria2.social).to.equal(85);
      expect(criteria2.governance).to.equal(80);
    });
  });
});

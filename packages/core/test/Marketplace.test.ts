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

    // Create and mint a token batch
    await hybridESGMultiToken.createBatch(1, 100, "0x");
    await hybridESGMultiToken.setBatchESGCriteria(1, 80, 70, 90);

    // Deploy a mock ERC20 token for payments
    const MockERC20 = await ethers.getContractFactory("CustomERC20");
    const mockERC20 = await MockERC20.deploy("Mock Token", "MTK", 30000000000);

    return { hybridESGMultiToken, certifiedResourceExchange, mockERC20, owner, seller, buyer };
  }

  describe("Resource Listing", function () {
    it("Should list a resource", async function () {
      const { hybridESGMultiToken, certifiedResourceExchange, seller } = await loadFixture(deployMarketplaceFixture);

      await hybridESGMultiToken.safeTransferFrom(await hybridESGMultiToken.getAddress(), seller.address, 1, 1, "0x");
      
      await expect(certifiedResourceExchange.connect(seller).listResource(100, await hybridESGMultiToken.getAddress(), 1))
        .to.emit(certifiedResourceExchange, "ResourceListed")
        .withArgs(1, await hybridESGMultiToken.getAddress(), 1, 100, seller.address);
    });
  });

  describe("Offer Creation", function () {
    it("Should create an offer for a listed resource", async function () {
      const { hybridESGMultiToken, certifiedResourceExchange, mockERC20, seller, buyer } = await loadFixture(deployMarketplaceFixture);

      await hybridESGMultiToken.safeTransferFrom(await hybridESGMultiToken.getAddress(), seller.address, 1, 1, "0x");
      await certifiedResourceExchange.connect(seller).listResource(100, await hybridESGMultiToken.getAddress(), 1);

      await expect(certifiedResourceExchange.connect(buyer).createOffer(1, 90, await mockERC20.getAddress()))
        .to.emit(certifiedResourceExchange, "OfferCreated")
        .withArgs(1, 1, buyer.address, 90, await mockERC20.getAddress());
    });
  });

  describe("Offer Acceptance", function () {
    it("Should allow the resource owner to accept an offer", async function () {
      const { hybridESGMultiToken, certifiedResourceExchange, mockERC20, seller, buyer } = await loadFixture(deployMarketplaceFixture);

      await hybridESGMultiToken.safeTransferFrom(await hybridESGMultiToken.getAddress(), seller.address, 1, 1, "0x");
      await certifiedResourceExchange.connect(seller).listResource(100, await hybridESGMultiToken.getAddress(), 1);
      await certifiedResourceExchange.connect(buyer).createOffer(1, 90, await mockERC20.getAddress());

      // Mint some tokens for the buyer to pay with
      await mockERC20.mint(buyer.address, 100);
      await mockERC20.connect(buyer).approve(await certifiedResourceExchange.getAddress(), 90);

      // Set approval for the marketplace to transfer ESG tokens on behalf of the seller
      await hybridESGMultiToken.connect(seller).setApprovalForAll(await certifiedResourceExchange.getAddress(), true);

      await expect(certifiedResourceExchange.connect(seller).acceptOffer(1))
        .to.emit(certifiedResourceExchange, "OfferAccepted")
        .withArgs(1, 1, seller.address, buyer.address);
    });
  });

  describe("ESG Criteria", function () {
    it("Should correctly set and retrieve ESG criteria", async function () {
      const { hybridESGMultiToken } = await loadFixture(deployMarketplaceFixture);

      const criteria = await hybridESGMultiToken.getBatchESGCriteria(1);
      expect(criteria.environmental).to.equal(80);
      expect(criteria.social).to.equal(70);
      expect(criteria.governance).to.equal(90);
    });
  });
});

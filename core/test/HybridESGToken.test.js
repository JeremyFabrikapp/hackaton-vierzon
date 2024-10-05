const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('HybridESGToken', function () {
    it('Should deploy and assign initial supply', async function () {
        const [owner] = await ethers.getSigners();
        const HybridESGToken = await ethers.getContractFactory("HybridESGToken");
        const token = await HybridESGToken.deploy("Hybrid ESG Token", "HET", 1000000);
        await token.deployed();

        expect(await token.balanceOf(owner.address)).to.equal(1000000);
    });

    it('Should set and get ESG criteria', async function () {
        const [owner] = await ethers.getSigners();
        const HybridESGToken = await ethers.getContractFactory("HybridESGToken");
        const token = await HybridESGToken.deploy("Hybrid ESG Token", "HET", 1000000);
        await token.deployed();

        await token.setESGCriteria(owner.address, 70, 80, 90);
        const criteria = await token.getESGCriteria(owner.address);

        expect(criteria.environmental).to.equal(70);
        expect(criteria.social).to.equal(80);
        expect(criteria.governance).to.equal(90);
    });
});

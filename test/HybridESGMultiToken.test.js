const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('HybridESGMultiToken', function () {
    let ESGToken, token, owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        ESGToken = await ethers.getContractFactory("HybridESGMultiToken");
        token = await ESGToken.deploy("https://token-cdn-domain/metadata/");
        await token.deployed();
    });

    it('Should create a batch of tokens and assign ESG criteria', async function () {
        const batchId = 1;
        const amount = 100;

        await token.createBatch(batchId, amount, "0x00");
        let balance = await token.balanceOf(owner.address, batchId);

        expect(balance).to.equal(amount);

        await token.setBatchESGCriteria(batchId, 70, 80, 90);
        const criteria = await token.getBatchESGCriteria(batchId);

        expect(criteria.environmental).to.equal(70);
        expect(criteria.social).to.equal(80);
        expect(criteria.governance).to.equal(90);
    });
});

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const RegisterMetadataModule = buildModule("RegisterMetadata", (m) => {
    const [deployer] = [m.getAccount(0)];
    const registerMetadata = m.contract("RegisterMetadata", []);
    // return

    
    // Grant CAK role to the deployer first
    m.call(registerMetadata, "grantRole", [
        ethers.keccak256(ethers.toUtf8Bytes("CAK_ROLE")),
        deployer
    ]);
    return
    // Set initial bond data
    m.call(registerMetadata, "setBondData", [
        "Green Bond",                   // name
        ethers.parseEther("1000000"),   // expectedSupply (1 million tokens)
        ethers.encodeBytes32String("USD"), // currency
        ethers.parseEther("100"),       // unitVal (100 USD per token)
        500,                            // couponRate (5.00%)
        Math.floor(Date.now() / 1000),  // issuanceDate (current timestamp)
        Math.floor(Date.now() / 1000) + 31536000, // maturityDate (1 year from now)
        3600                            // cutOffTime (1 hour)
    ]);

    // Add a coupon date
    m.call(registerMetadata, "addCouponDate", [
        Math.floor(Date.now() / 1000) + 15768000 // 6 months from now
    ]);

    // Make the contract ready
    m.call(registerMetadata, "makeReady");

    return { registerMetadata };
});

export default RegisterMetadataModule;

// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const RegistryModule = buildModule("RegistryModule", (m) => {
  // Deploy the Registry contract
  const deployer = m.getAccount(0);

  // Sample data generation
  const generateSampleBondData = () => {
    const now = Math.floor(Date.now() / 1000);
    const oneDay = 86400;
    const oneYear = 31536000;

    return {
      bondName: `${Math.random().toString(36).substring(7)} Bond ${new Date().getFullYear() + 1}`,
      isin: `${Math.random().toString(36).substring(2, 4).toUpperCase()}${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
      expectedSupply: Math.floor(Math.random() * 90000000) + 10000000,
      currency: ethers.encodeBytes32String("USD"),
      unitVal: 1000,
      couponRate: 375, // 3.75%
      creationDate: now,
      issuanceDate: now + oneDay * 7, // 1 week from now
      maturityDate: now + oneYear * 5, // 5 years from now
      couponDates: [
        now + oneYear,
        now + oneYear * 2,
        now + oneYear * 3,
        now + oneYear * 4,
        now + oneYear * 5
      ],
      cutoffTime: 7200 // 2 hours
    };
  };

  const bondData = generateSampleBondData();

  const registry = m.contract("Register", [
    bondData.bondName,
    bondData.isin,
    bondData.expectedSupply,
    bondData.currency,
    bondData.unitVal,
    bondData.couponRate,
    bondData.creationDate,
    bondData.issuanceDate,
    bondData.maturityDate,
    bondData.couponDates,
    bondData.cutoffTime
  ]);

  return { registry };
});

export default RegistryModule;

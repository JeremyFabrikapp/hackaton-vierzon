// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RegistryModule = buildModule("RegistryModule", (m) => {
  // Deploy the Registry contract
  const deployer = m.getAccount(0);

  const registry = m.contract("Register", [
    "BondName",
    "ISIN123456",
    1000000, // expectedSupply
    m.getParameter("currency", "0x4555520000000000000000000000000000000000000000000000000000000000"), // EUR in bytes32
    100, // unitVal
    5, // couponRate (5%)
    Math.floor(Date.now() / 1000), // creationDate (current timestamp)
    Math.floor(Date.now() / 1000) + 86400, // issuanceDate (1 day from now)
    Math.floor(Date.now() / 1000) + 31536000, // maturityDate (1 year from now)
    [], // couponDates (empty array for now)
    3600 // cutofftime (1 hour)
  ]);

  return { registry };
});

export default RegistryModule;

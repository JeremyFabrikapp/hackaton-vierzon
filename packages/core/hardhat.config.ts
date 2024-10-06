import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  // solidity: "0.8.27",
  paths: {
    sources: "./contracts",
  },
  solidity: {
    settings: {
      optimizer: {
        allowUnlimitedContractSize: true,
        enabled: true,
        runs: 2000,
      },
    },
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          allowUnlimitedContractSize: true,
          optimizer: {

            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  networks:
  {
    hardhat: {
      allowUnlimitedContractSize: true,
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
    },
  }


};

export default config;

# GreenVest: Sustainable Resource Management and Green Finance Platform

## Project Overview

GreenVest is an innovative blockchain-based platform that aims to revolutionize sustainable resource management and green finance. The project combines several key components:

1. Frontend (React.js)
2. SO CASH Contracts
3. SO BOND Contracts
4. ESG Multi-Token Integration

## Frontend

The frontend is built using React.js and provides an interface for users to interact with the platform's features. It includes components for managing ESG tokens, green bonds, and sustainable resources.

Key features:
- User authentication and authorization
- Resource tokenization interface
- Green bond issuance and management dashboard
- Certified resource trading platform
- Real-time carbon footprint tracking visualization

## SO CASH Contracts

The SO CASH contracts provide the foundation for managing digital cash transactions within the platform. These contracts are implemented in Solidity and include features for bank modules and account management.

Key components:
- SoCashBank: Manages bank operations and account creation
- SoCashAccount: Handles individual account operations
- IBANCalculator: Utility for IBAN-related functions

For implementation details, refer to: `packages/cacib/contracts/SoCashBank.sol`

## SO BOND Contracts

The SO BOND contracts handle the issuance, trading, and management of green bonds on the platform. These contracts are also implemented in Solidity and work in conjunction with the SO CASH system.

Key components:
- Register: Manages bond registration and lifecycle
- PrimaryIssuance: Handles initial bond issuance
- BilateralTrade: Facilitates trading of bonds between parties
- Coupon: Manages coupon payments
- Redemption: Handles bond redemption process

For an example of the BilateralTrade contract, refer to: `packages/cacib/contracts/BilateralTrade.sol`

## ESG Multi-Token Integration

The ESG Multi-Token system allows for the creation and management of tokens with associated Environmental, Social, and Governance (ESG) criteria. This system is built on top of the ERC1155 standard, allowing for both fungible and non-fungible tokens.

Key features:
- Creation of token batches with ESG criteria
- Setting and updating ESG criteria for token batches
- Querying ESG criteria for specific tokens

For the main contract implementation, refer to: `packages/cacib/contracts/ESGMultiToken.sol`

## Integration and Workflow

1. Users interact with the React.js frontend to access platform features.
2. The frontend communicates with the smart contracts deployed on the Ethereum blockchain.
3. SO CASH contracts handle the financial transactions and account management.
4. SO BOND contracts manage the lifecycle of green bonds, from issuance to redemption.
5. ESG Multi-Token contracts allow for the creation and management of sustainable resource tokens with associated ESG criteria.
6. The platform uses oracles (e.g., Chainlink) for real-time data feeds, such as carbon emissions tracking.

## Development and Deployment

The project uses Hardhat for smart contract development, testing, and deployment. For package management and script running, it utilizes npm/pnpm.

Key commands:
- Compile contracts: `npm run build` or `pnpm run compile`
- Run tests: `npm run test` or `pnpm run test`
- Deploy contracts: `npm run deploy` or `pnpm run deploy`

For more detailed information on the development setup, refer to the `package.json` files in the respective packages.

This documentation provides a high-level overview of the GreenVest project. For more detailed information on specific components or functionalities, refer to the individual contract files and their associated tests and scripts.

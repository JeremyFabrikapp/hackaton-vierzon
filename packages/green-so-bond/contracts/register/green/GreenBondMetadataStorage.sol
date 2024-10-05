// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

library GreenBondMetadataStorage {
    struct Layout {
        string greenBondURI;
        mapping(uint256 => string) greenBondReports;
    }

    bytes32 internal constant STORAGE_SLOT =
        keccak256("fevertokens.contracts.storage.GreenBondMetadata");

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}

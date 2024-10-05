// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

import { IGreenBondMetadata } from "./IGreenBondMetadata.sol";
import { GreenBondMetadataInternal } from "./GreenBondMetadataInternal.sol";
import { GreenBondMetadataStorage } from "./GreenBondMetadataStorage.sol";
import { SmartContractAccessManagementInternal } from "../access/SmartContractAccessManagementInternal.sol";
import { ContextInternal } from "../../metatx/ContextInternal.sol";

contract GreenBondMetadata is IGreenBondMetadata, GreenBondMetadataInternal {
    /**
     * @inheritdoc IGreenBondMetadata
     */
    function submitGreenBondReport(
        uint256 couponDate_,
        string memory reportURI_
    ) public override {
        _submitGreenBondReport(couponDate_, reportURI_);
    }

    /**
     * @inheritdoc IGreenBondMetadata
     */
    function greenBondURI() public view override returns (string memory) {
        return _getGreenBondURI();
    }

    /**
     * @inheritdoc IGreenBondMetadata
     */
    function greenBondReports(
        uint256 couponDate_
    ) public view override returns (string memory) {
        return _getGreenBondReport(couponDate_);
    }
}

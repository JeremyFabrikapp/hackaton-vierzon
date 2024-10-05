// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

import { IGreenBondMetadataInternal } from "./IGreenBondMetadataInternal.sol";
import { GreenBondMetadataStorage } from "./GreenBondMetadataStorage.sol";
import { SmartContractAccessManagementInternal } from "../access/SmartContractAccessManagementInternal.sol";
import { ContextInternal } from "../../metatx/ContextInternal.sol";

abstract contract GreenBondMetadataInternal is
    IGreenBondMetadataInternal,
    ContextInternal,
    SmartContractAccessManagementInternal
{
    function _initialization(string memory greenBondURI_) internal {
        GreenBondMetadataStorage.Layout storage l = GreenBondMetadataStorage
            .layout();
        l.greenBondURI = greenBondURI_;
        emit GrendBondEmitted(greenBondURI_);
    }

    function _submitGreenBondReport(
        uint256 couponDate_,
        string memory reportURI_
    ) internal {
        require(
            _isContractAllowed(_msgSender()),
            "This contract is not whitelisted"
        );

        GreenBondMetadataStorage.Layout storage l = GreenBondMetadataStorage
            .layout();

        l.greenBondReports[couponDate_] = reportURI_;

        emit GreenBondReportAdded(couponDate_, reportURI_);
    }

    function _getGreenBondURI() internal view returns (string memory) {
        GreenBondMetadataStorage.Layout storage l = GreenBondMetadataStorage
            .layout();
        return l.greenBondURI;
    }

    function _getGreenBondReport(
        uint256 couponDate_
    ) internal view returns (string memory) {
        GreenBondMetadataStorage.Layout storage l = GreenBondMetadataStorage
            .layout();
        return l.greenBondReports[couponDate_];
    }
}

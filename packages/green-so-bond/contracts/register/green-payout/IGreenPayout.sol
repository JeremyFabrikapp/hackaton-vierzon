// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

import { IGreenBondMetadataInternal } from "./IGreenBondMetadataInternal.sol";

interface IGreenBondMetadata is IGreenBondMetadataInternal {
    /**
     * @notice Submit a report for a green bond
     * @param couponDate_ Date of the coupon
     * @param reportURI_ URI of the report
     */
    function submitGreenBondReport(
        uint256 couponDate_,
        string memory reportURI_
    ) external;

    /**
     * @notice Get the URI of the green bond metadata
     * @return URI of the green bond metadata
     */
    function greenBondURI() external view returns (string memory);

    /**
     * @notice Get the URI of the report for a green bond
     * @param couponDate_ Date of the coupon
     * @return URI of the report
     */
    function greenBondReports(
        uint256 couponDate_
    ) external view returns (string memory);
}

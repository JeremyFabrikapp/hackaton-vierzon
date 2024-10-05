// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

interface IGreenBondMetadataInternal {
    event GrendBondEmitted(string greenBondURI);
    event GreenBondReportAdded(uint256 indexed couponDate, string reportURI);
}

// SPDX-License-Identifier: MIT
// FeverTokens Contracts v1.0.0

pragma solidity ^0.8.20;

import { IGreenBondMetadata } from "./IGreenBondMetadata.sol";
import { GreenBondMetadataInternal } from "./GreenBondMetadataInternal.sol";
import { GreenBondMetadataStorage } from "./GreenBondMetadataStorage.sol";
import { SmartContractAccessManagementInternal } from "../access/SmartContractAccessManagementInternal.sol";
import { ICouponSnapshotManagement } from "../snapshot/ICouponSnapshotManagement.sol";
import { Coupon } from "../coupon/Coupon.sol";
import { ContextInternal } from "../../metatx/ContextInternal.sol";

contract GreenBondMetadata is IGreenBondMetadata, GreenBondMetadataInternal {
    ICouponSnapshotManagement public payoutToken;
    Coupon public couponContract;
    GreenBondMetadata public metadataContract;

    // Function to execute a payout to the Coupon smart contract
    function executePayout(
        uint256 couponDate,
        uint256 amount,
        string calldata reportURI
    ) external {
        // Ensure the caller is authorized to initiate payouts
        require(isAuthorized(msg.sender), "Not authorized to execute payout");

        // Calculate total payout amount needed
        uint256 totalPayoutAmount = couponContract.getTotalPaymentAmount();

        // Ensure there are enough tokens for the payout
        require(amount >= totalPayoutAmount, "Insufficient amount for payout");

        // Transfer the tokens from this contract to the Coupon contract
        require(
            payoutToken.transfer(address(couponContract), amount),
            "Transfer failed"
        );

        // Call the Coupon contract to distribute the payments to investors
        couponContract.distributePayments(couponDate);

        // Store the payout metadata in the GreenBondMetadata contract
        metadataContract.submitGreenBondReport(couponDate, reportURI);

        // Emit an event or take other actions as needed
    }

    // A function to check if an address is authorized to perform payouts
    function isAuthorized(address _address) internal view returns (bool) {
        // Implement authorization logic, could be based on a role or ownership
    }
}

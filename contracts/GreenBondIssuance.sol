// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GreenBondIssuance {
    struct Bond {
        uint256 id;
        address issuer;
        uint256 amount;
        uint256 maturity;
        bool redeemed;
    }

    uint256 public nextBondId;
    mapping(uint256 => Bond) public bonds;

    event BondIssued(uint256 id, address issuer, uint256 amount, uint256 maturity);
    event BondRedeemed(uint256 id);

    function issueBond(uint256 amount, uint256 maturity) external {
        bonds[nextBondId] = Bond(nextBondId, msg.sender, amount, maturity, false);
        emit BondIssued(nextBondId, msg.sender, amount, maturity);
        nextBondId++;
    }

    function redeemBond(uint256 bondId) external {
        Bond storage bond = bonds[bondId];
        require(msg.sender == bond.issuer, "Not bond issuer");
        require(!bond.redeemed, "Bond already redeemed");
        require(block.timestamp >= bond.maturity, "Bond not matured yet");

        bond.redeemed = true;
        emit BondRedeemed(bondId);
    }
}
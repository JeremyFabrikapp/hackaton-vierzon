// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomERC20 is ERC20, Ownable {
    uint256 public constant AIRDROP_AMOUNT = 500 * 10**18; // Assuming 18 decimals
    uint256 public constant AIRDROP_INTERVAL = 1 weeks;
    mapping(address => uint256) public lastAirdropTime;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply_);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function airdrop() public {
        require(
            block.timestamp >= lastAirdropTime[msg.sender] + AIRDROP_INTERVAL,
            "Airdrop: You can only claim once every week"
        );
        _mint(msg.sender, AIRDROP_AMOUNT);
        lastAirdropTime[msg.sender] = block.timestamp;
    }
}

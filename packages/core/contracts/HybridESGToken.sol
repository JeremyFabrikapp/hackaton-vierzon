// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HybridESGToken is ERC20, Ownable {
    struct ESGCriteria {
        uint8 environmental;
        uint8 social;
        uint8 governance;
    }

    mapping(address => ESGCriteria) private _esgRatings;

    event ESGCriteriaUpdated(address indexed account, ESGCriteria criteria);

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function setESGCriteria(address account, uint8 environmental, uint8 social, uint8 governance) public onlyOwner {
        _esgRatings[account] = ESGCriteria(environmental, social, governance);
        emit ESGCriteriaUpdated(account, _esgRatings[account]);
    }

    function getESGCriteria(address account) public view returns (ESGCriteria memory) {
        return _esgRatings[account];
    }
}

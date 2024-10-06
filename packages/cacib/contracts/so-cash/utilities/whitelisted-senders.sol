// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../intf/whitelisted-senders.sol";

abstract contract WhitelistedSenders is Ownable, IWhitelistedSenders {
    mapping(address => bool) private _whitelistedSenders;
    constructor(address initialOwner) Ownable(initialOwner) {
    }

    modifier onlyWhitelisted() {
        require(
            msg.sender == owner() || 
            _whitelistedSenders[msg.sender],
            "WLS: Caller not allowed to perform the action"
        );
        _;
    }

    function isWhitelisted(address a) public view virtual returns (bool) {
        return a == owner() || _whitelistedSenders[a];
    }

    function whitelist(address newSender) onlyWhitelisted() public virtual onlyWhitelisted {
        _whitelistedSenders[newSender] = true;
        emit Whitelisted(newSender, true);
    }

    function blacklist(address oldSender) onlyWhitelisted() public virtual onlyWhitelisted {
        _whitelistedSenders[oldSender] = false;
        emit Whitelisted(oldSender, false);
    }
}

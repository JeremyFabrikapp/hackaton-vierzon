// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract HybridESGMultiToken is ERC1155 {
    struct ESGCriteria {
        uint8 environmental;
        uint8 social;
        uint8 governance;
    }

    mapping(uint256 => ESGCriteria) private _batchESGCriteria;

    event ESGCriteriaUpdated(uint256 indexed batchId, ESGCriteria criteria);

    constructor(string memory uri) ERC1155(uri) {}

    function createBatch(uint256 batchId, uint256 amount, bytes memory data) public {
        _mint(msg.sender, batchId, amount, data);
    }

    function setBatchESGCriteria(uint256 batchId, uint8 environmental, uint8 social, uint8 governance) public {
        // Imagine que seule une adresse autorisée puisse définir les critères ESG
        _batchESGCriteria[batchId] = ESGCriteria(environmental, social, governance);
        emit ESGCriteriaUpdated(batchId, _batchESGCriteria[batchId]);
    }

    function getBatchESGCriteria(uint256 batchId) public view returns (ESGCriteria memory) {
        return _batchESGCriteria[batchId];
    }
}

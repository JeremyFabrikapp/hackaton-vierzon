// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ESGIntegration {
    struct ESGCriteria {
        uint8 environmental;
        uint8 social;
        uint8 governance;
    }

    mapping(uint256 => ESGCriteria) private tokenESGCriteria;

    function setESGCriteria(uint256 tokenId, uint8 environmental, uint8 social, uint8 governance) public {
        // Supposons que seule une adresse autorisée puisse définir les critères ESG
        tokenESGCriteria[tokenId] = ESGCriteria(environmental, social, governance);
    }

    function getESGCriteria(uint256 tokenId) public view returns (ESGCriteria memory) {
        return tokenESGCriteria[tokenId];
    }
}
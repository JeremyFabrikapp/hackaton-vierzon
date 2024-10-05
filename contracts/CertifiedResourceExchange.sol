// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertifiedResourceExchange {
    struct Resource {
        uint256 id;
        address owner;
        uint256 price;
        bool forSale;
    }

    uint256 public nextResourceId;
    mapping(uint256 => Resource) public resources;

    event ResourceListed(uint256 id, address owner, uint256 price);
    event ResourceSold(uint256 id, address newOwner, uint256 price);

    function listResource(uint256 price) external {
        resources[nextResourceId] = Resource(nextResourceId, msg.sender, price, true);
        emit ResourceListed(nextResourceId, msg.sender, price);
        nextResourceId++;
    }

    function buyResource(uint256 resourceId) external payable {
        Resource storage resource = resources[resourceId];
        require(resource.forSale, "Resource not for sale");
        require(msg.value >= resource.price, "Insufficient payment");

        address previousOwner = resource.owner;
        resource.owner = msg.sender;
        resource.forSale = false;

        payable(previousOwner).transfer(msg.value);
        emit ResourceSold(resourceId, msg.sender, resource.price);
    }
}
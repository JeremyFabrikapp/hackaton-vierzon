// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertifiedResourceExchange is ERC1155Holder, ReentrancyGuard, Pausable, Ownable {
    struct Resource {
        uint256 id;
        address esgToken;
        uint256 batchId;
        uint256 price;
        address seller;
    }

    struct Offer {
        uint256 id;
        uint256 resourceId;
        address bidder;
        uint256 amount;
        address paymentToken;
        bool isActive;
    }

    uint256 private _nextResourceId = 1;
    uint256 private _nextOfferId = 1;

    mapping(uint256 => Resource) public resources;
    mapping(uint256 => Offer) public offers;
    mapping(uint256 => uint256[]) public resourceOffers;

    event ResourceListed(uint256 indexed id, address indexed esgToken, uint256 indexed batchId, uint256 price, address seller);
    event ResourceSold(uint256 indexed id, address indexed newOwner, uint256 price);
    event OfferCreated(uint256 indexed offerId, uint256 indexed resourceId, address indexed bidder, uint256 amount, address paymentToken);
    event OfferAccepted(uint256 indexed offerId, uint256 indexed resourceId, address indexed seller, address buyer);
    event OfferCancelled(uint256 indexed offerId, uint256 indexed resourceId, address indexed bidder);

    constructor() Ownable(msg.sender) {}

    function listResource(uint256 price, address esgToken, uint256 batchId) external whenNotPaused {
        require(IERC1155(esgToken).balanceOf(msg.sender, batchId) > 0, "Seller must own the ESG token");
        require(price > 0, "Price must be greater than 0");
        
        uint256 newResourceId = _nextResourceId++;
        
        resources[newResourceId] = Resource(newResourceId, esgToken, batchId, price, msg.sender);
        emit ResourceListed(newResourceId, esgToken, batchId, price, msg.sender);
    }

    function createOffer(uint256 resourceId, uint256 amount, address paymentToken) external whenNotPaused {
        require(resources[resourceId].esgToken != address(0), "Resource does not exist");
        require(amount > 0, "Offer amount must be greater than 0");
        require(msg.sender != resources[resourceId].seller, "Seller cannot create an offer");
        
        uint256 newOfferId = _nextOfferId++;
        
        offers[newOfferId] = Offer(newOfferId, resourceId, msg.sender, amount, paymentToken, true);
        resourceOffers[resourceId].push(newOfferId);
        
        emit OfferCreated(newOfferId, resourceId, msg.sender, amount, paymentToken);
    }

    function acceptOffer(uint256 offerId) external nonReentrant whenNotPaused {
        Offer storage offer = offers[offerId];
        require(offer.isActive, "Offer is not active");
        
        Resource storage resource = resources[offer.resourceId];
        require(msg.sender == resource.seller, "Only resource owner can accept offers");
        require(IERC1155(resource.esgToken).balanceOf(msg.sender, resource.batchId) > 0, "Seller must still own the ESG token");
        
        IERC20 paymentToken = IERC20(offer.paymentToken);
        require(paymentToken.balanceOf(offer.bidder) >= offer.amount, "Insufficient balance");
        require(paymentToken.allowance(offer.bidder, address(this)) >= offer.amount, "Insufficient allowance");
        
        // Transfer payment
        require(paymentToken.transferFrom(offer.bidder, msg.sender, offer.amount), "Payment transfer failed");
        
        // Transfer ESG token
        IERC1155(resource.esgToken).safeTransferFrom(msg.sender, offer.bidder, resource.batchId, 1, "");
        
        // Deactivate offer and remove resource
        offer.isActive = false;
        delete resources[offer.resourceId];
        
        emit OfferAccepted(offerId, offer.resourceId, msg.sender, offer.bidder);
        emit ResourceSold(offer.resourceId, offer.bidder, offer.amount);
    }

    function cancelOffer(uint256 offerId) external whenNotPaused {
        Offer storage offer = offers[offerId];
        require(offer.isActive, "Offer is not active");
        require(msg.sender == offer.bidder, "Only bidder can cancel the offer");
        
        offer.isActive = false;
        emit OfferCancelled(offerId, offer.resourceId, msg.sender);
    }

    function getResourceOffers(uint256 resourceId) external view returns (uint256[] memory) {
        return resourceOffers[resourceId];
    }

    function getResource(uint256 resourceId) external view returns (Resource memory) {
        return resources[resourceId];
    }

    function getOffer(uint256 offerId) external view returns (Offer memory) {
        return offers[offerId];
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
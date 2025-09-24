// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title REITToken - Simplified REIT shares as ERC1155
contract REITToken is ERC1155, Ownable {
    IERC20 public stablecoin;

    struct Property {
        uint256 totalShares;
        uint256 pricePerShare;
        uint256 sharesSold;
    }

    mapping(uint256 => Property) public properties;
    uint256 public nextPropertyId;

    constructor(address _stablecoin, address initialOwner)
    ERC1155("https://example.com/api/item/{id}.json")
        Ownable(initialOwner)
    {
        stablecoin = IERC20(_stablecoin);
    }


    /// @notice Register a new property with share info
    function registerProperty(uint256 totalShares, uint256 pricePerShare) external onlyOwner {
        properties[nextPropertyId] = Property(totalShares, pricePerShare, 0);
        nextPropertyId++;
    }

    /// @notice Buy shares in a property
    function purchaseShares(uint256 propertyId, uint256 shareAmount) external {
        Property storage prop = properties[propertyId];
        require(prop.totalShares >= prop.sharesSold + shareAmount, "Not enough shares left");

        uint256 cost = prop.pricePerShare * shareAmount;
        require(stablecoin.transferFrom(msg.sender, address(this), cost), "Payment failed");

        prop.sharesSold += shareAmount;
        _mint(msg.sender, propertyId, shareAmount, "");
    }

    /// @notice Distribute yield to shareholders
    function distributeYield(uint256 propertyId, uint256 totalAmount) external onlyOwner {
        require(stablecoin.transferFrom(msg.sender, address(this), totalAmount), "Funding failed");

        uint256 total = properties[propertyId].sharesSold;
        require(total > 0, "No shareholders");

        for (uint256 i = 0; i < total; i++) {
            // In real case: track all holders
            // Here: simplified - owner can directly transfer to specific addresses
            // (We'll just approve test distribution in unit tests)
        }
    }
}

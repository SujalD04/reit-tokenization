// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title TestUSDC - A mock stablecoin for local simulation
contract TestUSDC is ERC20 {
    constructor() ERC20("Test USDC", "tUSDC") {
        // Mint 1,000,000 tokens to deployer for testing
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /// @notice Faucet function for testing
    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

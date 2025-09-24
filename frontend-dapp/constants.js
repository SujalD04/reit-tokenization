export const REIT_TOKEN_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const USDC_TOKEN_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const REIT_ABI = [
  // Minimal ABI
  "function registerProperty(uint256 totalShares, uint256 pricePerShare) external",
  "function purchaseShares(uint256 propertyId, uint256 shareAmount) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)"
];

export const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function faucet(address to, uint256 amount) external"
];

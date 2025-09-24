const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy TestUSDC
  const USDC = await hre.ethers.getContractFactory("TestUSDC");
  const usdc = await USDC.deploy();
  await usdc.deploymentTransaction().wait();
  console.log("TestUSDC deployed to:", usdc.target || usdc.address);

  // Deploy REITToken, passing TestUSDC address
  const REIT = await hre.ethers.getContractFactory("REITToken");
  const reit = await REIT.deploy(
    usdc.target || usdc.address,  // _stablecoin
    deployer.address              // initialOwner for Ownable
  );
await reit.deploymentTransaction().wait();
console.log("REITToken deployed to:", reit.target || reit.address);

  console.log("\n✅ Contracts deployed successfully on LOCAL Hardhat network!");
  console.log("TestUSDC address:", usdc.target || usdc.address);
  console.log("REITToken address:", reit.target || reit.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

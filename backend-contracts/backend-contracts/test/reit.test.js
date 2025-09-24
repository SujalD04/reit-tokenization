const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("REIT Tokenization", function () {
  let usdc, reit, owner, investor1, investor2;

  beforeEach(async function () {
    [owner, investor1, investor2] = await ethers.getSigners();

    // Deploy TestUSDC
    const USDC = await ethers.getContractFactory("TestUSDC");
    usdc = await USDC.deploy();

    // Deploy REITToken
    const REIT = await ethers.getContractFactory("REITToken");
    reit = await REIT.deploy(await usdc.getAddress(), owner.address);

    // Give investors some USDC
    await usdc.faucet(investor1.address, ethers.parseUnits("1000", 18));
    await usdc.faucet(investor2.address, ethers.parseUnits("1000", 18));
  });

  it("Should register a property", async function () {
    await reit.registerProperty(1000, ethers.parseUnits("10", 18));
    const property = await reit.properties(0);
    expect(property.totalShares).to.equal(1000);
  });

  it("Should allow investor to purchase shares", async function () {
    await reit.registerProperty(1000, ethers.parseUnits("10", 18));

    // Approve USDC spend
    await usdc.connect(investor1).approve(await reit.getAddress(), ethers.parseUnits("100", 18));

    // Buy 5 shares
    await reit.connect(investor1).purchaseShares(0, 5);

    expect(await reit.balanceOf(investor1.address, 0)).to.equal(5);
  });

  it("Should simulate yield distribution manually", async function () {
    await reit.registerProperty(1000, ethers.parseUnits("10", 18));

    await usdc.connect(investor1).approve(await reit.getAddress(), ethers.parseUnits("100", 18));
    await reit.connect(investor1).purchaseShares(0, 5);

    await usdc.connect(investor2).approve(await reit.getAddress(), ethers.parseUnits("100", 18));
    await reit.connect(investor2).purchaseShares(0, 5);

    // Owner simulates yield payout
    await usdc.faucet(owner.address, ethers.parseUnits("100", 18));
    await usdc.connect(owner).transfer(investor1.address, ethers.parseUnits("50", 18));
    await usdc.connect(owner).transfer(investor2.address, ethers.parseUnits("50", 18));

    expect(await usdc.balanceOf(investor1.address)).to.be.above(0);
  });
});

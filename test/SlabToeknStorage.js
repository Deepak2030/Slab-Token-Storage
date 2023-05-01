const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SlabTokenStorage", function () {
  let slabTokenStorage, ERC20Token, erc20Token, owner, addr1, addr2;

  beforeEach(async () => {
    ERC20Token = await ethers.getContractFactory("ERC20Token");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    
    const name = "My Token";
    const symbol = "MTK";
    const initialSupply = await ethers.utils.parseEther("1000");
    erc20Token = await ERC20Token.deploy(name,symbol,initialSupply);
    await erc20Token.deployed();

    const SlabTokenStorage = await ethers.getContractFactory("SlabTokenStorage");

    slabTokenStorage = await SlabTokenStorage.deploy(erc20Token.address);
    await slabTokenStorage.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Deposit", function () {
    it("Should deposit tokens to the highest available slab", async function () {
      await erc20Token.connect(owner).transfer(addr1.address, 1000);
      await erc20Token.connect(addr1).approve(slabTokenStorage.address, 1000);

      await slabTokenStorage.connect(addr1).deposit(100);
      expect(await slabTokenStorage.getSlabOfDepositor(addr1.address)).to.equal(0);

      await slabTokenStorage.connect(addr1).deposit(200);
      expect(await slabTokenStorage.getSlabOfDepositor(addr1.address)).to.equal(1);
    });

    it("Should emit Deposit event on deposit", async function () {
      await erc20Token.connect(owner).transfer(addr1.address, 1000);
      await erc20Token.connect(addr1).approve(slabTokenStorage.address, 1000);

      await expect(slabTokenStorage.connect(addr1).deposit(100))
        .to.emit(slabTokenStorage, "Deposit")
        .withArgs(addr1.address, 100, 0);
    });
  });

  describe("Withdraw", function () {
    it("Should withdraw tokens from the slab and delete deposit mapping", async function () {
      await erc20Token.connect(owner).transfer(addr1.address, 1000);
      await erc20Token.connect(addr1).approve(slabTokenStorage.address, 1000);

      await slabTokenStorage.connect(addr1).deposit(100);
      await slabTokenStorage.connect(addr1).withdraw();

      expect(await slabTokenStorage.getSlabOfDepositor(addr1.address)).to.equal(0);
      expect(await erc20Token.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should emit Withdraw event on withdraw", async function () {
      await erc20Token.connect(owner).transfer(addr1.address, 1000);
      await erc20Token.connect(addr1).approve(slabTokenStorage.address, 1000);

      await slabTokenStorage.connect(addr1).deposit(100);
      await expect(slabTokenStorage.connect(addr1).withdraw())
        .to.emit(slabTokenStorage, "Withdraw")
        .withArgs(addr1.address, 100, 0);
    });
  });

  describe("getSlabOfDepositor", function () {
    it("Should return correct slab of depositor", async function () {
      await erc20Token.connect(owner).transfer(addr1.address, 1000);
      await erc20Token.connect(addr1).approve(slabTokenStorage.address, 1000);

      await slabTokenStorage.connect(addr1).deposit(100);
      expect(await slabTokenStorage.getSlabOfDepositor(addr1.address)).to.equal(0);
    });
  });
});

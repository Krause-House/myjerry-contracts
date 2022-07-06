import { expect } from "chai";
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";

const jerryAbi: string[] = [];

describe("Jerry", function () {
  let jerry: Contract;
  const initialPrice: number = 10;
  let owner: Signer, alice: Signer, bob: Signer;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const Jerry = await ethers.getContractFactory("Jerry");
    jerry = await Jerry.deploy(initialPrice);
  });

  it("Should deploy the contract", async function () {
    await jerry.deployed();
    expect(jerry.deployed);
  });

  describe("setting the price", () => {
    it("initializes with the specified price", async () => {
      expect((await jerry.price()) == initialPrice);
    });

    it("does not allow updating the price", async () => {
      const aliceContract = givenJerryContract(alice);
      await expect(aliceContract.setPrice(5)).to.be.revertedWith(
        "Jerry: Unauthorized"
      );
    });

    it("allows updating the price as the admin", async () => {
      await jerry.setPrice(5);
      expect((await jerry.price()) == 5);
    });
  });

  const givenJerryContract = (signer: Signer) => {
    return new ethers.Contract(jerry.address, jerryAbi, signer);
  };
});

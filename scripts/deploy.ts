import { ethers } from "hardhat";

async function main() {
  const Jerry = await ethers.getContractFactory("Jerry");
  const jerry = await Jerry.deploy(0);

  await jerry.deployed();

  await jerry.transferOwnership("0x95add9dc65d6e26db140da8771e17571795f76a4");

  console.log("Jerry deployed to:", jerry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

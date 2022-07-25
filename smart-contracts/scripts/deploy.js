const { ethers } = require("hardhat");

const main = async () => {
  const Contract = await ethers.getContractFactory("StudPotato");

  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`NFT address: ${contract.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

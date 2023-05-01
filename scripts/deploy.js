const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const tokenAddress = '_tokenAddress'; 
  const slabTokenStorageFactory = await ethers.getContractFactory('SlabTokenStorage');
  const slabTokenStorage = await slabTokenStorageFactory.deploy(tokenAddress);

  console.log('SlabTokenStorage contract address:', slabTokenStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

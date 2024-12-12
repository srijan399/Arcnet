import { ethers } from "hardhat";

async function main() {
  // Get the ContractFactory for the contract
  const Insure = await ethers.deployContract("Insure");

  console.log("Deploying Insure...");

  // Wait for the deployment to complete
  await Insure.waitForDeployment();

  // Get the deployed contract's address
  const contractAddress = await Insure.getAddress();
  console.log("Insure deployed to:", contractAddress);
}

// Proper error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

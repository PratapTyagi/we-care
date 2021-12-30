const hre = require("hardhat");
const fs = require("fs");

const main = async () => {
  const factory = await hre.ethers.getContractFactory("Factory");
  const deployedContract = await factory.deploy();
  await deployedContract.deployed();
  const FactoryData = {
    address: deployedContract.address,
    abi: JSON.parse(deployedContract.interface.format("json")),
  };
  fs.writeFileSync("client/src/abi/Factory.json", JSON.stringify(FactoryData));

  let campaignAbi = fs.readFileSync(
    "artifacts/contracts/campaigns.sol/Campaign.json"
  );
  campaignAbi = JSON.parse(campaignAbi.toString()).abi;
  const CampaignData = {
    abi: campaignAbi,
  };
  fs.writeFileSync(
    "client/src/abi/Campaign.json",
    JSON.stringify(CampaignData)
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

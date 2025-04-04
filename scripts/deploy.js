const hre = require("hardhat");

async function main() {
    const GasFeeTracker = await hre.ethers.getContractFactory("GasFeeTracker");
    const gasFeeTracker = await GasFeeTracker.deploy();
    await gasFeeTracker.waitForDeployment();

    console.log(`✅ Contract deployed at: ${gasFeeTracker.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

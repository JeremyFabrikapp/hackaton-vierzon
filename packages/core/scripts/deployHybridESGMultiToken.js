async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    const ESGToken = await ethers.getContractFactory("HybridESGMultiToken");
    const token = await ESGToken.deploy("https://token-cdn-domain/metadata/");
    console.log("Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

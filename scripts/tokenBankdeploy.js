const fs = require("fs");
const memberNFTAddress = require("../memberNFTContract");

const main = async () => {
    const addr1 = "0xf4734BAb429BAB5359C008A9aBBee8e44CcA9f14";
    const addr2 = "0xE83B2e80D2b26be162c366073a6863D37094e915";
    const addr3 = "0x27F9C0c10DD80000Cd170a5F7172bA32b045e989";
    const addr4 = "0xd6f086f375255FD67e85f602C48fb131a40fB970"

    // デプロイ
    const TokenBank = await ethers.getContractFactory("TokenBank");
    const tokenBank = await TokenBank.deploy("TokenBank", "TBK", memberNFTAddress);
    await tokenBank.deployed();
    console.log(`Contract deployed to: https://goerli.etherscan.io/address/${tokenBank.address}`);

    // トークンを移転する
    let tx = await tokenBank.transfer(addr2, 300);
    await tx.wait();
    console.log("transferred to addr2")
    tx = await tokenBank.transfer(addr3, 200);
    await tx.wait();
    console.log("transferred to addr3");
    tx = await tokenBank.transfer(addr4, 100);
    await tx.wait();
    console.log("transferred to addr4");

    // verifyで読み込むargument.jsを生成
    fs.writeFileSync("./argument.js",
    `
    module.exports = [
        "TokenBank",
        "TBK",
        "${memberNFTAddress}"
    ]
    `
    );
    
    // フロントエンドアプリが読み込むcontracts.jsを生成
    fs.writeFileSync("./contracts.js",
    `
    export const memberNFTAddress = "${memberNFTAddress}"
    export const tokenBankAddress = "${tokenBank.address}"
    `
    );
}


const tokenBankDeploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

tokenBankDeploy();
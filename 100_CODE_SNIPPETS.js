var web3 = require('@solana/web3.js');
const { clusterApiUrl, Connection, Keypair } = require("@solana/web3.js");

(async () => {

    console.log("loading a configured account");
    // let apiUrl = clusterApiUrl('testnet');
    let apiUrl = clusterApiUrl('devnet');
    console.log(`apiUrl: ${apiUrl}`);

    let connection = new Connection(apiUrl);

    let transactionCount = await connection.getTransactionCount();
    console.log(`transactionCount: ${transactionCount}`);

    let secretKey = Uint8Array.from([
        77, 134, 149, 202, 19, 235, 40, 139, 250, 187, 5, 220, 127, 111, 111, 122,
        143, 27, 229, 172, 193, 186, 52, 161, 250, 147, 131, 86, 172, 147, 162, 8,
        119, 132, 50, 230, 181, 34, 215, 196, 172, 34, 33, 58, 78, 33, 25, 88,
        4, 48, 52, 6, 226, 195, 219, 156, 73, 32, 196, 20, 220, 39, 173, 114
    ]);
    let fromWallet = Keypair.fromSecretKey(secretKey);
    console.log(`publicKey: ${fromWallet.publicKey.toBase58()}`);

    let balance = await connection.getBalance(fromWallet.publicKey);
    console.log(`Balance: ${balance}`)

})();
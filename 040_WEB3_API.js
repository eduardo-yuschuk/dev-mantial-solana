/*
const solanaWeb3 = require('@solana/web3.js');
console.log(solanaWeb3);
*/

/*
const { Keypair } = require("@solana/web3.js");
let secretKey = Uint8Array.from([
  77, 134, 149, 202, 19, 235, 40, 139, 250, 187, 5, 220, 127, 111, 111, 122,
  143, 27, 229, 172, 193, 186, 52, 161, 250, 147, 131, 86, 172, 147, 162, 8,
  119, 132, 50, 230, 181, 34, 215, 196, 172, 34, 33, 58, 78, 33, 25, 88,
  4, 48, 52, 6, 226, 195, 219, 156, 73, 32, 196, 20, 220, 39, 173, 114
]);
let keypair = Keypair.fromSecretKey(secretKey);
console.log(keypair);
*/

const { Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require("@solana/web3.js");
console.log(`LAMPORTS_PER_SOL: ${LAMPORTS_PER_SOL}`);
let fromKeypair = Keypair.generate();
console.log(`FROM: ${fromKeypair.publicKey}`);
let toKeypair = Keypair.generate();
console.log(`__TO: ${toKeypair.publicKey}`);
let transaction = new Transaction();

transaction.add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: LAMPORTS_PER_SOL
  })
);

const { sendAndConfirmTransaction, clusterApiUrl, Connection } = require("@solana/web3.js");

let keypair = Keypair.generate();

let apiUrl = clusterApiUrl('testnet');
console.log(`apiUrl: ${apiUrl}`);

let connection = new Connection(apiUrl);
/* */
sendAndConfirmTransaction(
  connection,
  transaction,
  [keypair]
);
/* */

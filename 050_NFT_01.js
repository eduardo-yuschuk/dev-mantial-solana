var web3 = require('@solana/web3.js');
var splToken = require('@solana/spl-token');
const { sendAndConfirmTransaction, clusterApiUrl, Connection, Keypair } = require("@solana/web3.js");

(async () => {
  // Connect to cluster
  /*
  var connection = new web3.Connection(
    "YOUR_QUICKNODE_URL_HERE",
    'confirmed',
  );
  */
  let apiUrl = clusterApiUrl('testnet');
  console.log("apiUrl:");
  console.log(apiUrl);
  
  let connection = new Connection(apiUrl);
  console.log("connection:");
  console.log(connection);
  
  let transactionCount = await connection.getTransactionCount();
  console.log("transactionCount:");
  console.log(transactionCount);

  let secretKey = Uint8Array.from([
    77, 134, 149, 202, 19, 235, 40, 139, 250, 187, 5, 220, 127, 111, 111, 122,
    143, 27, 229, 172, 193, 186, 52, 161, 250, 147, 131, 86, 172, 147, 162, 8,
    119, 132, 50, 230, 181, 34, 215, 196, 172, 34, 33, 58, 78, 33, 25, 88,
    4, 48, 52, 6, 226, 195, 219, 156, 73, 32, 196, 20, 220, 39, 173, 114
  ]);
  let keypair = Keypair.fromSecretKey(secretKey);
  console.log("publicKey:");
  console.log(keypair.publicKey.toBase58());

  let accountInfo = await connection.getAccountInfo(keypair.publicKey);
  console.log("accountInfo:");
  console.log(accountInfo);

  return;

  // Generate a new wallet keypair and airdrop SOL
  var fromWallet = web3.Keypair.generate();
  var fromAirdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    web3.LAMPORTS_PER_SOL,
  );
  //wait for airdrop confirmation
  await connection.confirmTransaction(fromAirdropSignature);

  //create new token mint
  let mint = await splToken.Token.createMint(
    connection,
    fromWallet,
    fromWallet.publicKey,
    null,
    9,
    splToken.TOKEN_PROGRAM_ID,
  );

  //get the token account of the fromWallet Solana address, if it does not exist, create it
  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey,
  );

   // Generate a new wallet to receive newly minted token
   var toWallet = web3.Keypair.generate();

  //get the token account of the toWallet Solana address, if it does not exist, create it
  var toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    toWallet.publicKey,
  );

  //minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mint.mintTo(
    fromTokenAccount.address, //who it goes to
    fromWallet.publicKey, // minting authority
    [], // multisig
    1000000000, // how many
  );

  await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    fromWallet.publicKey,
    []
  )

  // Add token transfer instructions to transaction
  var transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1,
    ),
  );

  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet],
    {commitment: 'confirmed'},
  );
  console.log('SIGNATURE', signature);
})();
var web3 = require('@solana/web3.js');
var splToken = require('@solana/spl-token');

(async () => {

    // Connect to cluster
    let apiUrl = web3.clusterApiUrl('devnet');
    var connection = new web3.Connection(
        apiUrl,
        'confirmed',
    );

    // 1. Create an account with a wallet to mint an NFT
    // 2. Create an account with a wallet to send the NFT to
    // 3. Mint the NFT, and send it!

    ///////////////////////////////////////////////////////////////////////////
    // 1. Create an account with a wallet to mint an NFT

    // fromWallet - Creating a new pair of public and secret keys using the Keypair.generate() method.
    // fromAirDropSignature - The requestAirdrop() method takes a public Key, and the amount of lamports 
    //  in SOL you would like to receive. Lamports are Solana's equivalent to wei, the smallest amount 
    //  that a SOL can be broken into. Most methods that require a number will default to the lamport measurement. 
    //  In our case, the LAMPORTS_PER_SOL is a constant that represents 1 SOL worth of lamports.
    // confirmTransaction - This call allows us to pass in a signed transaction as an argument and have the 
    //  program wait until it has been confirmed before moving on to other portions of the code. This is important 
    //  as our next step will have to pay a fee, and we will require the airdrop funds.

    // Generate a new wallet keypair and airdrop SOL
    var fromWallet = web3.Keypair.generate();
    var fromAirdropSignature = await connection.requestAirdrop(
        fromWallet.publicKey,
        web3.LAMPORTS_PER_SOL,
    );
    // wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);

    // mint - The createMint function will be what creates our actual token. It takes 6 arguments. 
    // 1. The connection to the Solana Network. (connection) 
    // 2. The account that will pay the fee. (fromWallet) 
    // 3. The public key of the account that has the authority to mint tokens of this type. (fromWallet.publicKey) 
    // 4. The public key of the account that has the authority to freeze tokens of this type. This argument is optional. (null)
    // 5. Amount of decimal places for your token. Most Solana tokens have 9 decimal places. 
    // 6. The program id of the token. You can read more about what program ids are here: 
    //  https://docs.solana.com/developing/programming-model/transactions#program-id.

    // create new token mint
    let mint = await splToken.Token.createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        null,
        9,
        splToken.TOKEN_PROGRAM_ID,
    );

    // fromTokenAccount - This creates or fetches the account (mint) associated with the public key (fromWallet.publicKey). 
    //  You can think about the chain of custody like this: NFT resides in the account, and your wallet owns this account.
    //  Chain of Custody: Keys -> Wallet -> Account

    // get the token account of the fromWallet Solana address, if it does not exist, create it
    let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
        fromWallet.publicKey,
    );

    ///////////////////////////////////////////////////////////////////////////
    // 2. Create an account with a wallet to send the NFT to

    // Generate a new wallet to receive newly minted token
    var toWallet = web3.Keypair.generate();

    // get the token account of the toWallet Solana address, if it does not exist, create it
    var toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
        toWallet.publicKey,
    );

    ///////////////////////////////////////////////////////////////////////////
    // 3. Mint the NFT, and send it!

    // minting 1 new token to the "fromTokenAccount" account we just returned/created

    // mintTo() - This takes the token mint and creates some. It takes 4 arguments: 
    // 1. The destination. This is the address of the account to send it to. (fromTokenAccount.address)
    // 2. This is the public key of the person that has the minting authority over the token (fromWallet.publicKey)
    // 3. This is where you would pass multiple signer's addresses if you had set up your token to have 
    //  multi-signature functionality. We did not in our case, so we pass an empty array. ([]) 
    // 4. How many tokens to send. Since we have 9 decimal places in this particular token, we are sending 
    //  exactly 1 token to the address. (1000000000)

    await mint.mintTo(
        fromTokenAccount.address, //who it goes to
        fromWallet.publicKey, // minting authority
        [], // multisig
        1000000000, // how many
    );

    // setAuthority() - This is the most crucial part of the process. The setAuthority() function 
    //  will revoke minting privileges and ensure that we can not create additional tokens of this type. 
    //  This action can not be undone, and takes 5 arguments:
    // 1. The account of the token (mint.publicKey)
    // 2. The new authority you want to set. (null)
    // 3. The type of authority that the account currently has. ("MintTokens")
    // 4. The public key of the current authority holder. ("fromWallet.publicKey")
    // 5. An array of signers. In our case, we do not have multi-sig enabled. ([])

    await mint.setAuthority(
        mint.publicKey,
        null,
        "MintTokens",
        fromWallet.publicKey,
        []
    )

    // Add token transfer instructions to transaction

    // web3.Transaction() - creates the empty Transaction object.
    // add() - Provides a method where we can add instructions to the Transaction object.

    // programId: web3.PublicKey
    // source: web3.PublicKey
    // destination: web3.PublicKey
    // owner: web3.PublicKey
    // multiSigners: web3.Signer[]
    // amount: number | splToken.u64

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

    // With the transaction object ready to go, we now need to authorize the transaction by signing it with 
    //  our secret key. The 2nd function in the code block above is responsible for this step in the process. 
    //  We can break that down to get a better understanding of what is going on.

    // the connection object
    // the transaction to send
    // the sender's private/public keypair represented by an array. 

    var signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [fromWallet],
        { commitment: 'confirmed' },
    );
    console.log('SIGNATURE', signature);

})();
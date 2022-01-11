

> https://www.quicknode.com/guides/web3-sdks/how-to-mint-an-nft-on-solana-using-candy-machine

> https://docs.metaplex.com/candy-machine-v2/getting-started


```bash
$ sudo apt-get update

$ sudo apt-get install ca-certificates curl gnupg lsb-release

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io

$ sudo npm install -g ts-node

$ git version; node --version; yarn --version; ts-node --version

$ git clone https://github.com/metaplex-foundation/metaplex.git
$ cd metaplex

$ yarn install --cwd ./js/

$ ts-node ./js/packages/cli/src/candy-machine-v2-cli.ts --version
0.0.2

$ solana --version
solana-cli 1.9.4 (src:8ce65878; feat:3258470607)

$ solana address
93YS8o5WEg5QikfmYnhL18kbbxNMXJZnLDu6Af7rkKiR

$ solana balance
2.99090896 SOL

# airdrop cap to 2
$ solana airdrop 2
Requesting airdrop of 2 SOL

Signature: a8tbe4fHbjw9hMysdmaqtehPXiJUD2DPwRUM47uU1Bxp9DmwJFgeoYheEM2e4Ci8mkJa2hu6zWRNpr72YVrytwH

4.99090896 SOL

$ solana airdrop 2
Requesting airdrop of 2 SOL

Signature: 2TnidBjLTanczsfCqPsFje7fVMgXtRh7evX1UvCgHeVSJBj9YujxDSQuVULhizhEQh6y6LfqzZAP1RP5zeKDF7Ar

6.99090896 SOL

$ solana config get
Config File: /home/user/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/user/.config/solana/id.json 
Commitment: confirmed 





```
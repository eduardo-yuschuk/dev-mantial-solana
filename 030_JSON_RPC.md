> https://docs.solana.com/es/developing/clients/jsonrpc-api

# JSON RPC API

```bash
$ solana config get
Config File: /home/gitpod/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /home/gitpod/.config/solana/id.json 
Commitment: confirmed 
```
```bash
$ solana-keygen pubkey ./id.json
93YS8o5WEg5QikfmYnhL18kbbxNMXJZnLDu6Af7rkKiR
```

## getBalance

```bash
$ curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getBalance",
    "params": [
      "93YS8o5WEg5QikfmYnhL18kbbxNMXJZnLDu6Af7rkKiR"
    ]
  }
' | jq

{
  "jsonrpc": "2.0",
  "result": {
    "context": {
      "slot": 106936228
    },
    "value": 1000000000
  },
  "id": 1
}
```

## getAccountInfo

```bash
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getAccountInfo",
    "params": [
      "93YS8o5WEg5QikfmYnhL18kbbxNMXJZnLDu6Af7rkKiR",
      {
        "encoding": "base58"
      }
    ]
  }
' | jq

{
  "jsonrpc": "2.0",
  "result": {
    "context": {
      "slot": 106935920
    },
    "value": {
      "data": [
        "",
        "base58"
      ],
      "executable": false,
      "lamports": 1000000000,
      "owner": "11111111111111111111111111111111",
      "rentEpoch": 247
    }
  },
  "id": 1
}
```
# Eth-meta-tracker

It provide service for fetching eth blocks & transactions, and update property of given eth smart contract

## Environment Variables

| ENV                    | Required | Default Value | Descriptions                                                                                        |
| ---------------------- | -------- | ------------- | --------------------------------------------------------------------------------------------------- |
| DATABASE_URL           | YES      |               | Mysql database connection URL                                                                       |
| ETH_NETWORK            | YES      |               | Ethereum network                                                                                    |
| ETH_SIGNER_PRIVATE_KEY | YES      |               | Ethereum signer wallet private key                                                                  |
| ETHERSCAN_API_KEY      | YES      |               | EtherScan API key                                                                                   |
| ETH_CONTRACT_ADDRESS   | NO       |               | The existing contract address in given network, if this not provide it will deploy another contract |

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

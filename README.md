# Farm testnet

The goal of this project is to facilitate testnet farming using scripts.
It will evolve over time based on new projects that will be discovered.

**Warning**: For now, there is no gas optimization, which means that scripts incur the current gas cost and initiate the transaction in all cases. This can be very expensive.

## 1st step

Clone the repository and install the node packages:

```shell
git clone https://github.com/Nu-Rapeup/script-auto-farm.git
cd script-auto-farm
npm install
```

## 2nd step

Create a .env file at the root of the project. It should contains :

```file
SEPOLIA_API_KEY=https://sepolia.infura.io/v3/YOUR_API_NUMBER
GOERLI_API_KEY=https://goerli.infura.io/v3/YOUR_API_NUMBER
METAMASK_1=PRIVATEKEY
METAMASK_2=PRIVATEKEY
METAMASK_3=PRIVATEKEY
NB_ADDRESS=3
```

## Launch bridge

```shell
npx hardhat run main.ts --network goerli
```

## Launch contract creation

```shell
npx hardhat run scripts/contracts/deploy.ts --network linea
npx hardhat run scripts/contracts/deploy.ts --network scroll
npx hardhat run scripts/contracts/deploy.ts --network base-goerli
npx hardhat run scripts/contracts/deploy.ts --network mantle
```

### Supported testnets

- Base(Coinbase)
- Scroll
- Linea(Consensys)
- Mantle (ByBit)
- ~~Fuel~~(TODO)

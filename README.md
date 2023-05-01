# Slab Token Storage

Slab Token Storage is a smart contract that allows users to deposit a specific type of ERC20 tokens into predefined slabs based on the deposit amount. The contract keeps track of the remaining capacities of each slab and assigns a deposit to the highest available slab. Users can also withdraw their tokens and query the slab index of a specific depositor.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Deploying the Smart Contract](#deploying-the-smart-contract)
  - [Interacting with the Smart Contract](#interacting-with-the-smart-contract)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and use the Slab Token Storage smart contract on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) v14.x or later
- [npm](https://www.npmjs.com/) v6.x or later
- [Hardhat](https://hardhat.org/)

### Installation

1. Clone the repository:

```
git clone https://github.com/your_username/slab-token-storage.git
```

2. Change the current directory to the project root:

```
cd slab-token-storage
```

3. Install the dependencies:

```
npm install
```

## Usage

### Deploying the Smart Contract

1. Compile the smart contracts:

```
npx hardhat compile
```

2. Deploy the ERC20 token contract and Slab Token Storage contract to the Hardhat Network:

```
npx hardhat run scripts/deploy.js --network <network-name>
```

### Interacting with the Smart Contract

You can interact with the smart contract using Hardhat tasks or web3.js/ethers.js library in your application. The available functions in the Slab Token Storage contract are:

- `deposit(uint256 _amount)`: Deposit `_amount` of ERC20 tokens from the user into the contract.
- `withdraw()`: Withdraw the user's tokens from the contract.
- `getSlabOfDepositor(address _depositor)`: Returns the slab index for the given depositor address.

## Testing

1. Run the unit tests:

```
npx hardhat test
```

2. Run code coverage (optional):

```
npx hardhat coverage
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



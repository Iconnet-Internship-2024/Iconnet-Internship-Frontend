require("@nomicfoundation/hardhat-toolbox");

// import('hardhat/config').HardhatUserConfig

const PRIVATE_KEY = '60792f2d3d64d5b77e0979afd4297b4e1ad64c49b33327d3b94db7c40f40a323';

module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './artifacts',
  },
  networks: {
    polygon: {
      url: 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78', // uncomment for deploying with testnet
      // url: 'https://polygon-mainnet.infura.io', // uncomment for deploying with mainnet
      accounts: [PRIVATE_KEY],
    },
    hardhat: {},
  },
};
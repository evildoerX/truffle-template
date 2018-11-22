const HDWalletProvider = require("truffle-hdwallet-provider");
const HDWalletProviderPrivkey = require("truffle-hdwallet-provider-privkey");
const mnemonic = 'tattoo ordinary news try record aware flash spray hat proud between blur';
const privateKey = ['C009E87C5C6919E2ED19A5DAF5385BEA407B0683C2D01259A9EB778FD67596DE']
const RinkebyprivateKey = ['BAA8C0610F1E5E37A3E80F593E4FC7A3EC7DB8F6A79A472977B6486F0CABA890']

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      gas: 6700000,
      network_id: "*" // Match any network id
    },
    OIF: {
      gasPrice: 5000000000,
      provider: function () {
        return new HDWalletProviderPrivkey(RinkebyprivateKey,
          "http://47.100.215.115:8555")
      },
      network_id: 12321
    },
    rinkeby: {
      gasPrice: 7000000000,
      provider: function () {
        return new HDWalletProviderPrivkey(RinkebyprivateKey,
          "http://47.100.221.162:8020")
      },
      network_id: 4
    },
    rinkeby2: {
      gasPrice: 7000000000,
      provider: function () {
        return new HDWalletProviderPrivkey(RinkebyprivateKey,
          "https://rinkeby.infura.io/v3/09c30ad18ed145c3997b0621e1816909")
      },
      network_id: 4
    },
    kovan: {
      gasPrice: 8000000000,
      provider: function () {
        return new HDWalletProviderPrivkey(RinkebyprivateKey,
          "https://kovan.infura.io/v3/09c30ad18ed145c3997b0621e1816909")
      },
      network_id: 3
    },
    ropsten: {
      gasPrice: 8000000000,
      provider: function () {
        return new HDWalletProvider(mnemonic,
          "https://ropsten.infura.io/v3/09c30ad18ed145c3997b0621e1816909")
      },
      network_id: 2
    },
    mainnet: {
      gas: 7500000,
      gasPrice: 6000000000,
      provider: function () {
        return new HDWalletProvider(mnemonic,
          "https://mainnet.infura.io/v3/09c30ad18ed145c3997b0621e1816909")
      },
      network_id: 1

    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
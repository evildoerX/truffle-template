import getWeb3 from '../../util/getWeb3'
import pollWeb3 from '../../util/pollWeb3'
export default {
  state: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null,
    contractInstance: null
  },
  mutations: {
    registerWeb3Instance (state, payload) {
      let result = payload
      let web3Copy = state
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state = web3Copy
      pollWeb3()
    },
    pollWeb3Instance (state, payload) {
      state.coinbase = payload.coinbase
      state.balance = parseInt(payload.balance, 10)
    },
    registerContractInstance (state, payload) {
      state.contractInstance = () => payload
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      commit('pollWeb3Instance', payload)
    }
  }
}

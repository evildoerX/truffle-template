<template>
  <div class="app">
    <MetamaskState />
    <router-view></router-view>
  </div>
</template>


<script>
  import MetamaskState from './components/MetamaskState.vue'
  import Web3 from 'web3'
  export default {
    name: 'App',
    components: {
      MetamaskState
    },
    data () {
      return {
      }
    },
    beforeCreate () {
      /* eslint-disable */
      window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum)
          try {
            // Request account access if needed
            await ethereum.enable()
            // Acccounts now exposed
            Web3.eth.sendTransaction({/* ... */})
          } catch (error) {
            // User denied account access...
          }
        } else if (window.web3) {
          // Legacy dapp browsers...
          window.web3 = new Web3(Web3.currentProvider)
          // Acccounts always exposed
          console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
        } else {
          // Non-dapp browsers...
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          this.modal8 = true
        }
      })
      this.$store.dispatch('registerWeb3')
    },
    mounted () {
    }
  }
</script>

<style scpoed>
.app {
  height: 100%;
  width: 100%;
}
</style>

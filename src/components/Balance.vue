<template>
  <div>
    <b-alert show>Your token0 balance is: {{ balance0 }}</b-alert>
    <b-alert show>Your token1 balance is: {{ balance1 }}</b-alert>
    <b-alert show>Your token2 balance is: {{ balance2 }}</b-alert>
    <b-alert show>Your token3 balance is: {{ balance3 }}</b-alert>
    <b-alert show>Your token4 balance is: {{ balance4 }}</b-alert>
    <b-alert show>Your farmingPool01 LP is: {{ farmingPoolLP }}</b-alert>
    <b-alert show>Your pair01LP LP is: {{ pair01LP }}</b-alert>
  </div>
</template>

<script>
import { getBalance, signer } from "../services/rpc-service.js";
import { ethers } from "ethers";

export default {
  name: "Balance",
  props: {
    msg: String,
  },
  data: () => {
    return {
      balance0: 0,
      balance1: 0,
      balance2: 0,
      balance3: 0,
      balance4: 0,
      farmingPoolLP: 0,
      pair01LP: 0
    };
  },
  mounted() {
    const init = async () => {
      const balance0 = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_TOKEN0
      );
      this.balance0 = ethers.utils.formatEther(balance0.toString());

      const balance1 = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_TOKEN1
      );
      this.balance1 = ethers.utils.formatEther(balance1.toString());

      const balance2 = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_TOKEN2
      );
      this.balance2 = ethers.utils.formatEther(balance2.toString());

      const balance3 = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_TOKEN3
      );
      this.balance3 = ethers.utils.formatEther(balance3.toString());
      
      const balance4 = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_TOKEN4
      );
      this.balance4 = ethers.utils.formatEther(balance4.toString());

      const farmingPoolLP = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_FARMING_POOL01
      );
      this.farmingPoolLP = ethers.utils.formatEther(farmingPoolLP.toString());

      const pair01LP = await getBalance(
        await signer.getAddress(),
        process.env.VUE_APP_PAIR01
      );
      this.pair01LP = ethers.utils.formatEther(pair01LP.toString());
    };
    init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

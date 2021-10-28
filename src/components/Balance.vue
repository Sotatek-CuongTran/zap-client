<template>
  <div>
    <b-alert show>Your USDT balance is: {{ balance0 }}</b-alert>
    <b-alert show>Your DAI balance is: {{ balance1 }}</b-alert>
    <b-alert show>Your WETH balance is: {{ balance2 }}</b-alert>
    <b-alert show>Your WMATIC balance is: {{ balance3 }}</b-alert>
    <b-alert show>Your ATOM balance is: {{ balance4 }}</b-alert>
    <b-alert show>Your USDT-DAI LP is: {{ pair01LP }}</b-alert>
  </div>
</template>

<script>
import { getBalance, signer } from "../services/rpc-service.js";

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
      pair01LP: 0,
    };
  },
  mounted() {
    const init = async () => {
      [
        this.balance0,
        this.balance1,
        this.balance2,
        this.balance3,
        this.balance4,
        this.pair01LP,
      ] = await Promise.all([
        getBalance(await signer.getAddress(), process.env.VUE_APP_TOKEN0),
        getBalance(await signer.getAddress(), process.env.VUE_APP_TOKEN1),
        getBalance(await signer.getAddress(), process.env.VUE_APP_TOKEN2),
        getBalance(await signer.getAddress(), process.env.VUE_APP_TOKEN3),
        getBalance(await signer.getAddress(), process.env.VUE_APP_TOKEN4),
        getBalance(await signer.getAddress(), process.env.VUE_APP_PAIR01),
      ]);
      console.log("\x1b[36m%s\x1b[0m", "this.pair01LP", this.pair01LP);
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

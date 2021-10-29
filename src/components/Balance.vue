<template>
  <div>
    <b-alert show>

      <p>USDT balance is: {{ balance0 }}</p>
      <p>{{ tokenList[0].value }}</p>
    </b-alert>
    <b-alert show>
      <p> DAI balance is: {{ balance1 }} </p>
      <p>{{ tokenList[1].value }} </p>
    </b-alert>
    <b-alert show>
      <p> WETH balance is: {{ balance2 }} </p>
      <p>{{ tokenList[2].value }} </p>
    </b-alert>
    <b-alert show>
      <p> WMATIC balance is: {{ balance3 }} </p>
      <p>{{ tokenList[3].value }} </p>
    </b-alert>
    <b-alert show>
      <p> ATOM balance is: {{ balance4 }} </p>
      <p>{{ tokenList[4].value }} </p>
    </b-alert>
    <br>
    <b-alert show variant="success">USDT-DAI LP is: {{ pair01LP }}</b-alert>
    <b-alert show variant="success">Farming Pool LP: {{ farmingPoolLP }}</b-alert>
  </div>
</template>

<script>
import { getBalance, signer } from "../services/rpc-service.js";
import { tokens } from '../services/const'

export default {
  name: "Balance",
  data: () => {
    return {
      balance0: 0,
      balance1: 0,
      balance2: 0,
      balance3: 0,
      balance4: 0,
      farmingPoolLP: 0,
      pair01LP: 0,
      tokenList: tokens,
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

p {
  margin-bottom: 0%;
}
</style>

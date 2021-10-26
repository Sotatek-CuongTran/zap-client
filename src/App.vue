<template>
  <div id="app">
    <b-row>
      <b-col md="8">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Zap" active>
              <b-row>
                <b-col md="9">
                  Amount
                  <b-form-input
                    v-model="amount"
                    placeholder="Amount"
                  ></b-form-input>
                </b-col>
                <b-col md="3">
                  Token
                  <b-row>
                    <b-form-select
                      class="form-control"
                      v-model="selected"
                      :options="options"
                    ></b-form-select>
                  </b-row>
                </b-col>
              </b-row>
              <br />
              <b-row>
                <b-col md="9">
                  ET Amount
                  <b-form-input
                    v-model="returnValue"
                    placeholder="LP Amount"
                  ></b-form-input>
                </b-col>
                <b-col md="3">
                  LP pair
                  <b-row>
                    <b-form-select
                      class="form-control"
                      v-model="selectedPair"
                      :options="pairOptions"
                    ></b-form-select>
                  </b-row>
                </b-col>
              </b-row>
              <br />
              <b-row>
                <b-col>
                  <b-button @click="zap">Zap</b-button>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Farm">
              <b-row>
                <b-form-input
                  v-model="stakeAmount"
                  placeholder="Amount"
                ></b-form-input>
              </b-row>
              <br />
              <b-row>
                <b-col>
                  <b-button @click="farm">Farm</b-button>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col>
        <Balance />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ethers } from "ethers";
import Balance from "./components/Balance.vue";
import { pairs, tokens } from "./services/const";
import {
  approveToken,
  approveTokenForSpender,
  getContract,
  getZapContract,
  signer,
  getNonce,
} from "./services/rpc-service";
export default {
  name: "App",
  components: {
    Balance,
  },
  data: () => {
    return {
      tokens: tokens,
      selected: null,
      amount: 0,
      selectedPair: null,
      stakeAmount: 0,
    };
  },
  computed: {
    options: () => {
      return tokens.map((e) => {
        return {
          value: e.value,
          text: `Token ${e.label}`,
        };
      });
    },
    pairOptions: () => {
      return pairs.map((e) => {
        return {
          value: e.value,
          text: `Pair ${e.label}`,
        };
      });
    },
    returnValue: function () {
      return 0;
      // return calLPOut(this.amount, tokenIn, pairAddress);
    },
  },
  methods: {
    zap: async function () {
      console.log(this.selected);
      console.log(this.selectedPair);
      console.log(this.amount);
      const zapContract = await getZapContract();
      
      const nonce = await getNonce();
      console.log("Nonce: ", nonce);
      await approveTokenForSpender(zapContract.address, this.selected); // fixed for pair01

      // await approveToken();
      // await signer.sendTransaction({
      //   from: await signer.getAddress(),
      //   to: "0xf18C30E1a1706276Cdc2703c14315b924AC79B78",
      //   value: "0x8AC7230489E80000"
      // })
      // await signer.sendTransaction(zapContract.connect(signer).zapInTokenV2(this.selected, ethers.utils.parseEther(this.amount), this.selectedPair, await signer.getAddress()))

      await zapContract
        .connect(signer)
        .zapInTokenV2(
          this.selected,
          ethers.utils.parseEther(this.amount),
          this.selectedPair,
          await signer.getAddress()
        );
    },
    farm: async function () {
      console.log(this.stakeAmount);

      const stakingRewardABI = ["function stake(uint256 amount) external"];
      const stakingRewardContract = await getContract(
        process.env.VUE_APP_FARMING_POOL01,
        stakingRewardABI
      );

      const nonce = await getNonce();
      console.log("Nonce: ", nonce);
      await approveTokenForSpender(stakingRewardContract.address, pairs[0]); // fixed for pair01
      await stakingRewardContract.connect(signer).stake(ethers.utils.parseEther(this.stakeAmount), {
        nonce
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

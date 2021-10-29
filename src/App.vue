<template>
  <div id="app" style="padding: 50px 20%">
    <b-row>
      <b-col md="8">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Zap" active>
              <b-row>
                <b-col md="6">
                  Amount
                  <b-form-input
                    v-model="amount"
                    placeholder="Amount"
                  ></b-form-input>
                </b-col>
                <b-col md="6">
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
                <b-col md="6">
                  ET Amount
                  <b-form-input
                    v-model="returnValue"
                    readonly
                  ></b-form-input>
                </b-col>
                <b-col md="6">
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

              <br>
               <b-row>
                <div style="display: flex; align-items: center;">
                  <span>Want to farm: </span> 
                <input type="checkbox" v-model="wishFarm">
                </div>
              </b-row>

              <br />
              <b-row>
                <b-col>
                  <b-button @click="zap" style="margin-right: 20px;">Zap</b-button>
                  <b-button @click="showModal">Select Farm</b-button>
                </b-col>
              </b-row>
            </b-tab>
            
            <!-- <b-tab title="Farm">
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
            </b-tab> -->

          </b-tabs>
        </b-card>
      </b-col>
      <b-col>
        <Balance />
      </b-col>
    </b-row>

    <div>
      <b-modal v-model="modalShow" @ok="farm">
        <p>USDT-DAI LP: {{ pair01LP }}</p>
         <b-row>
          <b-col md="6">
            Amount
            <b-form-input
              v-model="stakeAmount"
            ></b-form-input>
          </b-col>
          <b-col md="6">
            LP pair
            <b-row>
              <b-form-select
              class="form-control"
              v-model="farmSelected"
              :options="farms">
            </b-form-select>
            </b-row>
          </b-col>
        </b-row>
      </b-modal>
    </div>
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
  getAllowance,
  getERC20Contract,
  getBalance
} from "./services/rpc-service";
import JSON_TOKENS from '../data/token.json';
import FARM from '../data/farm.json';

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
      options: tokens.map((e) => {
        return {
          value: e.value,
          text: `Token ${e.label}`,
        };
      }),
      pairOptions: [],
      // pairOptions: pairs.map((e) => {
      //   return {
      //     value: e.value,
      //     text: `Pair ${e.label}`,
      //   };
      // }),
      returnValue: '',
      modalShow: false,
      farms: Object.keys(FARM).map(i => {
        return { text: i, value: FARM[i] }
      }),
      farmSelected: null,
      pair01LP: 0,
      wishFarm: false,
    };
  },
  watch: {
    selected() {
      this.initLPPair(this.selected)
    },

    selectedPair() {
      // console.log('selectedPair ', this.selectedPair)
    },

    farmSelected() {
      // console.log(this.farmSelected)
    }
  },
  mounted() {
    console.log('FARM ', FARM)
  },
  methods: {
    initLPPair(selectedToken) {
      let tokenPair = Object.values(JSON_TOKENS).filter(token => {
        return token.address === selectedToken
      })
      if (tokenPair && tokenPair.length) {

        let lps = pairs.filter(pair => tokenPair[0].lp.includes(pair.label) || tokenPair[0].lp.includes(pair.re_label))

        this.pairOptions = lps.map((e) => {
          return {
            value: e.value,
            text: `Pair ${e.label}`,
          };
        })
      }
    },

    zap: async function () {
      console.log(this.selected);
      console.log(this.selectedPair);
      console.log(this.amount);
      const zapContract = await getZapContract();

      const nonce = await getNonce();
      console.log("Nonce: ", nonce);
      let allowance = await getAllowance(zapContract.address, this.selected);
      allowance = Number(ethers.utils.formatEther(allowance.toString()));
      console.log("allowance: ", allowance);
      if (allowance <= 0) {
        await approveTokenForSpender(zapContract.address, this.selected); // fixed for pair01
      }

      const selectedContract = await getERC20Contract(this.selected);
      const decimal = await selectedContract.callStatic.decimals();
      console.log(decimal);
      console.log(ethers.utils.parseUnits(this.amount.toString(), decimal.toString()));

      // await signer.sendTransaction({
      //   from: await signer.getAddress(),
      //   to: "0xf18C30E1a1706276Cdc2703c14315b924AC79B78",
      //   value: "0x8AC7230489E80000"
      // })
      // await signer.sendTransaction(zapContract.connect(signer).zapInTokenV2(this.selected, ethers.utils.parseEther(this.amount), this.selectedPair, await signer.getAddress()))

      let tx = await zapContract
        .connect(signer)
        .zapInTokenV2(
          this.selected,
          ethers.utils.parseUnits(this.amount, decimal),
          this.selectedPair,
          await signer.getAddress()
        );


        await tx.wait()

        if (this.wishFarm) {
          this.showModal()
        }
        

        
    },
    farm: async function () {
      console.log(this.stakeAmount);

      const stakingRewardABI = ["function stake(uint256 amount) external"];
      const stakingRewardContract = await getContract(
        this.farmSelected,
        stakingRewardABI
      );

      const nonce = await getNonce();
      console.log("Nonce: ", nonce);
      // await approveTokenForSpender(stakingRewardContract.address, pairs[0]); // fixed for pair01
      await approveTokenForSpender(stakingRewardContract.address, this.selectedPair); // fixed for pair01
      await stakingRewardContract
        .connect(signer)
        .stake(ethers.utils.parseEther(this.stakeAmount), {
          nonce,
        });
    },

    showModal() {
      this.modalShow = !this.modalShow
      this.getLPBalance()
    },

    async getLPBalance() {
      [ this.pair01LP ] = await Promise.all([
        getBalance(await signer.getAddress(), selectedPair),
      ]);
    }
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

const ethers = require("ethers");
import IERC20 from "../abis/IERC20.json";
import ZAP from "../abis/Zap.json";
import { tokens } from "./const";
// const RPC_URL = process.env.RPC_URL || 'http://localhost:8545'

window.ethereum.enable();

console.log({ provider: window.ethereum });
const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
console.log({ signer: signer.getAddress() });

export const getBalance = async (address, tokenAddress) => {
  const tokenContract = new ethers.Contract(tokenAddress, IERC20.abi, provider);
  const decimal = await tokenContract.callStatic.decimals();
  const balance = await tokenContract.callStatic.balanceOf(address);
  return ethers.utils.formatUnits(ethers.BigNumber.from(balance), decimal.toString());
};

export const getAllowance = async (address, tokenAddress) => {
  const tokenContract = new ethers.Contract(tokenAddress, IERC20.abi, provider);
  return tokenContract.callStatic.allowance(await signer.getAddress(), address);
};

export const getERC20Contract = async (tokenAddress) => {
  return new ethers.Contract(tokenAddress, IERC20.abi, provider);
};

export const getContract = async (address, abi) => {
  return new ethers.Contract(address, abi, provider);
};

export const getZapContract = async () => {
  return getContract(process.env.VUE_APP_ZAP, ZAP.abi);
};

export const approveToken = async () => {
  for (const addr of tokens) {
    const tokenContract = new ethers.Contract(addr, IERC20.abi, provider);
    await tokenContract
      .connect(signer)
      .approve(process.env.VUE_APP_ZAP, ethers.constants.MaxUint256);
  }
};

export const approveTokenForSpender = async (spender, token) => {
  const tokenContract = new ethers.Contract(token, IERC20.abi, provider);
  await tokenContract
    .connect(signer)
    .approve(spender, ethers.constants.MaxUint256);
};

export const getNonce = async () => {
    return signer.getTransactionCount();
}

// export const calLPOut = async (amount, tokenIn, pairAddr) => {
//     // convert amount / 2 to tokenOut

// }

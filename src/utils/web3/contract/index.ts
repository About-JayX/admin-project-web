import { ethers } from 'ethers';

export const getProvider = (rpcUrl?: string) => {
  if (!rpcUrl) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};

export const getSigner = async (provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider) => {
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
};
class useContract {
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner | undefined = undefined;
  constructor(props: { rpcUrl?: string }) {
    const { rpcUrl } = props;
    this.provider = getProvider(rpcUrl);
    this.initSigner();
  }
  async initSigner() {
    this.signer = await getSigner(this.provider);
  }
  async createContract(contractAddress: string, abi: any) {
    if (!this.signer) {
      await this.initSigner();
    }
    return new ethers.Contract(contractAddress, abi, this.signer);
  }
}

export default useContract;

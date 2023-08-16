import axios from 'axios';
import network from '@/utils/web3/network';

const requestRpcUrl = async (chainId: number) => {
  const networkConfig: any = network.find((res: any) => res.chainId === chainId);
  for (let index = 0; index < networkConfig.rpcUrls.length; index++) {
    const rpcUrl = networkConfig.rpcUrls;
    const random = Math.floor(Math.random() * rpcUrl.length);
    axios.defaults.timeout = 3500;
    return await axios
      .post(rpcUrl[random], {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: chainId,
      })
      .then((res) => {
        if (res.status === 200) {
          return { code: 200, data: rpcUrl[random], message: 'success' };
        }
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
          return { code: 500, data: '', message: 'timeout' };
        }
      });
  }
};
export const useRpcUrls = async (chainId: number) => {
  let rpcUrl: any;
  return await new Promise((re) => {
    const timers = setInterval(async () => {
      rpcUrl = await requestRpcUrl(chainId);
      if (rpcUrl.code === 200) {
        clearInterval(timers);
        re({
          rpcUrl,
          code: rpcUrl.code,
        });
      }
    }, 1000);
  });
};

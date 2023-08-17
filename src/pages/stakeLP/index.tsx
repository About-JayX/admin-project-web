import { TestErc20 } from '@/assets/contract';
import { getRpcUrl, stakeLP } from '@/modules/stakeLP/stakeLp';
import { useAppDispatch, useAppSelector } from '@/modules/store';
import useWeb3 from '@/utils/web3';
import useContract, { getProvider, getSigner } from '@/utils/web3/contract';

import { useEffect, useState } from 'react';
export default function stakeLp() {
  const web3Utils = useWeb3();
  const { connect, disconnect } = web3Utils;
  const { chainId, web3 } = useAppSelector(stakeLP);
  const dispatch = useAppDispatch();
  const contract = new useContract({});
  let Erc20Contract: any = null;
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // 获取rpcUrl
    await dispatch(getRpcUrl(chainId));
  };
  const [token, setToken] = useState<string>('');
  const mint = async () => {
    if (!Erc20Contract) {
      Erc20Contract = await contract.createContract(TestErc20.address, TestErc20.abi);
      Erc20Contract.setBalance(web3.address);
    }
  };
  return (
    <>
      <div>
        <span>{web3.address}</span>
        <button
          onClick={() => {
            web3.address ? disconnect() : connect();
          }}
        >
          {web3.address ? 'disConnect' : 'connect'}
        </button>

        <div>
          <input type='text' onChange={(e) => setToken(e.target.value)} />
          <button onClick={mint}>铸造</button>
        </div>
      </div>
    </>
  );
}

import { getRpcUrl, stakeLP } from '@/modules/stakeLP/stakeLp';
import { useAppDispatch, useAppSelector } from '@/modules/store';
import useWeb3 from '@/utils/web3';

import { useEffect } from 'react';
export default function stakeLp() {
  const web3Utils = useWeb3();
  const { connect, disconnect } = web3Utils;
  const { chainId, web3 } = useAppSelector(stakeLP);
  const dispatch = useAppDispatch();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // 获取rpcUrl
    await dispatch(getRpcUrl(chainId));
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
      </div>
    </>
  );
}

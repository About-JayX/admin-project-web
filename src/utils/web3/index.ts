import { useAppDispatch, useAppSelector } from '@/modules/store';
import network from './network';
import { stakeLP, stakeLPAction, Iweb3 } from '@/modules/stakeLP/stakeLp';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { hexValue } from 'ethers/lib/utils';

export default function useWeb3() {
  const dispatch = useAppDispatch();
  const { chainId, web3, rpcUrl } = useAppSelector(stakeLP);
  const networkConfig: any = network.find((res: any) => res.chainId === chainId);
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const checkChain = async () => {
    if (window.ethereum) {
      const providerChainId = (await provider.getNetwork()).chainId;

      const getWeb3: Iweb3 = {
        chainStatus: providerChainId !== networkConfig.chainId,
        netWorkId: providerChainId,
        chainName: networkConfig.name,
        address: localStorage.getItem('address') || '',
      };

      dispatch(stakeLPAction.setWeb3(getWeb3));
    } else {
      console.log('Please install the wallet plugin!');
    }
  };
  const switchChain = async () => {
    if (window.ethereum) {
      if (rpcUrl && rpcUrl.code === 200) {
        await ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexValue(networkConfig.chainId) }],
          })
          .then(async () => {
            dispatch(stakeLPAction.setWeb3({ ...web3, chainStatus: false }));
          })
          .catch(() => {
            return ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: hexValue(networkConfig.chainId),
                    chainName: networkConfig.chainName,
                    nativeCurrency: networkConfig.nativeCurrency,
                    rpcUrls: [rpcUrl.rpcUrl.data],
                    blockExplorerUrls: networkConfig.blockExplorerUrls,
                  },
                ],
              })
              .then(async () => {
                dispatch(stakeLPAction.setWeb3({ ...web3, chainStatus: false }));
              });
          });
      }
    } else {
      console.log('Please install the wallet plugin!');
    }
  };
  const connect = async () => {
    if (window.ethereum) {
      if (web3.chainStatus) {
        switchChain();
      } else {
        await ethereum.request({ method: 'eth_requestAccounts' }).then(async (res: any) => {
          dispatch(stakeLPAction.setWeb3({ ...web3, address: res[0] }));
          localStorage.setItem('address', res[0]);
        });
      }
    } else {
      console.log('Please install the wallet plugin!');
    }
  };
  const disconnect = async () => {
    dispatch(stakeLPAction.setWeb3({ ...web3, address: '' }));
    localStorage.setItem('address', '');
  };
  useEffect(() => {
    checkChain();

    if (window.ethereum) {
      ethereum.on('chainChanged', () => {
        checkChain();
      });
      ethereum.on('accountsChanged', (refreshAccounts: Array<string>) => {
        if (refreshAccounts.length) {
          checkChain();
          dispatch(stakeLPAction.setWeb3({ ...web3, address: refreshAccounts[0] }));
          localStorage.setItem('address', refreshAccounts[0]);
        }
      });
    }
  }, []);

  return { connect, disconnect };
}

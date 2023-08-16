import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { useRpcUrls } from '@/utils/web3/rpcUrls';

// 创建空间名
const namespace = 'stakeLP';

// 定义参数接口
interface IInitialState {
  chainId: number;
  rpcUrl: any;
  web3: Iweb3;
}
// 定义web3 信息接口
export interface Iweb3 {
  chainStatus: boolean;
  chainName: string;
  address: string;
  netWorkId: string | number;
}
// 处理异步方案
export const getRpcUrl = createAsyncThunk(`${namespace}/getRpcUrl`, async (chainId: number) => {
  const result = await useRpcUrls(chainId);
  return result;
});
// 初始化store
const initialState: IInitialState = {
  chainId: 56,
  rpcUrl: null,
  web3: {
    chainStatus: false,
    chainName: '',
    address: '',
    netWorkId: '',
  },
};
// 创建 slice
const stakeLPSlice = createSlice({
  name: namespace,
  initialState,
  // 修改state方法
  reducers: {
    setWeb3(state, action): void {
      state.web3 = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRpcUrl.fulfilled, (state, action) => {
      state.rpcUrl = action.payload;
    });
  },
});

export const stakeLP = (state: RootState) => state.stakeLp;
export const stakeLPAction = stakeLPSlice.actions;
export default stakeLPSlice.reducer;

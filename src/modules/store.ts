import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import global from './global';
import user from './user';
import listBase from './list/base';
import listSelect from './list/select';
import listCard from './list/card';
import stakeLp from './stakeLP/stakeLp';
// 将多个 reducer 合并成一个根 reducer
const reducer = combineReducers({
  global,
  user,
  listBase,
  listSelect,
  listCard,
  stakeLp,
});
// 配置和创建 Redux store，包括中间件、异步 action 处理、性能优化
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
// 分发函数的类型
export type AppDispatch = typeof store.dispatch;
// 返回 redux  -->  useDispatch分发函数
export const useAppDispatch = () => useDispatch<AppDispatch>();
// 类型化选择redux中的状态，确保返回值类型与根状态类型匹配
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

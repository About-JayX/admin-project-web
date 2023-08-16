import { lazy } from 'react';
import { IRouter } from '../index';

const bot: IRouter[] = [
  {
    path: '/bot',
    meta: {
      title: '机器人管理',
    },
    children: [
      {
        path: '/botList',
        Component: lazy(() => import('pages/Bot/BotList')),
        meta: {
          title: '机器人列表',
        },
      },
      {
        path: '/pl',
        Component: lazy(() => import('pages/stakeLP')),
        meta: {
          title: '合约测试',
        },
      },
    ],
  },
];

export default bot;

import classNames from 'classnames';
import CommonStyle from 'styles/common.module.less';
import FilterBot from './components/filterBot';
import { filterOptType, boxListTtpe } from './interface/BotList';
import BoxCard from './components/botCard';
import { useState } from 'react';
export default function botList() {
  const filterOpt: Array<filterOptType> = [
    { title: '全部', type: 'all' },
    { title: '正常', type: 'success' },
    { title: '异常', type: 'error' },
  ];
  const [optType, setOptType] = useState<string>('all');
  const [boxList, setBoxList] = useState<Array<boxListTtpe>>([
    { title: 'abc', status: true },
    { title: 'bbb', status: false },
  ]);
  return (
    <>
      <div className={classNames(CommonStyle.pageWithPadding, CommonStyle.pageWithColor)}>
        <h3>机器人列表</h3>
        <FilterBot filterOpt={filterOpt} opt={{ optType, setOptType }}></FilterBot>
        <h4>空头机器人</h4>
        <BoxCard boxList={boxList}></BoxCard>
      </div>
    </>
  );
}

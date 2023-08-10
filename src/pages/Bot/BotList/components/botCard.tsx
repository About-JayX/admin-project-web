import React from 'react';
import { Card, Tag, Button } from 'tdesign-react';
import { CheckIcon, CloseIcon, DiscountFilledIcon } from 'tdesign-icons-react';
import Style from './botCard.module.less';
import { boxListTtpe } from '../interface/BotList';
export default function boxCard(props: { boxList: Array<boxListTtpe> }) {
  const { boxList } = props;
  return (
    <>
      <div className={Style.botCard}>
        {boxList &&
          boxList.map((box) => (
            <Card bordered style={{ width: '350px', marginLeft: '20px' }}>
              <div className={Style.header}>
                <DiscountFilledIcon />
                <span className={Style.headerTitle}>{box.title}</span>
                <Tag
                  icon={box.status ? <CheckIcon /> : <CloseIcon />}
                  theme={box.status ? 'success' : 'danger'}
                  variant='light'
                >
                  {box.status ? '正常' : '异常'}
                </Tag>
              </div>
              <div className={Style.main}>
                <div>ddd</div>
                <div>ddd</div>
                <div>ddd</div>
              </div>
              <div className={Style.footer}>
                <Button shape='rectangle' theme='danger'>
                  删除
                </Button>
                <Button style={{ marginLeft: '10px' }} shape='rectangle'>
                  配置
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}

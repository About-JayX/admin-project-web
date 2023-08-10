import { filterOptType } from '../interface/BotList';
import Style from './filterBot.module.less';
export default function filterBot(props: { filterOpt: Array<filterOptType>; opt: any }) {
  const { filterOpt, opt } = props;
  const { optType, setOptType } = opt;

  return (
    <>
      <div className={Style.optList}>
        {filterOpt &&
          filterOpt.map((opt) => (
            <div
              onClick={() => {
                setOptType(opt.type);
              }}
              className={`${Style.opt} ${opt.type === optType ? Style.actived : ''}`}
            >
              {opt.title}
            </div>
          ))}
      </div>
    </>
  );
}

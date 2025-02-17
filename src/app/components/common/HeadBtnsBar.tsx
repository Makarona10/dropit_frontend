import { IconType } from "react-icons";

type btn = {
  name: string;
  ico: IconType;
  color: string;
  action: Function;
};

type prop = {
  buttons: btn[];
};

const HeadBtnsBar = ({ buttons }: prop) => {
  return (
    <div className="flex flex-wrap w-full items-center pl-2 py-2 gap-1 bg-neutral-800">
      {buttons.map((b: btn) => {
        const Icon = b.ico;
        return (
          <div
            className="flex items-center p-2 px-5 gap-1 rounded-full text-xs md:text-sm opacity-80
                                    select-none duration-150 cursor-pointer hover:bg-neutral-700 hover:opacity-100"
            key={b.name}
            onClick={() => b.action()}
          >
            <Icon style={{ color: b.color }} className="w-6 h-6" />
            <p>{b.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HeadBtnsBar;

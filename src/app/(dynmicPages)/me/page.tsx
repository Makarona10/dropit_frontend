import SideBar from "../../components/common/SideBar";
import CircleProgress from "@/app/components/progress_visual/CircleProgress";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GiHand } from "react-icons/gi";

type Media_type = {
  name: string;
  color: string;
};

const types: Media_type[] = [
  {
    name: "Images",
    color: "#1aaa20",
  },
  {
    name: "Videos",
    color: "#1a4aae",
  },
  {
    name: "Audios",
    color: "#d4e40b",
  },
  {
    name: "Others",
    color: "#1bdcd2",
  },
];

const Me = () => {
  return (
    <div className="w-full flex">
      <SideBar title="Me" />
      <div className="flex flex-col mx-auto sm:w-[650px] w-[328px] p-5 gap-4 sm:mt-16 mt-8">
        <div className="flex gap-3 items-center">
          <GiHand className="sm:text-2xl text-xl" />
          <h1 className="sm:text-xl text-base">Hello Ahmed</h1>
        </div>
        <div className="flex w-full rounded-xl p-5 bg-neutral-800">
          <div className="flex justify-center items-center size-20 rounded-full border-2 border-primary-500 cursor-pointer">
            A
          </div>
          <div className="flex flex-col ml-8">
            <p className="sm:text-xl text-lg">Ahmed Abdelnaby Khalil</p>
            <p className="sm:text-base text-sm opacity-70">
              ahmedneyss@gmail.com
            </p>
            <p className="lining-nums sm:text-sm text-xs opacity-50">
              Joined on: 12/3/2024
            </p>
          </div>
          <div className="sm:ml-8 h-full">
            <button
              className="text-secondary-100 p-2 rounded-lg bg-primary-600
              transition hover:shadow-md hover:shadow-neutral-500/20"
            >
              Update profile
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-neutral-800 w-full rounded-xl sm:p-9 gap-4">
          <div className="grid sm:grid-cols-2 w-full gap-4">
            <div className="flex flex-col sm:gap-7">
              <p className="text-2xl mr-4">Quota Usage:</p>
              <div className="w-full flex items-center">
                <CircleProgress
                  percentage={67}
                  size={120}
                  strokeWidth={12}
                  font={"29"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 my-auto p-4">
              {types.map((t: Media_type) => {
                return (
                  <div
                    key={t.name}
                    className="flex items-center sm:text-base text-xs"
                  >
                    <div
                      className={`sm:w-4 sm:h-4 w-3 h-3 rounded-sm`}
                      style={{ backgroundColor: t.color }}
                    ></div>
                    <p className="sm:ml-3 ml-2">{t.name}</p>
                    <p className="ml-3">13 %</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2 text-neutral-300/60 mt-5">
            <MdOutlineTipsAndUpdates className="sm:text-xl text-lg" />
            <p className="sm:text-base text-xs">
              Clean your files bin to get more free space
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;

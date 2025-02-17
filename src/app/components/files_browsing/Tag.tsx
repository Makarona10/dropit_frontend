import { LiaTagSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";

const Tag = () => {
  const delete_window_div_id = "delete_tag_div_id";

  return (
    <div
      className="flex flex-col items-center w-[250px] h-[100px] bg-neutral-800 rounded-xl
            duration-100 hover:bg-neutral-900 cursor-pointer select-none"
      title="This is a title"
    >
      <div className="flex items-center w-full p-4 rounded-t-xl active:bg-neutral-950">
        <LiaTagSolid style={{ width: "24px", height: "24px" }} />
        <p
          className="flex items-center w-full overflow-hidden text-ellipsis whitespace-nowrap sm:text-[16px] text-sm text-neutral-300
                    font-semibold ml-2 select-none"
        >
          Gamilovic tag Gamilovic
        </p>
      </div>
      <div className="flex items-center w-full p-3 pl-4 mt-1 border-t-[1px] border-neutral-600">
        <span className="flex w-full relative left-1 gap-[3px] items-center text-sm text-neutral-300/80">
          <p className="relative bottom-[1px]">6</p>
          <p>files</p>
          <span
            className="absolute right-2 p-[5px] rounded-full hover:bg-neutral-700 active:bg-neutral-600"
            onClick={() => {
              const element = document.getElementById(delete_window_div_id);
              if (element) {
                element.style.visibility = "visible";
                element.style.opacity = "100";
              }
            }}
          >
            <MdDeleteForever title="delete tag" className="w-5 h-5" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Tag;

"use client";
import { LiaTagSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import DeleteTag from "./tags_components/DeleteTag";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingOverlay from "../common/LoadingOverlay";

type _Props = {
  id: number;
  name: string;
  createdAt: string;
};

const Tag = ({ id, name, createdAt }: _Props) => {
  const [isDeleteVisible, setIsDeleteVisible] = useState<boolean>(false);
  const [isTagContentLoading, setIsTagContentLoading] = useState(false);
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center sm:w-[250px] sm:h-[100px] w-[180px] h-[80px] bg-neutral-800 rounded-xl
            duration-100 hover:bg-neutral-900 cursor-pointer select-none"
      title="click to view files"
      onClick={() => {
        setIsTagContentLoading(true);
        router.push(`tags/tfiles/${id}`);
      }}
    >
      <div className={`${!isTagContentLoading && "hidden"}`}>
        <LoadingOverlay
          zIndex={90}
          message="Loading tag files..."
          fullScreen={true}
        />
      </div>
      <DeleteTag
        tag_id={id}
        isOpen={isDeleteVisible}
        onClose={() => setIsDeleteVisible(false)}
      />
      <div className="flex items-center w-full sm:p-4 p-2 rounded-t-xl active:bg-neutral-950">
        <LiaTagSolid className="sm:size-[24px] size-5" />
        <p
          className="flex items-center w-full overflow-hidden text-ellipsis whitespace-nowrap sm:text-[16px] text-sm text-neutral-300
                    font-semibold ml-2 select-none"
        >
          {name}
        </p>
      </div>
      <div className="flex items-center w-full p-3 pl-4 mt-1 border-t-[1px] border-neutral-600">
        <span className="flex w-full relative sm:left-1 gap-[3px] items-center sm:text-sm text-[9px] text-neutral-300/80">
          <p className="relative bottom-[1px]">
            Created at: {createdAt.toString()}
          </p>
          {/* <p>files</p> */}
          <span
            className="absolute right-2 p-[5px] rounded-full hover:bg-neutral-700 active:bg-neutral-600"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteVisible(true);
            }}
          >
            <MdDeleteForever
              title="delete tag"
              className="sm:size-[24px] size-4"
            />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Tag;

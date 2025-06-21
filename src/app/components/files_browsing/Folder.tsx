"use client";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useRef, useState } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";

type FolderProps = {
  id: number;
  name: string;
  created_at: string;
};

const Folder = ({ id, name, created_at }: FolderProps) => {
  const [toggleOpts, setToggleOpts] = useState<boolean>(false);
  const delete_folder_div_id = "delete_folder_window_div";
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      name: "Add to favourites",
      func: null,
      ico: FaStar,
    },
    {
      name: "Share",
      func: null,
      ico: RiUserSharedLine,
    },
    {
      name: "Download",
      func: null,
      ico: FaDownload,
    },
  ];

  const deleteFolder = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/user/login");
      }
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/folder/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.statusCode === 200) {
        // setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      // setMsg({
      //   error: true,
      //   msg: error?.response?.data?.message || "Unexpected error happened",
      // });
    }
  };

  return (
    <div
      className="flex flex-col relative items-center sm:w-[250px] w-[180px] bg-neutral-800 rounded-xl
                    duration-200 hover:bg-neutral-900 active:bg-neutral-950
                    cursor-pointer select-none"
      onMouseLeave={() => setToggleOpts(false)}
      onClick={() => {
        router.push(`/folders/folder/${id}?fn=${name}`);
      }}
    >
      <div
        className="fixed m-auto h-screen inset-0 select-text cursor-default
      flex items-center justify-center bg-black bg-opacity-50 z-50   
      transition duration-300 invisible"
        id={delete_folder_div_id}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
        <div
          className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg gap-6 border-[1px] border-white/30"
          style={{ zIndex: 2 }}
          ref={divRef}
        >
          <div className="sm:text-xl text-base font-semibold">
            <
            Delete folder confirmation
          </div>
          <div
            className="flex w-full gap-3 text-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button className="bg-green-600 p-2 rounded-md">Confirm</button>
            <button className="bg-primary-600 p-2 rounded-md">Cancel</button>
          </div>
        </div>
      </div>
      <div className="flex relative items-center w-full p-4">
        <FaFolder style={{ width: "24px", height: "24px" }} />
        <p
          className="flex w-full overflow-hidden text-ellipsis whitespace-nowrap sm:text-[16px] text-sm text-neutral-300
                    font-semibold ml-3 select-none"
          title={name}
        >
          {name}
        </p>
        <div
          className="flex items-center justify-center p-2 rounded-full duration-100 hover:bg-black active:bg-black"
          onClick={(e) => {
            e.stopPropagation();
            setToggleOpts(!toggleOpts);
          }}
        >
          <HiDotsVertical className="w-4 h-4" />
        </div>
        <div className="absolute top-5 right-16 z-10">
          <ul
            className={`flex flex-col text-[12px] w-full gap-1 bg-neutral-800 text-neutral-100/50 rounded-lg duration-150 ${!toggleOpts && "scale-0 size-0"}`}
          >
            {options.map((o) => {
              const Icon = o.ico;
              return (
                <li
                  key={o.name}
                  className="flex items-center p-2 duration-150 rounded-lg hover:bg-neutral-700 hover:text-neutral-100"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <p className="pr-6">{o.name}</p>
                  <Icon className="absolute right-2 w-4 h-4" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center w-full p-2 pl-4 mt-1 border-t-[1px] border-neutral-600 sm:text-sm text-xs">
        <span className="flex sm:flex-nowrap flex-wrap gap-3 w-full relative items-center text-neutral-300/80">
          <div className="flex gap-1 items-center text-xs">
            <p className="relative top-[1px]">Created at:</p>
            <p>{created_at}</p>
          </div>
          <div className="flex flex-row-reverse ml-3">
            <span
              className="p-2 rounded-full hover:bg-neutral-700 active:bg-black"
              onClick={(e) => {
                const element = document.getElementById(delete_folder_div_id);
                if (element) {
                  element.style.visibility = "visible";
                  element.style.opacity = "100";
                }
                e.stopPropagation();
                // deleteFolder();
              }}
            >
              <MdDeleteForever
                title="Delete folder"
                className="sm:text-lg text-base"
              />
            </span>
            <span
              className="p-2 rounded-full hover:bg-neutral-700 active:bg-black"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <BiSolidEdit
                title="Rename folder"
                className="sm:text-lg text-base"
              />
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Folder;

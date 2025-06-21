"use client";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaStar, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuFolderPen } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";
import FileDetails from "./FileDetails";
import ChangeDirectoryOverlay from "./FileModify/ChangeDirectory";
import { useRouter } from "next/navigation";
import axios from "axios";
import { downloadFile } from "@/app/functions";
import DeleteFile from "./FileModify/DeleteFile";

type props = {
  id: number;
  fName: string;
  image: string;
  favourite: boolean;
  resolution?: string;
  size: string;
  uploaded: string;
  duration?: string;
  owner: string;
  type: "video" | "audio" | "other" | "image";
  extenstion: string;
};

type option = {
  name: string;
  ico: IconType;
  action: Function;
};

const FileComponent = ({
  id,
  fName,
  image,
  favourite,
  resolution,
  duration,
  size,
  uploaded,
  owner,
  type,
  extenstion,
}: props) => {
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [togFOpts, setTogFOpts] = useState<boolean>(false);
  const [LocalFavourite, setLocalFavourite] = useState(favourite);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const opts: option[] = [
    {
      name: "Download",
      ico: FaDownload,
      action: () => {
        downloadFile(id, token);
        setTogFOpts(false);
      },
    },
    {
      name: "Share file",
      ico: RiUserSharedLine,
      action: () => {
        setTogFOpts(false);
      },
    },
    {
      name: "Change directory",
      ico: LuFolderPen,
      action: () => {
        setTogFOpts(false);
        const element = document.getElementById(`${id.toString()}_cd`);
        if (element) {
          element.style.opacity = "100";
          element.style.visibility = "visible";
        }
      },
    },
    {
      name: "Delete",
      ico: FaRegTrashAlt,
      action: () => {
        setTogFOpts(false);
        const element = document.getElementById(`${id.toString()}_df`);
        if (element) {
          element.style.opacity = "100";
          element.style.visibility = "visible";
        }
      },
    },
    {
      name: "Properties",
      ico: IoIosInformationCircleOutline,
      action: (id: string) => {
        setTogFOpts(false);
        const element = document.getElementById(`${id.toString()}_details`);
        if (element) {
          element.style.opacity = "100";
          element.style.visibility = "visible";
        }
      },
    },
  ];

  const addToFavourite = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/add-file?fileId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch {}
  };

  const removeFromFavourite = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/remove-file?fileId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch {}
  };

  const toggleOptios = () => {
    setTogFOpts(!togFOpts);
  };

  useEffect(() => {
    const auth_token = localStorage.getItem("access_token");
    if (!auth_token) router.push("/user/login");
    setToken(auth_token || "");
    const handleOutsideClick = (event: any) => {
      if (!fileMenuRef.current?.contains(event.target)) {
        setTogFOpts(false);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex relative flex-col items-center bg-neutral-800 w-[110px] h-[110px] sm:w-[200px] sm:h-[200px] rounded-[10px] p-0 cursor-pointer"
      onMouseLeave={() => {
        setHovered(() => false);
      }}
      onClick={() => {
        if (type === "image" || type === "video")
          window.open(`/${type}/${id}`, "_blank");
      }}
    >
      <FileDetails
        id={`${id.toString()}_details`}
        file_type={type}
        name={fName}
        resolution={resolution}
        duration={duration}
        extension={extenstion}
        uploaded={uploaded}
        size={size}
        owner={owner}
      />

      <ChangeDirectoryOverlay id={`${id.toString()}_cd`} />
      <DeleteFile id={`${id.toString()}_df`} fileId={id} />

      <div className="absolute left-1 top-1">
        <div
          className="flex justify-center items-center w-8 h-8 rounded-full
                    duration-150 hover:bg-neutral-900/50 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleOptios();
          }}
        >
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            color="#DEDEDE"
            width={15}
            height={15}
          />
        </div>
      </div>

      {/* The favourite star div */}
      <div
        className="absolute justify-center top-2 right-3"
        onClick={(e) => {
          e.stopPropagation();
          setLocalFavourite(!LocalFavourite);
          favourite ? removeFromFavourite() : addToFavourite();
        }}
        title={`${LocalFavourite ? "Remove from favourites" : "Add to favourites"}`}
      >
        {LocalFavourite ? (
          <FaStar
            className="sm:w-6 sm:h-6 w-4 h-4"
            width={15}
            height={15}
            color="#c83c51"
          />
        ) : (
          <FaRegStar
            className="sm:w-6 sm:h-6 h-4 w-4"
            width={15}
            height={15}
            color="#c83c51"
          />
        )}
      </div>

      {/* The toggled options menu of file component */}
      <div
        className={`absolute z-20 top-12 left-3 w-[155px] duration-200 ${!togFOpts && "scale-0"}`}
        ref={fileMenuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col text-[12px] w-full gap-1 bg-neutral-800 text-neutral-100/50 rounded-lg">
          {opts.map((o: option) => {
            const Icon = o.ico;
            return (
              <li
                className="flex items-center p-2 duration-150 rounded-lg hover:bg-neutral-700 hover:text-neutral-100"
                key={o.name}
                onClick={() => {
                  o.action(id.toString());
                }}
              >
                <p>{o.name}</p>
                <Icon className="absolute right-2 w-4 h-4" />
              </li>
            );
          })}
        </ul>
      </div>

      <img
        src={image}
        className="object-cover w-full h-full rounded-[15px]"
        onMouseEnter={() => setHovered(() => true)}
      />
      <div
        className={`absolute bottom-0 w-full flex sm:text-[13px] text-[9px]
                    items-center px-2 bg-red-800 rounded-b-[15px]
                    line-clamp-1 text-ellipsis text-nowrap
                    duration-200 ${!hovered ? "sm:h-[36px] h-6" : "sm:h-0 h-6 sm:opacity-0 opacity-100"} `}
        title={fName}
      >
        {fName}
      </div>
    </div>
  );
};

export default FileComponent;

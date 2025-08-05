"use client";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  FaStar,
  FaRegStar,
  FaRegTrashAlt,
  FaMicrophone,
  FaRegImage,
} from "react-icons/fa";
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
import {
  MdOndemandVideo,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";
import Image from "next/image";
import { IoDocument } from "react-icons/io5";
import RestoreFile from "./FileModify/RestoreFile";

type props = {
  id: number;
  fName: string;
  thumbnail: string;
  favourite: boolean;
  resolution?: string;
  size: string;
  uploaded: string;
  duration?: string;
  owner: string;
  type: "video" | "audio" | "other" | "image";
  fps: number;
  extenstion: string;
  deleted?: boolean;
  userId?: string;
};

type option = {
  name: string;
  ico: IconType;
  action: Function;
};

const typesIcons = {
  audio: FaMicrophone,
  image: FaRegImage,
  video: MdOndemandVideo,
  other: IoDocument,
};

const fileIcons = {
  audio: "/audio_icon.png",
  other: "/doc_icon.png",
};

const FileComponent = ({
  id,
  fName,
  favourite,
  resolution,
  duration,
  size,
  uploaded,
  owner,
  type,
  extenstion,
  deleted,
  thumbnail,
  userId,
  fps,
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
        downloadFile(id, token, fName);
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
    // {
    //   name: "Change directory",
    //   ico: LuFolderPen,
    //   action: () => {
    //     setTogFOpts(false);
    //     const element = document.getElementById(`${id.toString()}_cd`);
    //     if (element) {
    //       element.style.opacity = "100";
    //       element.style.visibility = "visible";
    //     }
    //   },
    // },
    {
      name: deleted ? "Delete permanently" : "Delete",
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

  const deletedOpts: option[] = [
    {
      name: "Restore file",
      ico: MdOutlineSettingsBackupRestore,
      action: () => {
        setTogFOpts(false);
        const element = document.getElementById(id.toString() + "_rf");
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
        fps={Number(fps)}
      />

      <RestoreFile id={id.toString() + "_rf"} fileId={id} />
      <ChangeDirectoryOverlay id={`${id.toString()}_cd`} />
      <DeleteFile id={`${id.toString()}_df`} fileId={id} deleted={deleted} />

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
      {!deleted && (
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
      )}

      {/* The toggled options menu of file component */}
      <div
        className={`absolute z-20 top-12 left-3 w-[155px] duration-200 ${!togFOpts && "opacity-0 mt-5 invisible"}`}
        ref={fileMenuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col text-[12px] font-semibold w-full gap-1 bg-neutral-800 text-neutral-100/50 rounded-lg border-[1px] border-neutral-400/20">
          {opts.concat(deleted ? deletedOpts : []).map((o: option) => {
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

      <Image
        src={
          type === "audio"
            ? fileIcons.audio
            : type === "other"
              ? fileIcons.other
              : `${process.env.NEXT_PUBLIC_SERVER_URI || ""}/uploads/${userId}/thumbnails/${thumbnail}`
        }
        className="object-cover w-full h-full rounded-[15px]"
        onMouseEnter={() => setHovered(() => true)}
        alt={fName}
        width={200}
        height={200}
      />
      <div
        className={`absolute bottom-0 w-full flex gap-2 sm:text-[13px] text-[9px]
                    items-center px-2 bg-red-800 rounded-b-[15px]
                    line-clamp-1 text-ellipsis text-nowrap
                    duration-200 ${!hovered ? "sm:h-[36px] h-6" : "sm:h-0 h-6 sm:opacity-0 opacity-100"} `}
        title={fName}
      >
        <div className="sm:text-[15px] text-[12px]">
          {type === "video" ? (
            <MdOndemandVideo />
          ) : type === "audio" ? (
            <FaMicrophone />
          ) : type === "image" ? (
            <FaRegImage />
          ) : (
            <IoDocument />
          )}
        </div>
        <p className="overflow-hidden font-bold">{fName}</p>
      </div>
    </div>
  );
};

export default FileComponent;

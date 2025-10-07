import { downloadFile } from "@/app/functions";
import { useApi } from "@/lib/useApi";
import {
  FaDownload,
  FaFile,
  FaFileAudio,
  FaFolder,
  FaImage,
  FaVideo,
} from "react-icons/fa";

const iconStyle = {
  width: "30px",
  height: "30px",
};

const typeIcons = {
  folder: FaFolder,
  image: FaImage,
  video: FaVideo,
  audio: FaFileAudio,
  other: FaFile,
};

export interface SharedComponentProps {
  id: number;
  name: string;
  sizeInKb: number;
  type: "folder" | "image" | "video" | "audio" | "other";
  date: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  extension: string;
  thumbnail?: string;
  duration?: number;
  resolution?: string;
}

const SharedComponent = ({
  id,
  name,
  sizeInKb,
  type,
  date,
  extension,
  thumbnail,
  duration,
  resolution,
  user: { firstName, lastName, email },
}: SharedComponentProps) => {
  const { api } = useApi();

  const Icon = typeIcons[type];
  const viewFilePage = () => {
    if (type === "folder") {
      window.open(`/folders/folder/${id}`, "_blank");
    }
    if (type === "image") {
      window.open(`/cloud/shared/view/image/${id}`, "_blank");
    }
    if (type === "video") {
      window.open(`/cloud/shared/view/video/${id}`, "_blank");
    }
  };

  return (
    <div
      onClick={viewFilePage}
      className="p-3 flex items-center gap-3 rounded-md bg-neutral-800 hover:bg-neutral-900 transition cursor-pointer"
    >
      <div className="text-primary-500">
        <Icon style={iconStyle} />
      </div>
      <div className="ml-3 flex-1 min-w-0 ">
        <p
          title={name}
          className="sm:text-lg text-sm font-bold truncate
          xl:w-[500px] lg:w-[390px] md:w-[200px] w-[100px]"
        >
          {name}
        </p>
      </div>
      <div className="hidden md:flex flex-col items-end">
        <div className="flex items-center">
          <p>
            {firstName} {lastName}
          </p>
        </div>
        <p className="text-xs opacity-70">{email}</p>
      </div>
      <div className="flex sm:flex-none justify-end">
        <div
          onClick={(e) => {
            e.stopPropagation();
            downloadFile(api, id, name);
          }}
          className="ml-10 sm:mr-10 p-3 transition bg-primary-500 hover:bg-primary-600 rounded-full"
        >
          <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

export default SharedComponent;

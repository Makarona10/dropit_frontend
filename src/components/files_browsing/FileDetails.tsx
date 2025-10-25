import { useRef } from "react";
import Modal, { ModalProps } from "../common/Modal";

type FType = "video" | "image" | "audio" | "other";

interface DetProps extends ModalProps {
  id: string;
  file_type: FType;
  name: string;
  resolution?: string;
  duration?: string;
  extension: string;
  uploaded: string;
  size: string;
  owner: string;
  fps: number;
}

const FileDetails = ({
  id,
  file_type,
  name,
  resolution,
  duration,
  extension,
  uploaded,
  size,
  fps,
  owner,
  isOpen,
  onClose,
}: DetProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex flex-col sm:w-[450px] w-[calc(100vw-60px)] rounded-lg p-2"
        ref={divRef}
      >
        <div
          className="sm:text-xl text-lg text-white/90 font-semibold pb-3
          border-b-[1px] border-b-neutral-600/80"
        >
          File properties
        </div>
        <div className="flex flex-col gap-3 mt-5 relative">
          <div className="flex flex-wrap w-full text-wrap items-cetner sm:text-sm text-xs">
            <p className="font-bold">• Name:</p>{" "}
            <p
              title={name}
              className="relative w-full ml-1 h-auto break-words line-clamp-3"
            >
              {name}
            </p>
          </div>

          <div className="flex items-cetner sm:text-sm text-xs">
            <p className="font-bold">• Size:</p> <p className="ml-1">{size}</p>
          </div>
          <div className="flex items-cetner sm:text-sm text-xs">
            <p className="font-bold">• Type:</p>{" "}
            <p className="ml-1">{file_type}</p>
          </div>
          <div className="flex items-cetner sm:text-sm text-xs">
            <p className="font-bold">• Extension:</p>{" "}
            <p className="ml-1">{extension}</p>
          </div>
          <div className="flex items-cetner sm:text-sm text-xs">
            <p className="font-bold">• Uploaded:</p>{" "}
            <p className="ml-1">{uploaded}</p>
          </div>
          {(file_type === "video" || file_type === "image") && (
            <div className="flex items-cetner sm:text-sm text-xs">
              <p className="font-bold">• Resolution:</p>{" "}
              <p className="ml-1">{resolution}</p>
            </div>
          )}
          {(file_type === "audio" || file_type === "video") && (
            <div className="flex items-cetner sm:text-sm text-xs">
              <p className="font-bold">• Duration:</p>{" "}
              <p className="ml-1">{duration}</p>
            </div>
          )}
          {file_type === "video" && (
            <div className="flex items-cetner sm:text-sm text-xs">
              <p className="font-bold">• FPS:</p> <p className="ml-1">{fps}</p>
            </div>
          )}
          <button
            className="transition duration-300 sm:text-sm text-xs font-semibold p-2 bg-primary-600 rounded-lg mt-3 hover:bg-primary-500 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FileDetails;

import React, { useEffect, useRef } from "react";

type FType = "video" | "image" | "audio" | "other";

type DetProps = {
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
};

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
}: DetProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="fixed m-auto h-screen inset-0 select-text cursor-default
      flex items-center justify-center bg-black bg-opacity-50 z-50   
      transition duration-300 invisible"
      id={id}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto "></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg border-[2px] border-neutral-700"
        ref={divRef}
        style={{ zIndex: 2 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="text-xl text-white/90 font-semibold pb-3
          border-b-[1px] border-b-neutral-600/80"
        >
          File properties
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex items-cetner">
            <p className="text-sm font-bold">Name:</p>{" "}
            <p className="ml-1 text-sm">{name}</p>
          </div>

          <div className="flex items-cetner">
            <p className="text-sm font-bold">Size:</p>{" "}
            <p className="ml-1 text-sm">{size}</p>
          </div>
          <div className="flex items-cetner">
            <p className="text-sm font-bold">Type:</p>{" "}
            <p className="ml-1 text-sm">{file_type}</p>
          </div>
          <div className="flex items-cetner">
            <p className="text-sm font-bold">Extension:</p>{" "}
            <p className="ml-1 text-sm">{extension}</p>
          </div>
          <div className="flex items-cetner">
            <p className="text-sm font-bold">Uploaded:</p>{" "}
            <p className="ml-1 text-sm">{uploaded}</p>
          </div>
          {(file_type === "video" || file_type === "image") && (
            <div className="flex items-cetner">
              <p className="text-sm font-bold">Resolution:</p>{" "}
              <p className="ml-1 text-sm">{resolution}</p>
            </div>
          )}
          {(file_type === "audio" || file_type === "video") && (
            <div className="flex items-cetner">
              <p className="text-sm font-bold">Duration:</p>{" "}
              <p className="ml-1 text-sm">{duration}</p>
            </div>
          )}
          {file_type === "video" && (
            <div className="flex items-cetner">
              <p className="text-sm font-bold">FPS:</p>{" "}
              <p className="ml-1 text-sm">{fps}</p>
            </div>
          )}
          <button
            className="p-2 bg-primary-600 rounded-lg mt-3 hover:bg-primary-500 cursor-pointer"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) {
                element.style.visibility = "hidden";
                element.style.opacity = "0";
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;

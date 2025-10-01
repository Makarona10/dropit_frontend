import { useApi } from "@/lib/useApi";
import { useEffect, useRef, useState } from "react";
import { MdOutlineRestorePage } from "react-icons/md";

type FileProps = {
  id: string;
  fileId: number;
};

const RestoreFile = ({ id, fileId }: FileProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const { api } = useApi();

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }
    }
  };

  const restoreFileRequest = async () => {
    try {
      await api(`/bin/restore-file/${fileId}`, "post");
      window.location.reload();
    } catch (error: any) {
      setError(error?.response?.data?.message);
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
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg border-[1px] border-white/30"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Restore file
        </h1>
        <div className="flex gap-2 mt-5">
          <MdOutlineRestorePage className="sm:text-4xl text-primary-500" />
          <p className="sm:text-base text-sm font-medium">
            Retore the file from the bin and move it back to your files.
          </p>
        </div>
        {error && (
          <div className="text-sm text-primary-600">
            {error || "Error happened!"}
          </div>
        )}
        <div className="flex flex-row-reverse gap-2 sm:text-sm text-xs mt-5">
          <button
            className="bg-green-600 active:bg-green-700 p-2 rounded-md"
            onClick={() => {
              restoreFileRequest();
            }}
          >
            Confirm
          </button>
          <button
            className="bg-primary-600 active:bg-primary-700 p-2 rounded-md"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) {
                element.style.visibility = "hidden";
                element.style.opacity = "0";
              }
            }}
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreFile;

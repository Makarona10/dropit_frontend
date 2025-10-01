import { useApi } from "@/lib/useApi";
import { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type FileProps = {
  id: string;
  fileId: number;
  deleted?: boolean;
};

const DeleteFile = ({ id, fileId, deleted }: FileProps) => {
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

  const deleteRequest = async () => {
    try {
      await api(`/bin/move-file-to-bin/${fileId}`, "post");
      window.location.reload();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  };

  const deletePermanentlyRequest = async () => {
    try {
      await api(`/bin/delete-file-permanently/${fileId}`, "delete");
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
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Delete the file
        </h1>
        <div className="flex items-center gap-2">
          <FaRegTrashAlt className="text-md text-primary-500" />
          <p className="sm:text-base text-sm font-medium py-4">
            {deleted
              ? "Warning: File will be deleted forever!"
              : "File will be transferred to your bin"}
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
              if (deleted) {
                deletePermanentlyRequest();
              } else {
                deleteRequest();
              }
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

export default DeleteFile;

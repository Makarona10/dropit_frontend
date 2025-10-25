"use client";
import { useApi } from "@/lib/useApi";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import Modal, { ModalProps } from "../common/Modal";
import LoadingSpinner from "../common/LoadingSpinner";
import LoadingBar from "../visuals/LoadingBar";

const CreateFolder = ({ isOpen, onClose }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { folderId } = useParams();
  const [name, setName] = useState<string>("");
  const [msg, setMsg] = useState({
    error: false,
    msg: "",
  });
  const [waitingResponse, setWaitingResponse] = useState(false);
  const { api } = useApi();

  const createFolderRequest = async () => {
    setName(inputRef.current?.value || "");
    if (!name && name === "") {
      setMsg({ error: true, msg: "Please enter a valid name" });
    }

    try {
      setWaitingResponse(true);
      const res = await api(`/folder/create`, "post", {
        name: inputRef.current?.value,
        parentId: folderId,
      });
      if (res.data.statusCode === 201) {
        setWaitingResponse(false);
        setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    } catch (error: any) {
      setWaitingResponse(false);
      setMsg({
        error: true,
        msg: error?.response?.data?.message || "Unexpected error happened",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] w-[calc(100vw-60px)] gap-2">
        <div className="flex items-center gap-3 sm:text-lg text-sm font-bold mb-4">
          <h1>Create a new folder</h1>
          <FaFolder />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFolderRequest();
          }}
          className="w-full"
        >
          <input
            className="w-full indent-2 p-2 outline-none border-0 ring-offset-none text-neutral-950
                       rounded-lg text-xs sm:text-base"
            type="text"
            placeholder="Folder name"
            ref={inputRef}
          />
        </form>
        {waitingResponse && (
          <div className="flex items-center gap-2">
            <LoadingSpinner size={18} />
            <p className="sm:text-xs text-[11px]">Creating a new folder</p>
          </div>
        )}
        <p
          className={`w-full ${msg.error ? "text-primary-400" : "text-green-600"} sm:text-sm text-xs`}
        >
          {msg.msg}
        </p>
        <div className="flex flex-row-reverse items-center gap-2 sm:text-sm text-xs">
          <button
            className="p-2 bg-green-600 rounded-lg active:bg-green-700"
            onClick={(e) => {
              createFolderRequest();
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-neutral-700 rounded-lg active:bg-neutral-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFolder;

"use client";
import { useApi } from "@/lib/useApi";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import Modal, { ModalProps } from "../common/Modal";

const CreateFolder = ({ isOpen, onClose }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { folderId } = useParams();
  const [name, setName] = useState<string>("");
  const [msg, setMsg] = useState({
    error: false,
    msg: "",
  });
  const { api } = useApi();

  const createFolderRequest = async () => {
    setName(inputRef.current?.value || "");
    if (!name && name === "") {
      setMsg({ error: true, msg: "Please enter a valid name" });
    }

    try {
      const res = await api(`/folder/create`, "post", {
        name: inputRef.current?.value,
        parentId: folderId,
      });
      if (res.data.statusCode === 201) {
        setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    } catch (error: any) {
      setMsg({
        error: true,
        msg: error?.response?.data?.message || "Unexpected error happened",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] w-[200px] gap-2">
        <div className="flex items-center gap-3 sm:text-lg text-sm font-bold mb-4">
          <h1>Create a new folder</h1>
          <FaFolder />
        </div>

        <div className="w-full">
          <input
            className="w-full indent-2 p-2 outline-none border-0 ring-offset-none text-neutral-950
                       rounded-lg text-xs sm:text-base"
            type="text"
            placeholder="Folder name"
            ref={inputRef}
          />
        </div>
        <div
          className={`w-full ${msg.error ? "text-primary-400" : "text-green-600"}`}
        >
          {msg.msg}
        </div>
        <div className="flex flex-row-reverse items-center gap-2 sm:text-sm text-xs">
          <button
            className="p-2 bg-green-600 rounded-lg active:bg-green-700"
            onClick={() => {
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

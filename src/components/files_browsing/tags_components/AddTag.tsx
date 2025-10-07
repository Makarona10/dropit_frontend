"use client";
import Modal, { ModalProps } from "@/components/common/Modal";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import { FaTags } from "react-icons/fa6";

const AddTag = ({ isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { api } = useApi();

  const addTagSubmit = async () => {
    if (!name || name.length < 1) {
      setError("Please Enter a name for your tag");
      return;
    }

    setError("");
    try {
      const res = await api(`/tag/create`, "post", { name });

      if (res.data.statusCode === 201) {
        window.location.reload();
      }
    } catch (error: any) {
      setError("Please enter a valid name");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] gap-4">
        <div className="flex items-center gap-3 sm:text-lg text-sm font-bold">
          <h1>Write a name for your tag</h1>
          <FaTags />
        </div>

        <div className="flex flex-col w-full">
          <input
            className="w-full indent-2 p-2 outline-none border-0 ring-offset-none text-neutral-950
                       rounded-lg text-xs sm:text-base"
            type="text"
            placeholder="Tag name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <p className="text-primary-300 text-sm mt-2">{error ? error : ""}</p>
        </div>
        <div className="flex flex-row-reverse items-center gap-2 sm:text-sm text-xs">
          <button
            className="p-2 bg-green-600 rounded-lg active:bg-green-700"
            onClick={() => {
              addTagSubmit();
            }}
          >
            Confirm
          </button>
          <button
            className="p-2 bg-neutral-700 rounded-lg active:bg-neutral-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTag;

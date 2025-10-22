import Modal, { ModalProps } from "@/components/common/Modal";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import { IoIosWarning } from "react-icons/io";

const CleanBin = ({ isOpen, onClose }: ModalProps) => {
  const [error, setError] = useState<string>("");
  const { api } = useApi();

  const deleteRequest = async () => {
    try {
      const res = await api(`/bin/clean-bin`, "delete");
      if (res.status === 200) window.location.reload();
    } catch (error: any) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px]">
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Clean bin
        </h1>
        <div className="flex flex-col items-center gap-2 mt-4">
          <IoIosWarning className="text-primary-500 sm:text-4xl text-lg" />
          <p className="sm:text-base text-sm font-medium">
            All files in your bin will be deleted forever, no look back.
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
            onClick={() => deleteRequest()}
          >
            Confirm
          </button>
          <button
            className="bg-primary-600 active:bg-primary-700 p-2 rounded-md"
            onClick={onClose}
          >
            Close{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CleanBin;

import LoadingSpinner from "@/components/common/LoadingSpinner";
import Modal, { ModalProps } from "@/components/common/Modal";
import { useApi } from "@/lib/useApi";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface FileProps extends ModalProps {
  fileId: number;
  deleted?: boolean;
}

const DeleteFile = ({ fileId, deleted, isOpen, onClose }: FileProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);
  const { api } = useApi();

  const deleteRequest = async () => {
    try {
      setIsRequestProcessing(true);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] rounded-lg" ref={divRef}>
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
            className="inline-flex gap-2 bg-green-600 active:bg-green-700 p-2 rounded-md"
            onClick={() => {
              if (deleted) {
                deletePermanentlyRequest();
              } else {
                deleteRequest();
              }
            }}
            disabled={isRequestProcessing}
          >
            Confirm
            {isRequestProcessing && <LoadingSpinner size={20} />}
          </button>
          <button
            className="bg-neutral-700 active:bg-neutral-800 p-2 rounded-md"
            onClick={onClose}
          >
            Close{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFile;

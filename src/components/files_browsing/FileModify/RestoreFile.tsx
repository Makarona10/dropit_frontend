import LoadingSpinner from "@/components/common/LoadingSpinner";
import Modal, { ModalProps } from "@/components/common/Modal";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import { MdOutlineRestorePage } from "react-icons/md";

interface FileProps extends ModalProps {
  fileId: number;
}

const RestoreFile = ({ fileId, isOpen, onClose }: FileProps) => {
  const [error, setError] = useState<string>("");
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);
  const { api } = useApi();

  const restoreFileRequest = async () => {
    try {
      setIsRequestProcessing(true);
      await api(`/bin/restore-file/${fileId}`, "post");
      window.location.reload();
    } catch (error: any) {
      setIsRequestProcessing(false);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] w-[calc(100vw-60px)] rounded-lg">
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Restore file
        </h1>
        <div className="flex gap-2 mt-5">
          <MdOutlineRestorePage className="sm:text-4xl text-primary-500" />
          <p className="sm:text-base text-xs font-medium">
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
            className="inline-flex items-center gap-2 bg-green-600 active:bg-green-700 p-2 rounded-md"
            onClick={() => {
              restoreFileRequest();
            }}
            disabled={isRequestProcessing}
          >
            Confirm
            {isRequestProcessing && <LoadingSpinner size={20} />}
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

export default RestoreFile;

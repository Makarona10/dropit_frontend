import LoadingSpinner from "@/components/common/LoadingSpinner";
import Modal, { ModalProps } from "@/components/common/Modal";
import LoadingDots from "@/components/visuals/ButtonLoading";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface _Props extends ModalProps {
  id: number;
}

const DeleteFolder = ({ id, isOpen, onClose }: _Props) => {
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);
  const { api } = useApi();

  const deleteFolder = async () => {
    try {
      setIsRequestProcessing(true);
      const res = await api(`/folder/delete/${id}`, "delete");
      if (res.data.statusCode === 200) {
        // setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      setIsRequestProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[450px] rounded-lg gap-6">
        <div className="flex items-center gap-2 sm:text-xl text-base font-semibold">
          <p>Deletion confirmation</p>
        </div>
        <hr className="relative bottom-2 opacity-40" />
        <div className="flex items-start gap-2">
          <FaRegTrashAlt className="text-primary-500 sm:text-xl text-lg" />
          <p className="sm:text-sm text-xs">
            The folder and all its content will be deleted permanently!
          </p>
        </div>
        <div
          className="flex flex-row-reverse w-full gap-3 text-sm mt-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className="h-full inline-flex gap-2 bg-green-600 active:bg-green-700 disabled:bg-green-700"
            onClick={() => {
              deleteFolder();
            }}
            disabled={isRequestProcessing}
          >
            {isRequestProcessing && <LoadingSpinner size={20} />}
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-neutral-700 active:bg-neutral-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFolder;

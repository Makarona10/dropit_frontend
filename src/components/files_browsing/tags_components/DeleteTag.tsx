import { useEffect, useRef, useState } from "react";
import { MdOutlineWarning } from "react-icons/md";
import { useApi } from "@/lib/useApi";
import Modal from "@/components/common/Modal";
import { ModalProps } from "@/components/common/Modal";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const delBtnsStyle = "inline-flex items-center gap-2 p-2 rounded-lg text-sm";

interface _Props extends ModalProps {
  tag_id: number;
}

const DeleteTag = ({ tag_id, isOpen, onClose }: _Props) => {
  const { api } = useApi();
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);

  const deleteTagRequest = async () => {
    try {
      setIsRequestProcessing(true);
      const response = await api(`/tag/delete?tagId=${tag_id}`, "delete");
      if (response.data.statusCode === 200) {
        window.location.reload();
      }
    } catch (error) {
      setIsRequestProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col sm:w-[410px]">
        <div className="flex flex-col justify-center sm:text-lg">
          <div className="flex items-center">
            <MdOutlineWarning />
            <p className="font-bold p-3">
              Do you really want to delete this tag ?
            </p>
          </div>
          <p className="sm:text-xs text-[10px] opacity-70">
            *All related files will not be deleted.
          </p>
        </div>
        <div className="flex flex-row-reverse gap-2 pt-5">
          <button
            className={`${delBtnsStyle} bg-primary-700 active:bg-primary-800`}
            onClick={() => deleteTagRequest()}
            disabled={isRequestProcessing}
          >
            Confirm
            {isRequestProcessing && <LoadingSpinner size={20} />}
          </button>
          <button
            className={`${delBtnsStyle} bg-neutral-700 active:bg-neutral-800`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTag;

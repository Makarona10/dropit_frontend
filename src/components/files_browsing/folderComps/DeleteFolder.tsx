import Modal, { ModalProps } from "@/components/common/Modal";
import { useApi } from "@/lib/useApi";
import { FaRegTrashAlt } from "react-icons/fa";

interface _Props extends ModalProps {
  id: number;
}

const DeleteFolder = ({ id, isOpen, onClose }: _Props) => {
  const { api } = useApi();

  const deleteFolder = async () => {
    try {
      const res = await api(`/folder/delete/${id}`, "delete");
      if (res.data.statusCode === 200) {
        // setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      // setMsg({
      //   error: true,
      //   msg: error?.response?.data?.message || "Unexpected error happened",
      // });
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
          <FaRegTrashAlt className="text-primary-500 sm:text-xl text-xl mt-1" />
          <p>The folder and all its content will be deleted permanently!</p>
        </div>
        <div
          className="flex flex-row-reverse w-full gap-3 text-sm mt-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className="bg-green-600 active:bg-green-700 p-2 rounded-md"
            onClick={() => {
              deleteFolder();
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-neutral-700 active:bg-neutral-800 p-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFolder;

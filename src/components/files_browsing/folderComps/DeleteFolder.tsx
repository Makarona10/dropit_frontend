import { useApi } from "@/lib/useApi";
import { useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

type _Props = {
  id: number;
};

const DeleteFolder = ({ id }: _Props) => {
  const delete_folder_div_id = `delete_folder_${id}`;
  const divRef = useRef<HTMLDivElement>(null);
  const { api } = useApi();

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      const element = document.getElementById(delete_folder_div_id);
      if (element) {
        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }
    }
  };

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
      id={delete_folder_div_id}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg gap-6 border-[1px] border-white/30"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <div className="flex items-center gap-2 sm:text-xl text-base font-semibold">
          <FaTrash />
          <p>Deletion confirmation</p>
        </div>
        <hr className="relative bottom-2 opacity-40" />
        <div className="flex">
          <p className="opacity-100 font-bold text-base flex gap-2">
            <IoIosWarning className="text-primary-500 sm:text-2xl text-xl" />
            The folder and all its content will be deleted permanently!
          </p>
        </div>
        <div
          className="flex w-full gap-3 text-sm mt-2"
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
            onClick={() => {
              const e = document.getElementById(delete_folder_div_id);
              if (e) {
                e.style.visibility = "hidden";
                e.style.opacity = "0";
              }
            }}
            className="bg-primary-600 active:bg-primary-700 p-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolder;

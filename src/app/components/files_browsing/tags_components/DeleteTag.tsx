import { useEffect, useRef, useState } from "react";
import { MdOutlineWarning } from "react-icons/md";
import axios from "axios";

const delBtnsStyle = "p-2 rounded-lg text-sm";

type _Props = {
  tag_id: number;
};

const DeleteTag = ({ tag_id }: _Props) => {
  const div_id = `delete_${tag_id}`;
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<boolean>(false);

  const deleteTagRequest = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/tag/delete?tagId=${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.statusCode === 200) {
        window.location.reload();
      }
    } catch (error) {
      setError(true);
    }
  };

  const hideDeleteDiv = () => {
    const element = document.getElementById(div_id);
    if (element) {
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  };

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      hideDeleteDiv();
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
      className={`fixed m-auto h-screen inset-0 select-text cursor-default
        flex items-center justify-center bg-black bg-opacity-50 z-50   
        transition duration-300 invisible`}
      style={{ zIndex: 2 }}
      id={div_id}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-2xl"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
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
            className={`${delBtnsStyle} bg-primary-600 active:bg-primary-800`}
            onClick={() => deleteTagRequest()}
          >
            Confirm
          </button>
          <button
            className={`${delBtnsStyle} bg-neutral-700 active:bg-neutral-800`}
            onClick={() => {
              hideDeleteDiv();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTag;

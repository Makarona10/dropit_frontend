"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";

const CreateFolder = () => {
  const id = "create_folder";
  const divRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { folderId } = useParams();
  const [name, setName] = useState<string>("");
  const [msg, setMsg] = useState({
    error: false,
    msg: "",
  });
  const router = useRouter();

  const hideDiv = () => {
    const element = document.getElementById(id);
    if (element) {
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  };

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      hideDiv();
    }
  };

  const createFolderRequest = async () => {
    setName(inputRef.current?.value || "");
    if (!name && name === "") {
      setMsg({ error: true, msg: "Please enter a valid name" });
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/user/login");
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/folder/create`,
        {
          name,
          parentId: folderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.statusCode === 201) {
        setMsg({ error: false, msg: "Folder Created successfully" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error: any) {
      setMsg({
        error: true,
        msg: error?.response?.data?.message || "Unexpected error happened",
      });
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
      id={id}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg gap-6"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <div className="flex items-center gap-3 sm:text-lg text-sm font-bold">
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
            className="p-2 bg-neutral-700 rounded-lg active:bg-neutral-800"
            onClick={() => hideDiv()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;

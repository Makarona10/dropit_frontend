import { useEffect, useRef, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { IoIosWarning } from "react-icons/io";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  permittedImages,
  permittedOtherExtensions,
  permittedVideos,
} from "@/app/types";

const permittedExtensions = permittedVideos
  .concat(permittedOtherExtensions)
  .concat(permittedImages);

const UploadFile = () => {
  const [error, setError] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const upFileRef = useRef<HTMLDivElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const id = "upload_file_div";
  const { folderId } = useParams();

  useEffect(() => {
    const handleUploadOutsideClick = (event: any) => {
      if (upFileRef.current && !upFileRef.current.contains(event.target)) {
        const element = document.getElementById(id);
        if (element) {
          element.style.opacity = "0";
          element.style.visibility = "hidden";
        }
      }
    };

    window.addEventListener("mousedown", handleUploadOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleUploadOutsideClick);
    };
  }, []);

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files) as File[];
    const validFiles: File[] = [];
    const validNames: string[] = [];

    for (const file of files) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && permittedExtensions.includes(fileExtension)) {
        validFiles.push(file);
        validNames.push(file.name);
      }
    }

    if (validFiles.length > 20) {
      setError("You are only allowed to upload maximum of 20 files at a time.");
      setSelectedFiles([]);
      return;
    } else {
      setError("");
    }

    if (validFiles.length) {
      setError("");
      setSelectedFiles(validFiles);
      setFileNames(validNames);
    } else {
      setSelectedFiles([]);
      setFileNames([]);
      setError(
        "No valid files. Allowed extensions: " + permittedExtensions.join(", "),
      );
      event.target.value = "";
    }
  };

  const pushToServer = async (parentId: number | null) => {
    const token = localStorage.getItem("access_token");
    if (!selectedFiles.length) {
      setError("No file selected. Please choose a files first.");
      return;
    }
    if (selectedFiles.length > 20) {
      setError("You are only allowed to upload maximum of 20 files at a time.");
      return;
    }

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/file/upload-file${parentId ? `?parentId=${parentId}` : ""}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setError("");
      setFileNames([]);
      setSelectedFiles([]);
      if (response.data.statusCode === 201) {
        window.location.reload();
      }
      const element = document.getElementById(id);
      if (element) {
        element.style.opacity = "0";
        element.style.visibility = "hidden";
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Failed to upload file. Please try again.",
      );
    }
  };

  return (
    <div
      className="fixed m-auto h-screen inset-0 select-text cursor-default
      flex items-center justify-center bg-black bg-opacity-50 z-20   
      transition duration-300 invisible opacity-0"
      id={id}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] w-10/12 bg-neutral-900 p-6 rounded-lg border-2 border-neutral-500"
        style={{ zIndex: 2 }}
        ref={upFileRef}
      >
        <div className="flex relative pb-2 w-full border-b-[1px] border-white/30">
          <h1 className="sm:text-lg font-bold text-sm">Upload files</h1>
          <div className="absolute right-0 top-1 group inline-block">
            <div
              className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center 
              hover:bg-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span className="text-lg font-bold">i</span>
            </div>

            <div
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-neutral-600 text-white text-sm
              rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-normal
              transition-opacity duration-300 z-10"
            >
              Allowed extensions {"->"} {permittedExtensions.join(", ")}
            </div>
          </div>
        </div>
        {error && (
          <div className="flex flex-col items-center sm:text-sm text-xs pt-3 text-primary-400">
            <IoIosWarning className="sm:text-4xl text-xl" />
            <p>{error}</p>
          </div>
        )}
        {fileNames.length > 0 && !error && (
          <p className="sm:text-sm text-[10px] pt-3 text-green-500">
            {selectedFiles.length}{" "}
            {selectedFiles.length > 1 ? "files are" : "file is"} ready to get
            uploaded
          </p>
        )}
        <div className="flex items-center gap-2 mt-5">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
          <label
            htmlFor="fileInput"
            className="w-full cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md
            hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="sm:w-5 sm:h-5 h-3 w-3" />
            <span className="sm:text-base text-xs">Choose Files</span>
          </label>
        </div>
        <button
          className={`flex items-center gap-2 mt-2 px-4 w-full p-2 bg-green-600 rounded-md sm:text-base text-xs disabled:opacity-65`}
          onClick={() => pushToServer(Number(folderId) || null)}
          disabled={error || selectedFiles.length < 1 ? true : false}
        >
          <IoMdCloudUpload className="sm:text-xl text-base" />
          Push to the server
        </button>
      </div>
    </div>
  );
};

export default UploadFile;

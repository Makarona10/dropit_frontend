import { useEffect, useRef, useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { IoIosAt, IoIosWarning } from "react-icons/io";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { useParams } from "next/navigation";

const UploadFile = () => {
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const upFileRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const id = "upload_file_div";
  const { folderId } = useParams();

  const permittedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "pdf",
    "mp3",
    "mp4",
    "wav",
    "txt",
    "doc",
    "docx",
    "rar",
    "zip",
  ];

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
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop()?.toLowerCase();

      if (fileExtension && permittedExtensions.includes(fileExtension)) {
        setError("");
        setFileName(fileName);
        setSelectedFile(file);
      } else {
        setFileName("");
        setSelectedFile(null);
        setError(
          "File type not allowed. Please upload a file with one of the following extensions: " +
            permittedExtensions.join(", "),
        );
        event.target.value = "";
      }
    }
  };

  const pushToServer = async (parentId: number | null) => {
    const token = localStorage.getItem("access_token");
    if (!selectedFile) {
      setError("No file selected. Please choose a file first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/file/upload-file?parentId=${parentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setError("");
      setFileName("");
      setSelectedFile(null);
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
        className="flex flex-col sm:w-[450px] bg-neutral-900 p-6 rounded-lg"
        style={{ zIndex: 2 }}
        ref={upFileRef}
      >
        <div className="flex flex-col pb-6">
          <h1 className="sm:text-lg font-bold text-sm">Upload file</h1>
        </div>
        <div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-primary-500 text-white px-4 py-2 rounded-md
            hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="sm:w-5 sm:h-5 h-3 w-3" />
            <span className="sm:text-base text-xs">Choose File</span>
          </label>

          {fileName && (
            <p className="sm:text-sm text-[10px] pt-3 text-green-500">
              {fileName}
            </p>
          )}

          {error && (
            <div className="flex flex-col items-center sm:text-sm pt-3 text-primary-400">
              <IoIosWarning className="sm:text-4xl" />
              <p>{error}</p>
            </div>
          )}
        </div>
        <button
          className={`flex items-center gap-2 mt-2 px-4 w-full p-2 bg-green-600 rounded-md sm:text-base text-xs`}
          onClick={() => pushToServer(Number(folderId) || null)}
        >
          <IoMdCloudUpload className="sm:text-xl text-base" />
          Push to the server
        </button>

        {/* {fileName && ( */}
        {/*   <div className="flex flex-col mt-4 gap-3 pt-4 border-t-[1px] border-neutral-100/10"> */}
        {/*     <h1>Select a folder</h1> */}
        {/*     <div className="flex flex-col gap-2 text-sm"> */}
        {/*       <div className="flex items-center gap-3 hover:underline cursor-pointer"> */}
        {/*         <FontAwesomeIcon icon={faFolder} /> */}
        {/*         <p>Name of the file</p> */}
        {/*       </div> */}
        {/*       <div className="flex items-center gap-3"> */}
        {/*         <FontAwesomeIcon icon={faFolder} /> */}
        {/*         <p>Name of the file</p> */}
        {/*       </div> */}
        {/*       <div className="flex items-center gap-3"> */}
        {/*         <FontAwesomeIcon icon={faFolder} /> */}
        {/*         <p>Name of the file</p> */}
        {/*       </div> */}
        {/*       <div className="flex items-center gap-3"> */}
        {/*         <FontAwesomeIcon icon={faFolder} /> */}
        {/*         <p>Name of the file</p> */}
        {/*       </div> */}
        {/*       <div className="flex items-center gap-3"> */}
        {/*         <FontAwesomeIcon icon={faFolder} /> */}
        {/*         <p>Name of the file</p> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default UploadFile;

import { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { IoIosWarning } from "react-icons/io";
import { IoMdCloudUpload } from "react-icons/io";
import { useParams } from "next/navigation";
import {
  permittedImages,
  permittedOtherExtensions,
  permittedVideos,
} from "@/app/types";
import { useApi } from "@/lib/useApi";
import Modal, { ModalProps } from "../common/Modal";
import LoadingDots from "../visuals/ButtonLoading";

const permittedExtensions = permittedVideos
  .concat(permittedOtherExtensions)
  .concat(permittedImages);

const UploadFile = ({ isOpen, onClose }: ModalProps) => {
  const [error, setError] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);
  const { folderId } = useParams();
  const { api } = useApi();

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

      setIsRequestProcessing(true);
      const response = await api(
        `/file/upload-file${parentId ? `?parentId=${parentId}` : ""}`,
        "post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setIsRequestProcessing(false);
      setError("");
      setFileNames([]);
      setSelectedFiles([]);
      if (response.data.statusCode === 201) {
        window.location.reload();
      }
    } catch (error: any) {
      setIsRequestProcessing(false);
      setError(
        error?.response?.data?.message ||
          "Failed to upload file. Please try again.",
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex relative pb-2 w-96">
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
        className={`flex items-center gap-2 mt-2 px-4 w-full p-2 bg-green-600 rounded-md sm:text-base text-xs disabled:opacity-65 disabled:cursor-not-allowed`}
        onClick={() => pushToServer(Number(folderId) || null)}
        disabled={
          error || isRequestProcessing || selectedFiles.length < 1
            ? true
            : false
        }
      >
        {isRequestProcessing ? (
          <div className="w-full h-6 flex items-center justify-center">
            <LoadingDots />
          </div>
        ) : (
          <>
            <IoMdCloudUpload className="sm:text-xl text-base" />
            <p>Push to the server</p>
          </>
        )}
      </button>
    </Modal>
  );
};

export default UploadFile;

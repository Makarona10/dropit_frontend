"use client";

import HeadBtnsBar from "@/app/components/common/HeadBtnsBar";
import Header from "@/app/components/common/Header";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import SideBar from "@/app/components/common/SideBar";
import UploadFile from "@/app/components/create_and_add/UploadFile";
import CreateFolder from "@/app/components/files_browsing/CreateFolder";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import ListFolders from "@/app/components/files_browsing/ListFolders";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdCreateNewFolder, MdFileUpload } from "react-icons/md";

const upFileBtnId = "upload_file_div";

const btns = [
  {
    name: "Upload files",
    ico: MdFileUpload,
    color: "#4AA927",
    action: () => {
      const element = document.getElementById(upFileBtnId);
      if (element) {
        element.style.visibility = "visible";
        element.style.opacity = "100";
      }
    },
  },
  {
    name: "Create Folder",
    ico: MdCreateNewFolder,
    color: "#4AA927",
    action: () => {
      const add_tag_div_id = "create_folder";
      const element = document.getElementById(add_tag_div_id);
      if (element) {
        element.style.visibility = "visible";
        element.style.opacity = "100";
      }
    },
  },
];

const FolderContent = () => {
  const { folderId } = useParams();
  const [files, setFiles] = useState({
    error: false,
    data: [],
    loading: true,
    pages: 0,
  });
  const [folders, setFolders] = useState({
    error: false,
    data: [],
    loading: true,
    pages: 0,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const folderName = searchParams.get("fn") || "Content";

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/user/login");
    }

    const fetchContent = async () => {
      setFiles({ ...files, loading: true });
      setFolders({ ...folders, loading: true });
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/folder/folder-content/${folderId}?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.data.statusCode === 200) {
          setFiles({
            error: false,
            data: res.data.data.files,
            loading: false,
            pages: res.data.data.pages,
          });
          setFolders({
            error: false,
            data: res.data.data.folders,
            loading: false,
            pages: res.data.data.pages,
          });
        }
      } catch (error) {
        setFiles({ ...files, error: true, data: [], loading: false });
        setFolders({ ...files, error: true, data: [], loading: false });
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex w-full">
      <div className={`z-20`}>
        <UploadFile />
        <CreateFolder />
      </div>
      <SideBar title="Folders" />
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <div className="flex w-full items-center gap-10 pt-10 pl-10">
          <div className="flex w-full items-center gap-4 flex-nowrap">
            <h1 className="sm:text-2xl text-lg font-bold">{folderName}</h1>
            <FaFolder className="text-primary-500 sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
          </div>
          <div className="flex w-full sm:flex-row-reverse sm:pr-16">
            <PaginationButtons total={files.pages} />
          </div>
        </div>
        <hr className="opacity-50 w-10/12 mx-auto mt-5" />
        <div className="flex flex-wrap gap-5 p-8 w-full sm:mt-4">
          {files.loading && (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          {!files.loading && files.error && (
            <div className="w-full font-semibold text-center text-2xl underline">
              Error happened while loading files, Try refreshing the page
            </div>
          )}

          {!files.loading && !files.error && files.data.length < 1 && (
            <div className="w-full text-2xl text-center font-semibold">
              No files
            </div>
          )}

          {!files.loading && !files.error && files.data.length > 0 && (
            <ListFiles files={files.data} />
          )}
        </div>
        <hr className="w-10/12 mx-auto mt-5 opacity-50" />
        <div className="flex flex-wrap gap-5 p-8 w-full sm:mt-4">
          {folders.loading && (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          )}
          {!folders.loading && folders.error && (
            <div className="w-full font-semibold text-center text-2xl underline">
              Error happened while loading files, Try refreshing the page
            </div>
          )}

          {!folders.loading && !folders.error && folders.data.length < 1 && (
            <div className="w-full text-2xl text-center font-semibold">
              No folders
            </div>
          )}

          {!folders.loading && !folders.error && folders.data.length > 0 && (
            <ListFolders folders={folders.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderContent;

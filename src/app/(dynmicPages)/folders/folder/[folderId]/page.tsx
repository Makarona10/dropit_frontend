"use client";

import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SideBar from "@/components/common/SideBar";
import UploadFile from "@/components/create_and_add/UploadFile";
import CreateFolder from "@/components/files_browsing/CreateFolder";
import ListFiles from "@/components/files_browsing/ListFiles";
import ListFolders from "@/components/files_browsing/ListFolders";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdCreateNewFolder, MdFileUpload } from "react-icons/md";

const upFileBtnId = "upload_file_div";

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
  const [isUploadFileVisible, setIsUploadFileVisible] = useState(false);
  const [isCreateFolderVisible, setIsCreateFolderVisible] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const folderName = searchParams.get("fn") || "Content";
  const { api } = useApi();

  const btns = [
    {
      name: "Upload files",
      ico: MdFileUpload,
      color: "#4AA927",
      action: () => {
        setIsUploadFileVisible(true);
      },
    },
    {
      name: "Create Folder",
      ico: MdCreateNewFolder,
      color: "#4AA927",
      action: () => {
        setIsCreateFolderVisible(true);
      },
    },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      setFiles({ ...files, loading: true });
      setFolders({ ...folders, loading: true });
      try {
        const res = await api(
          `/folder/folder-content/${folderId}?page=${page || 1}`,
          "get",
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
        <UploadFile
          isOpen={isUploadFileVisible}
          onClose={() => setIsUploadFileVisible(false)}
        />
        <CreateFolder
          isOpen={isCreateFolderVisible}
          onClose={() => setIsCreateFolderVisible(false)}
        />
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

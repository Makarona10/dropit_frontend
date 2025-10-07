"use client";

import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import UploadFile from "@/components/create_and_add/UploadFile";
import { _File, _Folder } from "@/app/types";
import { useEffect, useState } from "react";
import { MdWatchLater, MdFileUpload, MdCreateNewFolder } from "react-icons/md";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ListFiles from "@/components/files_browsing/ListFiles";
import Folder from "@/components/files_browsing/Folder";
import CreateFolder from "@/components/files_browsing/CreateFolder";
import { useApi } from "@/lib/useApi";

type _StateType<T> = {
  loading: boolean;
  error: boolean;
  data: Array<T>;
};

const RecentsPage = () => {
  const [files, setFiles] = useState<_StateType<_File>>({
    loading: true,
    error: false,
    data: [],
  });
  const [folders, setFolders] = useState<_StateType<_Folder>>({
    loading: true,
    error: false,
    data: [],
  });
  const [isUploadFileVisible, setIsUploadFileVisible] =
    useState<boolean>(false);
  const [isCreateFolderVisible, setIsCreateFolderVisible] =
    useState<boolean>(false);
  const { api } = useApi();

  const btns = [
    {
      name: "Upload files",
      ico: MdFileUpload,
      color: "#4AA927",
      action: () => setIsUploadFileVisible(true),
    },
    {
      name: "Create folder",
      ico: MdCreateNewFolder,
      color: "#4AA927",
      action: () => {
        setIsCreateFolderVisible(true);
      },
    },
  ];
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await api(`file/recently-uploaded`, "get");
        setFiles({ ...files, loading: false, data: res.data.data.files });
        setFolders({ ...folders, loading: false, data: res.data.data.folders });
      } catch (error: any) {
        setFiles({ error: true, loading: false, data: [] });
        setFolders({ error: true, loading: false, data: [] });
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="flex w-full">
      {/* upload file section */}
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
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <div className="flex items-center gap-4 sm:pt-10 sm:pl-10 pt-5 pl-5">
          <h1 className="sm:text-2xl text-lg font-bold">Recents</h1>
          <MdWatchLater className="sm:h-[21px] sm:w-[21px] h-[16px] w-[16px]" />
        </div>
        <hr className="sm:mt-5 mt-2 w-8/12 opacity-40 sm:ml-8 ml-5" />
        <div className="flex items-center gap-4 sm:pt-10 pt-6 sm:pl-10 pl-5">
          <h1 className="md:text-2xl text-lg font-bold">Files</h1>
        </div>

        <div className="flex gap-3 sm:p-8 p-5 flex-wrap">
          {!files.error && !files.loading && files.data.length > 0 && (
            <ListFiles files={files.data} />
          )}

          {files.loading && (
            <div className="flex w-full h-full">
              <LoadingSpinner />
            </div>
          )}

          {files.error && !files.loading && (
            <div className="flex p-3 text-2xl text-neutral-200 font-semibold underline">
              <p>
                Error happened while loading files, try refreshing the page!
              </p>
            </div>
          )}

          {!files.error && !files.loading && files.data.length === 0 && (
            <div className="w-full text-center p-3 text-2xl text-neutral-200 font-semibold">
              <p>No files uploaded yet.</p>
            </div>
          )}

          {/* <FileComponent */}
          {/*   id={1} */}
          {/*   image={ */}
          {/*     "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg" */}
          {/*   } */}
          {/*   fName={"Ahmed Sayed Mizo"} */}
          {/*   favourite={true} */}
          {/*   type="video" */}
          {/*   resolution="1920 * 1080" */}
          {/*   uploaded="13/11/2023" */}
          {/*   size="990" */}
          {/*   owner="Bashs rostom" */}
          {/*   extenstion=".mp4" */}
          {/*   duration="22:31" */}
          {/* /> */}
        </div>
        <hr className="relative mt-5 w-11/12 opacity-40 sm:left-8 left-3" />
        <div className="flex items-center gap-4 sm:pt-10 pt-5 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Folders</h1>
        </div>
        <div className="flex gap-3 p-8 flex-wrap md:z-10">
          {!folders.error &&
            !folders.loading &&
            folders.data.length > 0 &&
            folders.data.map((f: _Folder) => {
              const createdAt = new Date(f.createdAt);
              return (
                <div key={f.id}>
                  <Folder
                    id={f.id}
                    name={f.name}
                    created_at={createdAt.toLocaleDateString()}
                  />
                </div>
              );
            })}

          {folders.loading && (
            <div className="flex w-full h-full">
              <LoadingSpinner />
            </div>
          )}

          {folders.error && !folders.loading && (
            <div className="flex p-3 text-2xl text-neutral-200 font-semibold underline">
              <p>
                Error happened while loading your folders, try refreshing the
                page
              </p>
            </div>
          )}

          {!folders.error && !folders.loading && folders.data.length === 0 && (
            <div className="w-full text-center text-2xl text-neutral-200 font-semibold">
              <p>No folders yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentsPage;

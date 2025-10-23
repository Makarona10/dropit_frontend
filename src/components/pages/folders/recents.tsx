"use client";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { FaFolder } from "react-icons/fa";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import CreateFolder from "@/components/files_browsing/CreateFolder";
import ListFolders from "@/components/files_browsing/ListFolders";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { MdCreateNewFolder } from "react-icons/md";
import { useApi } from "@/lib/useApi";
import PagesContainer from "@/components/common/Container";
import Separator from "@/components/common/Separator";
import LoadingOverlay from "@/components/common/LoadingOverlay";

const RecentFolders = () => {
  const [folders, setFolders] = useState({
    loading: true,
    error: false,
    folders: [],
    pages: 0,
  });
  const [isCreateFolderVisible, setIsCreateFolderVisible] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
  const { api } = useApi();

  const btns = [
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
    setFolders({
      ...folders,
      loading: true,
    });
    const fetchFolders = async () => {
      try {
        const res = await api(`/folder?page=${page || 1}`, "get");
        if (res.data.statusCode === 200) {
          setFolders({
            error: false,
            folders: res.data.data.folders,
            loading: false,
            pages: res.data.data.pages,
          });
        }
      } catch (error) {
        setFolders({ ...folders, error: true, folders: [], loading: false });
      }
    };

    fetchFolders();
  }, [page]);

  return (
    <div className="flex w-full">
      <SideBar title="Folders" />
      <CreateFolder
        isOpen={isCreateFolderVisible}
        onClose={() => setIsCreateFolderVisible(false)}
      />
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <PagesContainer>
          <div className="flex items-center gap-4">
            <h1 className="pagesHeader">Folders</h1>
            <FaFolder className=" sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
          </div>
          <Separator />
          <div className="w-full flex justify-center ">
            {folders.loading && <LoadingSpinner />}
            {!folders.loading && folders.error && (
              <p className="text-2xl underline">
                Error happened, try refreshing the page
              </p>
            )}
            {!folders.loading &&
              !folders.error &&
              folders.folders.length < 1 && (
                <p className="noFilesHeader mt-5">No folders created yet</p>
              )}
            {!folders.loading &&
              !folders.error &&
              folders.folders.length > 0 && (
                <ListFolders folders={folders.folders} />
              )}
          </div>
        </PagesContainer>
      </div>
    </div>
  );
};

export default RecentFolders;

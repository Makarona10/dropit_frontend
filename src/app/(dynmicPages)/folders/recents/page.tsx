"use client";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { FaFolder } from "react-icons/fa";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import CreateFolder from "@/components/files_browsing/CreateFolder";
import ListFolders from "@/components/files_browsing/ListFolders";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { MdCreateNewFolder } from "react-icons/md";

const btns = [
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

const RecentFoldersPage = () => {
  const [folders, setFolders] = useState({
    loading: true,
    error: false,
    folders: [],
    pages: 0,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/user/login");
    }

    const fetchFolders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/folder?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
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
      <CreateFolder />
      <div className="z-20">{/* <DeleteTag tag_id={1} /> */}</div>
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <div className="flex items-center gap-4 pl-8 pt-10">
          <h1 className="sm:text-2xl text-lg font-bold">Folders</h1>
          <FaFolder className=" sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
        </div>
        <div className="w-full flex justify-center pl-8 mt-5">
          {folders.loading && <LoadingSpinner />}
          {!folders.loading && folders.error && (
            <p className="text-2xl underline">
              Error happened, try refreshing the page
            </p>
          )}
          {!folders.loading && !folders.error && folders.folders.length < 1 && (
            <p className="text-2xl mt-5">No folders created yet</p>
          )}
          {!folders.loading && !folders.error && folders.folders.length > 0 && (
            <ListFolders folders={folders.folders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentFoldersPage;

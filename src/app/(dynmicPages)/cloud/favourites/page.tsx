"use client";
import Header from "@/app/components/common/Header";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { LuAudioLines, LuFileVideo, LuFilterX, LuImages } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

const filter_array: FT[] = [
  {
    name: "Images",
    ico: LuImages,
  },
  {
    name: "Videos",
    ico: LuFileVideo,
  },
  {
    name: "Audios",
    ico: LuAudioLines,
  },
  {
    name: "Others",
    ico: IoDocumentText,
  },
  {
    name: "All",
    ico: LuFilterX,
  },
];

const order: FT[] = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

const FavouritesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getFiles = async () => {
      if (!token) router.push("user/login");

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-favourite?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFiles({
          error: false,
          loading: false,
          files: res.data.data.files,
          pages: res.data.data.pages,
        });
      } catch (error) {
        setFiles({ error: true, loading: false, files: [], pages: 0 });
      }
    };

    getFiles();
  }, []);

  return (
    <div className="flex">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-8 flex items-center h-14 bg-neutral-800 border-t-[1px] border-t-neutral-700/70">
          <OrdAndFiltHead order={order} filter={filter_array} />
        </div>
        <div className="flex items-center gap-4 pt-10 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Favourites</h1>
          <FaStar style={{ width: "23px", height: "23px", color: "#A81C1C" }} />
          <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
            <PaginationButtons total={files.pages} />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full">
          {!files.loading && !files.error && files.files.length > 0 && (
            <ListFiles files={files.files} />
          )}

          {!files.error && !files.loading && files.files.length < 1 && (
            <div className="text-2xl w-full text-center">
              No favourite files.
            </div>
          )}

          {files.error && !files.loading && (
            <div className="text-2xl underline">
              Error happened, Try refreshing the page
            </div>
          )}

          {files.loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;

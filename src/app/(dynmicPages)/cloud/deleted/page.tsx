"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import { LuAudioLines, LuFileVideo, LuFilterX, LuImages } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";

const filter_array: FT[] = [
  {
    name: "Image",
    ico: LuImages,
  },
  {
    name: "Video",
    ico: LuFileVideo,
  },
  {
    name: "Audio",
    ico: LuAudioLines,
  },
  {
    name: "Other",
    ico: IoDocumentText,
  },
  {
    name: "All",
    ico: LuFilterX,
  },
];

const order: FT[] = [
  { name: "Asc", ico: BiUpArrowAlt },
  { name: "Desc", ico: BiDownArrowAlt },
];

const Deleted = () => {
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const fetchDeletedFiles = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) router.push("user/login");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/bin/deleted-files?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setFiles({
          loading: false,
          error: false,
          files: res.data.data.files,
          pages: res.data.data.pages,
        });
      } catch (error) {
        setFiles({
          loading: false,
          error: true,
          files: [],
          pages: 0,
        });
      }
    };

    fetchDeletedFiles();
  }, []);

  return (
    <div className="flex h-full w-full ">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead filter={filter_array} order={order} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="flex gap-3 items-center sm:text-2xl text-lg font-bold">
            <p>Your personal trash bin</p>
            <FontAwesomeIcon
              width={18}
              height={18}
              icon={faTrash}
              className="text-primary-500"
            />
            <div className="w-full flex flex-row-reverse">
              <PaginationButtons total={files.pages} />
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            {!files.loading && !files.error && files.files.length > 0 && (
              <ListFiles files={files.files} />
            )}

            {!files.error && !files.loading && files.files.length < 1 && (
              <div className="text-2xl font-bold w-full text-center">
                Your bin is empty.
              </div>
            )}

            {files.error && !files.loading && (
              <div className="w-full text-2xl text-center underline">
                Error happened, Try refreshing the page
              </div>
            )}

            {files.loading && <LoadingSpinner />}
          </div>
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default Deleted;

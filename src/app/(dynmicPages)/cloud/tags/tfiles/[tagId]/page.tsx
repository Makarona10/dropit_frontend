"use client";

import Header from "@/app/components/common/Header";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import SideBar from "@/app/components/common/SideBar";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import AddFileToTag from "@/app/components/files_browsing/tags_components/AddFileToTag";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTag, FaTags } from "react-icons/fa";

interface File {
  id: number;
  name: string;
  userId: string;
  sizeInKb: number;
  type: "image" | "video" | "audio" | "other";
  extension: string;
  createdAt: string;
  isFavourite: boolean;
  duration?: string;
  resolution?: string;
}

const buttons = [
  {
    name: "Tag a file",
    ico: FaTag,
    color: "#4dcb4d",
    action: () => {
      const element = document.getElementById("add_file_to_tag");
      if (element) {
        (element.style.visibility = "visible"), (element.style.opacity = "100");
      }
    },
  },
];

const TagFiles = () => {
  const { tagId, page } = useParams();
  const [files, setFiles] = useState({
    error: false,
    data: [],
    loading: true,
    pages: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/user/login");
    }

    const fetchFiles = async () => {
      setFiles({ ...files, loading: true });
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/tag/tag-files/${tagId}?page=${page || 1}&orderBy=createdAt&arrange=desc`,
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
            pages: res.data.data.pagesCount,
          });
        }
      } catch (error) {
        setFiles({ ...files, error: true, data: [], loading: false });
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="flex w-full">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <AddFileToTag />
        <div className="w-full flex items-center h-14 px-8 bg-neutral-800 border-t-[1px] border-neutral-100/10">
          {buttons.map((b) => {
            const Icon = b.ico;
            return (
              <div
                className="flex items-center p-2 px-5 gap-2 rounded-full text-xs md:text-sm opacity-80
                                    select-none duration-150 cursor-pointer hover:bg-neutral-700 hover:opacity-100"
                key={b.name}
                onClick={() => {
                  b.action();
                }}
              >
                <Icon
                  style={{ color: b.color }}
                  className="w-4 h-4 font-semibold"
                />
                <p className="text-sm font-semibold">{b.name}</p>
              </div>
            );
          })}
        </div>
        <div className="flex w-full items-center gap-10 pt-10 pl-10">
          <div className="flex w-full items-center gap-4 flex-nowrap">
            <h1 className="sm:text-2xl text-lg font-bold">Tag files</h1>
            <FaTags className="text-primary-500 sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
          </div>
          <div className="flex w-full sm:flex-row-reverse sm:pr-16">
            <PaginationButtons total={files.pages} />
          </div>
        </div>
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
              No files found for this tag
            </div>
          )}

          {!files.loading && !files.error && files.data.length > 0 && (
            <ListFiles files={files.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TagFiles;

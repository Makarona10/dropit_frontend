"use client";

import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SideBar from "@/components/common/SideBar";
import ListFiles from "@/components/files_browsing/ListFiles";
import AddFileToTag from "@/components/files_browsing/tags_components/AddFileToTag";
import RemoveFileFromTag from "@/components/files_browsing/tags_components/RemoveFromTag";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTag, FaTags } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";

const TagFiles = () => {
  const { tagId, page } = useParams();
  const [isAddToTagVisible, setIsAddToTagVisible] = useState(false);
  const [isRemoveFromTagVisible, setIsRemoveFromTagVisible] = useState(false);
  const [files, setFiles] = useState({
    error: false,
    data: [],
    loading: true,
    pages: 0,
  });
  const { api } = useApi();
  const buttons = [
    {
      name: "Tag a file",
      ico: FaTag,
      color: "#4dcb4d",
      style: "sm:h-4 sm:w-4 h-3 w-3",
      action: () => {
        setIsAddToTagVisible(true);
      },
    },
    {
      name: "Remove tagged file",
      ico: IoIosRemoveCircle,
      color: "#ff3333",
      style: "text-lg",
      action: () => {
        setIsRemoveFromTagVisible(true);
      },
    },
  ];

  useEffect(() => {
    const fetchFiles = async () => {
      setFiles({ ...files, loading: true });
      try {
        const res = await api(
          `/tag/tag-files/${tagId}?page=${page || 1}&orderBy=createdAt&arrange=desc`,
          "get",
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
      <AddFileToTag
        isOpen={isAddToTagVisible}
        onClose={() => setIsAddToTagVisible(false)}
      />
      <RemoveFileFromTag
        isOpen={isRemoveFromTagVisible}
        onClose={() => setIsRemoveFromTagVisible(false)}
      />
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full flex items-center h-16 px-8 bg-neutral-800 border-t-[1px] border-neutral-100/10">
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
                <Icon style={{ color: b.color }} size={16} />
                <p className="text-xs sm:text-sm font-semibold">{b.name}</p>
              </div>
            );
          })}
        </div>
        <div className="flex w-full items-center gap-10 pt-10 pl-10">
          <div className="flex w-full items-center gap-4 flex-nowrap">
            <h1 className="pagesHeader">Tag files</h1>
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

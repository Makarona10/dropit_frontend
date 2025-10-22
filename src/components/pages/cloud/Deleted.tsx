"use client";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListFiles from "@/components/files_browsing/ListFiles";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import { MdDeleteForever } from "react-icons/md";
import CleanBin from "@/components/files_browsing/binOptions/CleanBin";
import { useApi } from "@/lib/useApi";
import PagesContainer from "@/components/common/Container";
import Separator from "@/components/common/Separator";

const Deleted = () => {
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [isCleanBinOpen, setIsCleanBinOpen] = useState(false);
  const { api } = useApi();

  const btns = [
    {
      name: "Clean bin",
      ico: MdDeleteForever,
      color: "#D92A44",
      action: () => setIsCleanBinOpen(true),
    },
  ];

  useEffect(() => {
    const fetchDeletedFiles = async () => {
      try {
        const res = await api(`/bin/deleted-files?page=${page}`, "get");
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
  }, [page]);

  return (
    <div className="flex h-full w-full ">
      <div className="z-20">
        <CleanBin
          isOpen={isCleanBinOpen}
          onClose={() => setIsCleanBinOpen(false)}
        />
      </div>
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <PagesContainer>
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
          <Separator />
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
        </PagesContainer>
      </div>
    </div>
  );
};

export default Deleted;

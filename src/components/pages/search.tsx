"use client";

import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SideBar from "@/components/common/SideBar";
import UploadFile from "@/components/create_and_add/UploadFile";
import FileComponent from "@/components/files_browsing/FileComponent";
import OrderBy from "@/components/filteration/OrderBy";
import TypeFilter from "@/components/filteration/TypeFilter";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchResult = () => {
  const search_params = useSearchParams();
  const search_string = search_params.get("ss");
  const page = search_params.get("page") || 1;
  const file_type = search_params.get("type");
  const order = search_params.get("order") || "desc";
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false);
  const [sResult, setSResult] = useState({
    loading: true,
    error: "",
    files: [],
    pages: 0,
  });
  const { api } = useApi();

  const fetchSearchResult = async (name: string) => {
    if (!name) return;
    setSResult({ ...sResult, loading: true });
    try {
      const res = await api(
        `/search/files/${name}/?page=${+page || 1}` +
          `&order=${order}` +
          `${file_type ? `&type=${file_type}` : ""}`,
        "get",
      );
      setSResult({
        error: "",
        files: res.data.data.files,
        loading: false,
        pages: res.data.data.pages,
      });
    } catch (error) {
      setSResult({
        error: "Error happened while searching.",
        files: [],
        loading: false,
        pages: 0,
      });
    }
  };

  useEffect(() => {
    fetchSearchResult(search_string || "");
  }, [search_string, search_params]);

  return (
    <div className="flex w-full">
      <UploadFile
        isOpen={isUploadFileOpen}
        onClose={() => setIsUploadFileOpen(false)}
      />
      <SideBar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full flex items-center sm:pl-10 pt-5 pl-5">
          <div className="flex items-center gap-4 w-full">
            <div className="pagesHeader">
              Search result for{" "}
              <span className="text-primary-500">{search_string}</span>
            </div>
            <BiSearch className="text-lg size-8" />
          </div>
          <div className="w-full flex items-center flex-row-reverse pr-5 sm:pr-32">
            <PaginationButtons total={sResult.pages} />
          </div>
        </div>

        <hr className="sm:mt-5 mt-2 w-8/12 opacity-40 sm:ml-8 ml-5" />
        <div className="sm:pl-10 pt-5 p-5 flex sm:gap-4 gap-2">
          <TypeFilter />
          <OrderBy />
        </div>
        {/* <div className="flex items-center gap-4 sm:pt-10 pt-6 sm:pl-10 pl-5"> */}
        {/*   <h1 className="md:text-2xl text-lg font-bold">Files</h1> */}
        {/* </div> */}
        <div className="flex gap-3 sm:p-8 p-5 flex-wrap">
          {sResult.loading && (
            <div className="w-full m-auto">
              <LoadingSpinner />
            </div>
          )}
          {sResult.error && !sResult.loading && (
            <div>Error happened, try again in a minute</div>
          )}
          {!sResult.loading &&
            sResult.files.length > 0 &&
            sResult.files.map((f: any) => {
              return (
                <FileComponent
                  owner=""
                  key={f.id}
                  id={f.id}
                  fName={f.name}
                  userId={f.userId}
                  fps={f?.fps}
                  size={f.sizeInkb}
                  type={f.type}
                  uploaded={f.createdAt}
                  favourite={f.isFavourite}
                  extenstion={f.extension}
                  thumbnail={f.thumbnail}
                  deleted={f.deleted}
                  duration={f.duration}
                  resolution={f.resolution}
                />
              );
            })}
          {!sResult.loading && sResult.files.length === 0 && !sResult.error && (
            <div className="noFilesHeader m-auto">No results found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

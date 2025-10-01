"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import ListFiles from "@/components/files_browsing/ListFiles";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import TypeFilter from "@/components/filteration/TypeFilter";
import Order from "@/components/filteration/OrderBy";
import SortBy from "@/components/filteration/SortBy";
import { useApi } from "@/lib/useApi";

const FavouritesPage = () => {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });
  const page = searchParams.get("page") || 1;
  const fileType = searchParams.get("type");
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const { api } = useApi();

  useEffect(() => {
    const getFiles = async () => {
      try {
        const res = await api(
          `/favourite/get-favourite?page=${page}` +
            `${fileType ? `&type=${fileType}` : ""}` +
            `${sortBy ? `&sortBy=${sortBy}` : ""}` +
            `&order=${order || "desc"}`,
          "get",
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
  }, [searchParams]);

  return (
    <div className="flex">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center gap-4 pt-8 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Favourites</h1>
          <FaStar style={{ width: "23px", height: "23px", color: "#A81C1C" }} />
          <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
            <PaginationButtons total={files.pages} />
          </div>
        </div>
        <hr className="opacity-30 mt-5 ml-5 sm:w-7/12 w-10/12" />
        <div className="flex pt-5 pl-10 gap-4">
          <TypeFilter />
          <SortBy />
          <Order />
        </div>
        <div className="flex flex-wrap gap-5 p-8 sm:mt-6 w-full">
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

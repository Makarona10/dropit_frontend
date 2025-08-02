"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import TypeFilter from "@/app/components/filteration/TypeFilter";
import Order from "@/app/components/filteration/OrderBy";
import SortBy from "@/app/components/filteration/SortBy";

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
  const fileType = searchParams.get("type");
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getFiles = async () => {
      if (!token) router.push("user/login");

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/get-favourite?page=${page}` +
            `${fileType ? `&type=${fileType}` : ""}` +
            `${sortBy ? `&sortBy=${sortBy}` : ""}` +
            `&order=${order || "desc"}`,

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

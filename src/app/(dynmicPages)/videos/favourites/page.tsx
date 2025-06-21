"use client";
import Header from "@/app/components/common/Header";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { video_filter } from "../../utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";

const order: FT[] = [
  { name: "Asc", ico: BiUpArrowAlt },
  { name: "Desc", ico: BiDownArrowAlt },
];

const FavouriteVideos = () => {
  const [videos, setVideos] = useState({
    loading: true,
    error: false,
    videos: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const vidsOrder = searchParams.get("o") || "desc";
  const extension = searchParams.get("f");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/user/login");

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-favourite-videos?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              order: vidsOrder.toLowerCase(),
              extension,
            },
          },
        );
        if (res.data.statusCode === 200) {
          setVideos({
            error: false,
            videos: res.data.data.videos,
            loading: false,
            pages: res.data.data.pages,
          });
        }
      } catch (error) {
        setVideos({
          ...videos,
          error: true,
          videos: [],
          loading: false,
          pages: 0,
        });
      }
    };

    fetchVideos();
  }, [page, vidsOrder, extension]);

  return (
    <div className="flex">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-8 flex items-center h-14 bg-neutral-800 border-t-[1px] border-t-neutral-700/70">
          <OrdAndFiltHead order={order} filter={video_filter} />
        </div>
        <div className="flex items-center gap-3 pt-10 pl-10">
          <div className="sm:w-[300px] flex items-center gap-3">
            <h1 className="sm:text-2xl text-lg font-bold">Favourite Videos</h1>
            <FaStar
              style={{ width: "23px", height: "23px", color: "#A81C1C" }}
            />
          </div>
          <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
            <PaginationButtons total={videos.pages} />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full">
          {videos.loading && <LoadingSpinner />}
          {!videos.loading && videos.error && (
            <p className="w-full text-center text-2xl underline">
              Error happened, try refreshing the page
            </p>
          )}

          {!videos.loading && !videos.error && videos.videos.length < 1 && (
            <p className="w-full text-center text-2xl">No videos found</p>
          )}

          {!videos.loading && !videos.error && videos.videos.length > 0 && (
            <ListFiles files={videos.videos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteVideos;

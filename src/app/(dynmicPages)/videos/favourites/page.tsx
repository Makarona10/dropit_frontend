"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import VideoDuration from "@/app/components/filteration/VideoDuration";
import VideoExtension from "@/app/components/filteration/VidExtension";
import SortBy from "@/app/components/filteration/SortBy";
import Order from "@/app/components/filteration/OrderBy";

const FavouriteVideos = () => {
  const [videos, setVideos] = useState({
    loading: true,
    error: false,
    videos: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const vidsOrder = searchParams.get("order") || "desc";
  const extension = searchParams.get("ext");
  const size = searchParams.get("sizeInKb");
  const duration = searchParams.get("duration");
  const sortBy = searchParams.get("sort_by");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/user/login");

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/get-favourite-videos?page=${page || 1}` +
            `${vidsOrder ? `&order=${vidsOrder}` : ""}` +
            `${extension ? `&extension=${extension}` : ""}` +
            `${size ? `&size=${size}` : ""}` +
            `${sortBy ? `&sortBy=${sortBy}` : ""}` +
            `${duration ? `&duration=${duration}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [searchParams]);

  return (
    <div className="flex">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col gap-8 p-8">
          <div className="flex items-center gap-3">
            <div className="sm:w-[300px] flex items-center gap-3">
              <h1 className="sm:text-2xl text-lg font-bold">
                Favourite videos
              </h1>
              <FaStar
                style={{ width: "23px", height: "23px", color: "#A81C1C" }}
              />
            </div>
            <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
              <PaginationButtons total={videos.pages} />
            </div>
          </div>
          <hr className="opacity-30 sm:w-7/12 w-10/12" />
          <div className="flex sm:gap-4 gap-2 flex-wrap">
            <VideoDuration />
            <VideoExtension />
            <SortBy />
            <Order />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 pl-8 w-full">
          {videos.loading && <LoadingSpinner />}
          {!videos.loading && videos.error && (
            <p className="w-full text-center text-2xl underline">
              Error happened, try refreshing the page
            </p>
          )}

          {!videos.loading && !videos.error && videos.videos.length < 1 && (
            <p className="w-full text-center text-2xl font-semibold">
              No videos found
            </p>
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

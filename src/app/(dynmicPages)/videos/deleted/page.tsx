"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import Order from "@/app/components/filteration/OrderBy";
import SortBy from "@/app/components/filteration/SortBy";

const DeletedVideos = () => {
  const [videos, setVideos] = useState({
    loading: true,
    error: false,
    videos: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const vidsOrder = searchParams.get("order") || "desc";
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/user/login");

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/bin/deleted-files?` +
            `page=${page || 1}&type=video&order=${vidsOrder.toLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.data.statusCode === 200) {
          setVideos({
            error: false,
            videos: res.data.data.files,
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
    <div className="flex h-full w-full ">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex gap-3 items-center">
            <div className="sm:w-[280px] gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p>Your videos bin</p>
              <FontAwesomeIcon
                width={18}
                height={18}
                icon={faTrash}
                className="text-primary-500"
              />
            </div>
            <div className="w-full flex items-center flex-row-reverse">
              <PaginationButtons total={videos.pages} />
            </div>
          </div>
          <hr className="opacity-30 sm:w-7/12 w-10/12" />
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <Order />
            <p className="font-semibold sm:text-sm text-xs text-neutral-400">
              ⓘ order due to deletion date.
            </p>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            {videos.loading && <LoadingSpinner />}
            {!videos.loading && videos.error && (
              <p className="w-full text-center text-2xl underline font-semibold">
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
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default DeletedVideos;

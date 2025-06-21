"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { video_filter } from "../../utils";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";

const order: FT[] = [
  { name: "Asc", ico: BiUpArrowAlt },
  { name: "Desc", ico: BiDownArrowAlt },
];

const DeletedVideos = () => {
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
          `${process.env.NEXT_PUBLIC_SERVER_URI}/bin/deleted-files?` +
            `page=${page || 1}&type=video&order=${vidsOrder.toLowerCase()}` +
            `&extension=${extension === "any" ? extension : ""}`,
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
  }, [page, vidsOrder, extension]);

  return (
    <div className="flex h-full w-full ">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead filter={video_filter} order={order} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex gap-3 items-center">
            <div className="sm:w-[280px] gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p>Your Videos Bin</p>
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
          <div className="w-full flex flex-wrap gap-5">
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
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default DeletedVideos;

"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ListFiles from "@/components/files_browsing/ListFiles";
import UploadVideo from "@/components/create_and_add/UploadVideo";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import { RiVideoUploadLine } from "react-icons/ri";
import VideoDuration from "@/components/filteration/VideoDuration";
import SortBy from "@/components/filteration/SortBy";
import Order from "@/components/filteration/OrderBy";
import VideoExtension from "@/components/filteration/VidExtension";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";

const Videos = () => {
  const [videos, setVideos] = useState({
    loading: true,
    error: false,
    videos: [],
    pages: 0,
  });
  const [isUploadVideoVisible, setIsUploadVideoVisible] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const vidsOrder = searchParams.get("order") || "desc";
  const extension = searchParams.get("ext");
  const sortBy = searchParams.get("sort_by");
  const duration = searchParams.get("duration");
  const { api } = useApi();
  const btns = [
    {
      name: "Upload video",
      ico: RiVideoUploadLine,
      color: "#4AA927",
      action: () => {
        setIsUploadVideoVisible(true);
      },
    },
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api(
          `/file/get-videos?page=${page || 1}` +
            `${sortBy ? `&sortBy=${sortBy}` : ""}` +
            `${duration ? `&duration=${duration}` : ""}` +
            `${extension ? `&extension=${extension}` : ""}` +
            `${vidsOrder ? `&order=${vidsOrder}` : ""}`,
          "get",
          {
            data: {
              order: vidsOrder,
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
  }, [searchParams]);

  return (
    <div className="flex h-full w-full ">
      <div className={`z-20`}>
        <UploadVideo
          isOpen={isUploadVideoVisible}
          onClose={() => setIsUploadVideoVisible(false)}
        />
      </div>
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-16 bg-neutral-800 p-4 gap-8">
          <HeadBtnsBar buttons={btns} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="flex gap-3 items-center sm:text-2xl text-lg font-bold">
            <p className="text-nowrap">Uploaded Videos</p>
            <FontAwesomeIcon
              width={30}
              height={30}
              icon={faVideo}
              className="text-white"
            />
            <div className="flex w-full flex-row-reverse sm:px-8 px-4">
              <PaginationButtons total={videos.pages} />
            </div>
          </div>
          <hr className="sm:w-7/12 w-10/12 opacity-30" />
          <div className="flex flex-wrap sm:gap-4 gap-2">
            <VideoDuration />
            <VideoExtension />
            <SortBy />
            <Order />
          </div>
          <div className="w-full flex flex-wrap gap-5">
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
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default Videos;

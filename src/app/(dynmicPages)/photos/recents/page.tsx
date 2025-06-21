"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdAndFiltHead from "@/app/components/common/Ord&FiltHead";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";

const order = [
  { name: "Asc", ico: BiUpArrowAlt },
  { name: "Desc", ico: BiDownArrowAlt },
];

export const photo_filter = [
  {
    name: "PNG",
  },
  {
    name: "JPG/JPEG",
  },
  {
    name: "GIF",
  },
  {
    name: "ICO",
  },
  {
    name: "ANY",
  },
];

const Photos = () => {
  const [images, setImages] = useState({
    loading: true,
    error: false,
    images: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const imgsOrder = searchParams.get("o") || "desc";
  const extension = searchParams.get("f");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/user/login");

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-images?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              order: imgsOrder.toLowerCase(),
              extension,
            },
          },
        );
        if (res.data.statusCode === 200) {
          setImages({
            error: false,
            images: res.data.data.images,
            loading: false,
            pages: res.data.data.pages,
          });
        }
      } catch (error) {
        setImages({
          ...images,
          error: true,
          images: [],
          loading: false,
          pages: 0,
        });
      }
    };

    fetchVideos();
  }, [page, imgsOrder, extension]);

  return (
    <div className="flex h-full w-full ">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead order={order} filter={photo_filter} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex items-center ">
            <div className="w-80 gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p className="">Uploaded Photos</p>
              <FontAwesomeIcon
                width={30}
                height={30}
                icon={faImages}
                className="text-white"
              />
            </div>
            <div className="w-full flex flex-row-reverse">
              <PaginationButtons total={images.pages} />
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            {images.loading && <LoadingSpinner />}
            {!images.loading && images.error && (
              <p className="w-full text-center text-2xl underline">
                Error happened, try refreshing the page
              </p>
            )}

            {!images.loading && !images.error && images.images.length < 1 && (
              <p className="w-full text-center text-2xl">No videos found</p>
            )}

            {!images.loading && !images.error && images.images.length > 0 && (
              <ListFiles files={images.images} />
            )}
          </div>
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default Photos;

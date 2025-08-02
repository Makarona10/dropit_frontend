"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";
import HeadBtnsBar from "@/app/components/common/HeadBtnsBar";
import { LuImagePlus } from "react-icons/lu";
import UploadImage from "@/app/components/create_and_add/UploadImage";
import Order from "@/app/components/filteration/OrderBy";
import SortBy from "@/app/components/filteration/SortBy";
import ImageExtension from "@/app/components/filteration/ImgExtension";

const btns = [
  {
    name: "Upload image",
    ico: LuImagePlus,
    color: "#4AA927",
    action: () => {
      const element = document.getElementById("upload_image_div");
      if (element) {
        element.style.visibility = "visible";
        element.style.opacity = "100";
      }
    },
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
  const imgsOrder = searchParams.get("order") || "desc";
  const extension = searchParams.get("ext");
  const sortBy = searchParams.get("sort_by");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/user/login");

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-images?page=${page || 1}` +
            `&sortBy=${sortBy || "createdAt"}` +
            `&order=${imgsOrder || "desc"}` +
            `${extension ? `&extension=${extension}` : ""} `,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [searchParams]);

  return (
    <div className="flex h-full w-full ">
      <div className={`z-20`}>
        <UploadImage />
      </div>
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-16 bg-neutral-800 px-5 gap-8">
          <HeadBtnsBar buttons={btns} />
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
          <hr className="opacity-30 sm:w-7/12 w-10/12" />
          <div className="flex flex-wrap sm:gap-4 gap-2">
            <SortBy />
            <Order />
            <ImageExtension />
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

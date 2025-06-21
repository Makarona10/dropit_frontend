"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { photo_filter } from "../recents/page";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";

const order: FT[] = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

const DeletedPhotos = () => {
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

    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/bin/deleted-files?page=${page || 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              order: imgsOrder.toLowerCase(),
              extension,
              type: "image",
            },
          },
        );
        if (res.data.statusCode === 200) {
          setImages({
            error: false,
            images: res.data.data.files,
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

    fetchImages();
  }, [page, imgsOrder, extension]);

  return (
    <div className="flex h-full w-full ">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead filter={photo_filter} order={order} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex gap-3 items-center">
            <div className="sm:w-[280px] gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p>Your Photos Bin</p>
              <FontAwesomeIcon
                width={18}
                height={18}
                icon={faTrash}
                className="text-primary-500"
              />
            </div>
            <div className="w-full flex items-center flex-row-reverse">
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
              <p className="w-full text-center text-2xl">No images found</p>
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

export default DeletedPhotos;

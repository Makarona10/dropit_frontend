"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ListFiles from "@/components/files_browsing/ListFiles";
import Order from "@/components/filteration/OrderBy";

const DeletedPhotos = () => {
  const [images, setImages] = useState({
    loading: true,
    error: false,
    images: [],
    pages: 0,
  });
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const imgsOrder = searchParams.get("order") || "desc";
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
  }, [searchParams]);

  return (
    <div className="flex h-full w-full ">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
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
          <hr className="opacity-30 w-10/12 sm:w-7/12" />
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
            <Order />
            <p className="font-semibold sm:text-sm text-xs text-neutral-400">
              ⓘ order due to deletion date.
            </p>
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

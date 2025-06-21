"use client";
import Header from "@/app/components/common/Header";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ListFiles from "@/app/components/files_browsing/ListFiles";

const filter = [
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

const order: FT[] = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

const FavouritesPhotos = () => {
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
          `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/get-images?page=${page || 1}`,
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

    fetchImages();
  }, [page, imgsOrder, extension]);

  return (
    <div className="flex">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-8 flex items-center h-14 bg-neutral-800 border-t-[1px] border-t-neutral-700/70">
          <OrdAndFiltHead order={order} filter={filter} />
        </div>
        <div className="flex items-center gap-4 pt-10 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Favourite Photos</h1>
          <FaStar style={{ width: "23px", height: "23px", color: "#A81C1C" }} />
          <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
            <PaginationButtons total={images.pages} />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full">
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
      </div>
    </div>
  );
};

export default FavouritesPhotos;

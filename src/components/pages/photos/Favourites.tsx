"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ListFiles from "@/components/files_browsing/ListFiles";
import { useApi } from "@/lib/useApi";

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
  const { api } = useApi();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api(
          `/favourite/get-images?page=${page || 1}`,
          "get",
          {
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
        <div className="flex flex-col gap-5 p-10">
          <div className="flex items-center gap-3">
            <h1 className="sm:text-2xl text-lg font-bold text-nowrap">
              Favourite Photos
            </h1>
            <FaStar
              style={{ width: "26px", height: "26px", color: "#A81C1C" }}
            />
            <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
              <PaginationButtons total={images.pages} />
            </div>
          </div>
          <hr className="opacity-30 w-10/12 sm:w-7/12" />
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

"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ListFiles from "@/components/files_browsing/ListFiles";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import { LuImagePlus } from "react-icons/lu";
import UploadImage from "@/components/create_and_add/UploadImage";
import Order from "@/components/filteration/OrderBy";
import SortBy from "@/components/filteration/SortBy";
import ImageExtension from "@/components/filteration/ImgExtension";
import { useApi } from "@/lib/useApi";
import PagesContainer from "@/components/common/Container";
import Separator from "@/components/common/Separator";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";

const Photos = () => {
  const [images, setImages] = useState({
    loading: true,
    error: false,
    images: [],
    pages: 0,
  });
  const [isUplaodImageVisible, setIsUplaodImageVisible] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const imgsOrder = searchParams.get("order") || "desc";
  const extension = searchParams.get("ext");
  const sortBy = searchParams.get("sort_by");
  const { api } = useApi();

  const btns = [
    {
      name: "Upload image",
      ico: LuImagePlus,
      color: "#4AA927",
      action: () => {
        setIsUplaodImageVisible(true);
      },
    },
  ];
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api(
          `/file/get-images?page=${page || 1}` +
            `&sortBy=${sortBy || "createdAt"}` +
            `&order=${imgsOrder || "desc"}` +
            `${extension ? `&extension=${extension}` : ""} `,
          "get",
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
        <UploadImage
          isOpen={isUplaodImageVisible}
          onClose={() => setIsUplaodImageVisible(false)}
        />
      </div>
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <PagesContainer>
          <div className="w-full flex items-center">
            <div className="gap-3 flex items-center sm:text-2xl text-lg font-bold">
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
          <Separator />

          <ButtonsContainer>
            <SortBy />
            <Order />
            <ImageExtension />
          </ButtonsContainer>
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
        </PagesContainer>
      </div>
    </div>
  );
};

export default Photos;

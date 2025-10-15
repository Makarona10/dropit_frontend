"use client";
import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import SearchSharedItem from "@/components/files_browsing/shared/FileAndFolderSearch";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";
import ImageExtension from "@/components/filteration/ImgExtension";
import ImageSize from "@/components/filteration/ImgSize";
import Order from "@/components/filteration/OrderBy";
import SortBy from "@/components/filteration/SortBy";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharedImagesComponent() {
  const { api } = useApi();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const extension = searchParams.get("ext");
  const size = searchParams.get("sizeInKb");
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const name = searchParams.get("name");
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });

  useEffect(() => {
    const fetchSharedImages = async () => {
      setFiles({ loading: true, error: false, files: [], pages: 0 });
      try {
        const res = await api(
          "file/shared/images",
          "get",
          {},
          {
            params: {
              page,
              extension,
              sizeInKb: size,
              sortBy,
              order,
              name,
            },
          },
        );
        setFiles({
          loading: false,
          error: false,
          files: res.data.data.data,
          pages: res.data.data.pages,
        });
      } catch (error: any) {
        setFiles({
          loading: false,
          error: true,
          files: [],
          pages: 0,
        });
      }
    };

    fetchSharedImages();
  }, [searchParams]);
  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />
        <PagesContainer>
          <div className="w-full flex items-center">
            <h1 className="text-2xl font-bold">Shared Images</h1>
            <div className="flex flex-row-reverse flex-1">
              <PaginationButtons total={files.pages || 0} />
            </div>
          </div>
          <Separator />
          <ButtonsContainer>
            <ImageExtension />
            <Order />
            <SortBy />
            <ImageSize />
          </ButtonsContainer>
          <SearchSharedItem placeholder="Image" />
          {!files.loading && !files.error && (
            <div>
              <ListSharedComponents title="Images" files={files.files} />
            </div>
          )}
          {files.loading && (
            <div className="flex flex-col gap-2 mt-6">
              <LoadingSpinner />
            </div>
          )}
          {files.error && (
            <div className="flex flex-col gap-2 mt-6">
              Error happened while retrieving shared images
            </div>
          )}
        </PagesContainer>
      </div>
    </div>
  );
}

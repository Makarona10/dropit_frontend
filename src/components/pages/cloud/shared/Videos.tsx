"use client";
import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";
import Order from "@/components/filteration/OrderBy";
import SortBy from "@/components/filteration/SortBy";
import VideoDuration from "@/components/filteration/VideoDuration";
import VideoExtension from "@/components/filteration/VidExtension";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharedVideosComponent() {
  const search = useSearchParams();
  const page = search.get("page") || 1;
  const sort_by = search.get("sort_by");
  const order = search.get("order");
  const duration = search.get("duration");
  const extension = search.get("ext");
  const size = search.get("size");
  const { api } = useApi();
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });

  useEffect(() => {
    const fetchSharedVideos = async () => {
      setFiles({ loading: true, error: false, files: [], pages: 0 });
      try {
        const res = await api(
          "file/shared/videos",
          "get",
          {},
          {
            params: {
              page,
              sortBy: sort_by,
              order,
              duration,
              extension,
              size,
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

    fetchSharedVideos();
  }, [search]);

  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />
        <PagesContainer>
          <div className="full flex items-center">
            <h1 className="text-2xl font-bold">Shared Videos</h1>
            <div className="flex flex-row-reverse flex-1">
              <PaginationButtons total={files.pages || 0} />
            </div>
          </div>
          <Separator />
          <ButtonsContainer>
            <VideoDuration />
            <SortBy />
            <Order />
            <VideoExtension />
          </ButtonsContainer>
          {files.loading && <LoadingSpinner />}
          {!files.loading && files.error && (
            <h1>Error happened while retrieving your shared videos</h1>
          )}
          {!files.loading && !files.error && (
            <div className="flex flex-col gap-2">
              <ListSharedComponents files={files.files} title="Videos" />
            </div>
          )}
        </PagesContainer>
      </div>
    </div>
  );
}

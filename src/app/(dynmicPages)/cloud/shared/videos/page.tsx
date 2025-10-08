"use client";
import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";
import SortBy from "@/components/filteration/SortBy";
import VideoDuration from "@/components/filteration/VideoDuration";
import VideoExtension from "@/components/filteration/VidExtension";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharedVideos() {
  const search = useSearchParams();
  const page = search.get("page") || 1;
  const sort_by = search.get("sort_by");
  const order = search.get("order");
  const duration = search.get("duration");
  const extension = search.get("extension");
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
      try {
        const res = await api("file/shared/videos", "get", {
          page,
          sort_by,
          order,
          duration,
          extension,
          size,
        });
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
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />
        <PagesContainer>
          <h1 className="text-2xl font-bold">Shared Videos</h1>
          <Separator />
          <ButtonsContainer>
            <VideoDuration />
            <SortBy />
            <VideoExtension />
          </ButtonsContainer>
          <div className="flex flex-wrap gap-4"></div>
          <div className="flex flex-col gap-2">
            <ListSharedComponents files={files.files} title="Videos" />
          </div>
        </PagesContainer>
      </div>
    </div>
  );
}

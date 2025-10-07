"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import { useApi } from "@/lib/useApi";
import { useEffect, useState } from "react";

export default function SharedVideos() {
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
        const res = await api("file/shared/videos", "get");
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
        <div className="w-full h-full p-10">
          <h1 className="text-2xl font-bold">Shared Videos</h1>
          <div className="flex flex-col gap-2 mt-6">
            <ListSharedComponents files={files.files} title="Videos" />
          </div>
        </div>
      </div>
    </div>
  );
}

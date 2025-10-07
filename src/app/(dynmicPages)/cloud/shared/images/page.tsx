"use client";
import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import { useApi } from "@/lib/useApi";
import { useEffect, useState } from "react";

export default function SharedImages() {
  const { api } = useApi();
  const [files, setFiles] = useState({
    loading: true,
    error: false,
    files: [],
    pages: 0,
  });

  useEffect(() => {
    const fetchSharedImages = async () => {
      try {
        const res = await api("file/shared/images", "get");
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
  }, []);
  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="w-full h-full p-10">
          <h1 className="text-2xl font-bold">Shared Images</h1>
          {!files.loading && !files.error && (
            <div className="mt-6">
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
        </div>
      </div>
    </div>
  );
}

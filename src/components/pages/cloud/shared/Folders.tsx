"use client";

import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import { useApi } from "@/lib/useApi";
import { useEffect, useState } from "react";

export default function SharedFoldersComponent() {
  const { api } = useApi();
  const [folders, setFolders] = useState({
    loading: true,
    error: false,
    folders: [],
    pages: 0,
  });

  useEffect(() => {
    const fetchSharedFolders = async () => {
      try {
        const res = await api("/folder/shared-folders", "get");
        setFolders({
          loading: false,
          error: false,
          folders: res.data.data.folders,
          pages: res.data.data.pages,
        });
      } catch (error: any) {}
    };
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />

        <PagesContainer>
          <h1 className="text-2xl font-bold">Shared Folders</h1>
          <Separator />
          <div className="flex flex-col gap-2 mt-6">
            <ListSharedComponents title="Folders" files={[]} />
          </div>
        </PagesContainer>
      </div>
    </div>
  );
}

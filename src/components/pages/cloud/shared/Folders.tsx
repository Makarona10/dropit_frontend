"use client";

import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";
import Order from "@/components/filteration/OrderBy";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharedFoldersComponent() {
  const { api } = useApi();
  const searchParams = useSearchParams();
  const order = searchParams.get("order");
  const page = searchParams.get("page");
  const [folders, setFolders] = useState({
    loading: true,
    error: false,
    folders: [],
    pages: 0,
  });

  useEffect(() => {
    const fetchSharedFolders = async () => {
      setFolders({ loading: true, error: false, folders: [], pages: 0 });
      try {
        const res = await api(
          "/folder/shared-folders",
          "get",
          {},
          {
            params: {
              page: page || 1,
              order,
            },
          },
        );
        setFolders({
          loading: false,
          error: false,
          folders: res.data.data.data,
          pages: res.data.data.pages,
        });
      } catch (error: any) {
        setFolders({
          loading: false,
          error: true,
          folders: [],
          pages: 0,
        });
      }
    };

    fetchSharedFolders();
  }, []);

  return (
    <div className="flex h-full w-full">
      <SideBar title="Cloud" />
      <div className="w-full h-full flex flex-col">
        <Header />

        <PagesContainer>
          <div className="w-full flex items-center">
            <h1 className="text-2xl font-bold">Shared Folders</h1>
            <div className="flex flex-row-reverse flex-1">
              <PaginationButtons total={folders.pages} />
            </div>
          </div>
          <Separator />
          <ButtonsContainer>
            <Order />
          </ButtonsContainer>
          <div className="flex flex-col gap-2 mt-6">
            <ListSharedComponents title="Folders" files={folders.folders} />
          </div>
        </PagesContainer>
      </div>
    </div>
  );
}

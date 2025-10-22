"use client";
import PagesContainer from "@/components/common/Container";
import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Separator from "@/components/common/Separator";
import SideBar from "@/components/common/SideBar";
import SearchSharedItem from "@/components/files_browsing/shared/FileAndFolderSearch";
import ListSharedComponents from "@/components/files_browsing/shared/ListSharedComponents";
import ButtonsContainer from "@/components/filteration/container/ButtonsContainer";
import Order from "@/components/filteration/OrderBy";
import SortBy from "@/components/filteration/SortBy";
import TypeFilter from "@/components/filteration/TypeFilter";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SharedFilesComponent() {
  const { api } = useApi();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const name = searchParams.get("name");
  const type = searchParams.get("type");
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
          "file/shared/files",
          "get",
          {},
          {
            params: {
              page,
              sortBy,
              order,
              name,
              type,
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
            <h1 className="text-2xl font-bold">Shared Files</h1>
            <div className="flex flex-row-reverse flex-1">
              <PaginationButtons total={files.pages || 0} />
            </div>
          </div>
          <Separator />
          <ButtonsContainer>
            <Order />
            <SortBy />
            <TypeFilter />
          </ButtonsContainer>
          <SearchSharedItem placeholder="File" />
          {!files.loading && !files.error && (
            <div>
              <ListSharedComponents title="Files" files={files.files} />
            </div>
          )}
          {files.loading && (
            <div className="flex flex-col gap-2 mt-6">
              <LoadingSpinner />
            </div>
          )}
          {files.error && (
            <div className="flex flex-col gap-2 mt-6">
              Error happened while retrieving shared files{" "}
            </div>
          )}
        </PagesContainer>
      </div>
    </div>
  );
}

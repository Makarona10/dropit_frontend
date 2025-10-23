"use client";

import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import Tag from "@/components/files_browsing/Tag";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import HeadBtnsBar from "@/components/common/HeadBtnsBar";
import AddTag from "@/components/files_browsing/tags_components/AddTag";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PaginationButtons from "@/components/pagination_btns/PaginationComp";
import { useApi } from "@/lib/useApi";
import PagesContainer from "@/components/common/Container";
import Separator from "@/components/common/Separator";

type Tag = {
  id: number;
  name: string;
  createdAt: Date;
};

const Tags = () => {
  const searchParams = useSearchParams();
  const [isAddTagVisible, setIsAddTagVisible] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const [tags, setTags] = useState({
    loading: true,
    error: false,
    data: [],
    pages: 0,
  });
  const { api } = useApi();
  const btns = [
    {
      name: "Add tag",
      ico: IoMdAddCircleOutline,
      color: "#4AA927",
      action: () => {
        setIsAddTagVisible(true);
      },
    },
  ];

  useEffect(() => {
    const getTags = async (page: number) => {
      try {
        const response = await api(`/tag/list-tags?page=${page}`, "get");
        setTags({
          error: false,
          loading: false,
          data: response.data.data.tags,
          pages: response.data.data.pages,
        });
      } catch (error) {
        setTags({ error: true, loading: false, data: [], pages: 0 });
      }
    };

    getTags(page);
  }, []);

  return (
    <div className="flex w-full">
      <SideBar title="Cloud" />
      <AddTag
        isOpen={isAddTagVisible}
        onClose={() => setIsAddTagVisible(false)}
      />
      <div className="z-20"></div>
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <PagesContainer>
          <div className="grid grid-cols-2 ">
            <div className="flex items-center gap-4">
              <h1 className="pagesHeader">Tags</h1>
              <FaTags className="text-primary-500 sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
            </div>
            <div className="w-full flex flex-row-reverse">
              <PaginationButtons total={tags.pages || 0} />
            </div>
          </div>
          <Separator />

          <div className="flex flex-wrap gap-5 w-full">
            {tags.loading && (
              <div className="w-full flex justify-center">
                <LoadingSpinner />
              </div>
            )}
            {tags.error && !tags.loading && (
              <div className="w-full flex ">
                <p className="w-full text-center text-2xl underline font-semibold">
                  Error happened while loading tags! try refreshing the page
                </p>
              </div>
            )}
            {!tags.loading && tags.data.length === 0 && !tags.error && (
              <div className="w-full text-center font-bold">
                <p className="sm:text-2xl text-sm font-semibold">
                  No Tags created yet.
                </p>
              </div>
            )}
            {!tags.loading &&
              tags.data.length > 0 &&
              !tags.error &&
              tags.data.map((t: Tag) => {
                const theDate = new Date(t.createdAt);

                return (
                  <Tag
                    key={t.id}
                    id={t.id}
                    name={t.name}
                    createdAt={theDate.toLocaleDateString()}
                  />
                );
              })}
          </div>
        </PagesContainer>
      </div>
    </div>
  );
};

export default Tags;

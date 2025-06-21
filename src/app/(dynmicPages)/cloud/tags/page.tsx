"use client";

import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import Tag from "@/app/components/files_browsing/Tag";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import HeadBtnsBar from "@/app/components/common/HeadBtnsBar";
import AddTag from "@/app/components/files_browsing/tags_components/AddTag";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import AddFileToTag from "@/app/components/files_browsing/tags_components/AddFileToTag";

type Tag = {
  id: number;
  name: string;
  createdAt: Date;
};

const btns = [
  {
    name: "Add tag",
    ico: IoMdAddCircleOutline,
    color: "#4AA927",
    action: () => {
      const add_tag_div_id = "add_tag";
      const element = document.getElementById(add_tag_div_id);
      if (element) {
        element.style.visibility = "visible";
        element.style.opacity = "100";
      }
    },
  },
  {
    name: "Sort by name",
    ico: FaSort,
    color: "#D2D2D2",
    action: () => {},
  },
  {
    name: "Sort by files",
    ico: FaSort,
    color: "#D2D2D2",
    action: () => {},
  },
];

const TagsPage = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [tags, setTags] = useState({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const getTags = async (page: number, token: string | null) => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/tag/list-tags?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTags({ error: false, loading: false, data: response.data.data });
      } catch (error) {
        setTags({ error: true, loading: false, data: [] });
      }
    };

    getTags(page, token);
  }, []);

  return (
    <div className="flex w-full">
      <SideBar title="Cloud" />
      <AddTag />
      <div className="z-20"></div>
      <div className="flex flex-col w-full">
        <Header />
        <HeadBtnsBar buttons={btns} />
        <div className="flex items-center gap-4 pt-10 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Tags</h1>
          <FaTags className="text-primary-500 sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full">
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
              <p className="text-2xl font-semibold">No Tags created yet.</p>
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
      </div>
    </div>
  );
};

export default TagsPage;

"use client";
import SideBar from "@/components/common/SideBar";
import CircleProgress from "@/components/progress_visual/CircleProgress";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { GiHand } from "react-icons/gi";
import { FaHeadset, FaImages, FaPhotoVideo } from "react-icons/fa";
import { LuFileStack } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { BsServer } from "react-icons/bs";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatFileSize } from "@/app/functions";
import Header from "@/components/common/Header";
import { useApi } from "@/lib/useApi";

type Media_type = {
  name: string;
  color: string;
};
const types: Media_type[] = [
  {
    name: "Images",
    color: "#1aaa20",
  },
  {
    name: "Videos",
    color: "#1a4aae",
  },
  {
    name: "Audios",
    color: "#d4e40b",
  },
  {
    name: "Others",
    color: "#1bdcd2",
  },
];

interface User {
  id: string;
  email: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  totalQuota: number;
  usedQuota: number;
  images: {
    count: number;
    size: number;
  };
  videos: {
    count: number;
    size: number;
  };
  audios: {
    count: number;
    size: number;
  };
  others: {
    count: number;
    size: number;
  };
  totalFiles: number;
}

const Me = () => {
  const [info, setInfo] = useState<{
    loading: boolean;
    error: string;
    data: User;
  }>({
    loading: true,
    error: "",
    data: {
      id: "",
      email: "",
      createdAt: "",
      firstName: "",
      lastName: "",
      usedQuota: 0,
      totalQuota: 0,
      updatedAt: "",
      totalFiles: 0,
      videos: { size: 0, count: 0 },
      images: { size: 0, count: 0 },
      others: { size: 0, count: 0 },
      audios: { size: 0, count: 0 },
    },
  });
  const { api } = useApi();

  const calculatePercentage = (mediaSize: number) => {
    const result = (mediaSize / info.data.totalQuota) * 100;
    return result.toFixed(0);
  };

  const fetchAccountDetails = async () => {
    setInfo({ ...info, loading: true });
    try {
      const result = await api(`/user/me`, "get");

      const formattedDate = new Date(
        result.data.data.createdAt,
      ).toLocaleDateString();
      setInfo({
        loading: false,
        error: "",
        data: { ...result.data.data, createdAt: formattedDate },
      });
    } catch (error: any) {
      if (error?.response?.data?.statusCode === 401) {
        setInfo({ ...info, loading: false, error: "Unauthorized!" });
      } else {
        setInfo({
          ...info,
          loading: false,
          error: "unexpected error happened.",
        });
      }
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="fixed inset-0 bg-[url('/cover.jpeg')] bg-cover bg-center bg-no-repeat z-[-1]"></div>
      <SideBar title="Me" />
      {info.loading && (
        <div className="m-auto">
          <LoadingSpinner />
        </div>
      )}
      {!info.loading && info.error && (
        <div className="m-auto text-2xl">{info.error}</div>
      )}
      {!info.loading && !info.error && info.data?.id && (
        <div className="w-full flex-col">
          <Header />
          <div className="flex flex-col mx-auto sm:w-[650px] w-[328px] sm:p-9 p-5 gap-4 sm:mt-16 mt-8">
            <div className="flex gap-3 items-center">
              <GiHand className="sm:text-2xl text-xl" />
              <h1 className="sm:text-2xl text-xl font-semibold text-transparent bg-gradient-to-l from-cyan-200 to-white bg-clip-text">
                Hello {info.data.firstName}
              </h1>
            </div>
            <div className="flex flex-wrap w-full rounded-xl sm:p-9 p-5 bg-neutral-800 sm:gap-0 gap-4 border-[1px] border-white/10">
              <div className="flex justify-center items-center size-20 rounded-full border-2 border-primary-500 cursor-pointer">
                {info.data.firstName[0]}
              </div>
              <div className="flex flex-col sm:ml-8">
                <p className="sm:text-xl text-base sm:text-left font-semibold">
                  {info.data.firstName.concat(" ", info.data.lastName)}
                </p>
                <p className="sm:text-base text-xs opacity-70 sm:mt-0 mt-2">
                  {info.data.email}
                </p>
                <p className="lining-nums sm:text-sm text-xs opacity-35">
                  Joined on: {info.data.createdAt}
                </p>
              </div>
              <div className="sm:ml-8 h-full">
                <button
                  className="text-secondary-100 p-2 rounded-lg bg-primary-600
              transition hover:shadow-md hover:shadow-neutral-500/30
              sm:text-base text-sm"
                >
                  Update password
                </button>
              </div>
            </div>
            <div className="flex flex-col bg-neutral-800 w-full rounded-xl sm:p-9 p-5 gap-4 border-[1px] border-white/10">
              <div className="grid sm:grid-cols-2 w-full gap-4">
                <div className="flex flex-col sm:gap-7">
                  <div className="flex nowrap items-center gap-2">
                    <BsServer className="sm:text-2xl text-xl" />
                    <p className="sm:text-2xl text-xl mr-4 font-bold ">
                      Quota Usage:
                    </p>
                  </div>
                  <div className="sm:w-full flex items-center sm:mt-0 mt-5 sm:mx-0 mx-auto">
                    <CircleProgress
                      percentage={
                        +(
                          (info.data.usedQuota / info.data.totalQuota) *
                          100
                        ).toFixed(0)
                      }
                      size={120}
                      strokeWidth={12}
                      font={"29"}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap sm:flex-col gap-4 my-auto p-4">
                  {types.map((t: Media_type) => {
                    return (
                      <div
                        key={t.name}
                        className="flex items-center sm:text-base text-xs"
                      >
                        <div
                          className={`sm:w-4 sm:h-4 w-3 h-3 rounded-sm`}
                          style={{ backgroundColor: t.color }}
                        ></div>
                        <p className="sm:ml-3 ml-2">{t.name}</p>
                        <p className="ml-3">
                          {t.name === "Images"
                            ? calculatePercentage(info.data.images.size)
                            : t.name === "Videos"
                              ? calculatePercentage(info.data.videos.size)
                              : t.name === "Others"
                                ? calculatePercentage(info.data.others.size)
                                : t.name === "Audios"
                                  ? calculatePercentage(info.data.audios.size)
                                  : ""}{" "}
                          %
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr className="m-5 opacity-20" />
              <div className="flex flex-col gap-3 sm:text-xl text-lg font-bold text-white/90">
                <p className="border-l-4 border-primary-500 px-2">
                  Used storage: {formatFileSize(info.data.usedQuota)}
                </p>
                <p className="border-l-4 border-primary-500 px-2">
                  Total storage:{" "}
                  {parseInt(formatFileSize(info.data.totalQuota))} GB
                </p>
              </div>
              <div className="flex gap-2 text-neutral-300/60 mt-5">
                <MdOutlineTipsAndUpdates className="sm:text-xl text-lg" />
                <p className="sm:text-base text-xs">
                  Clean your trash bin to get more free space
                </p>
              </div>
            </div>
            <div className="flex flex-col bg-neutral-800 w-full rounded-xl sm:p-9 p-5 gap-4 border-[1px] border-white/10">
              <div className="flex flex-col sm:gap-7 gap-5 text-md">
                <div className="flex items-center nowrap gap-3 w-full text-sm sm:text-base">
                  <LuFileStack size={20} className="text-primary-500" />
                  <p>Total files uploaded:</p>
                  <p className="font-semibold">{info.data.totalFiles} files</p>
                  <p>|</p>
                  <p className="font-semibold">
                    {formatFileSize(info.data.usedQuota)}
                  </p>
                </div>
                <div className="flex items-center nowrap gap-3 w-full text-sm sm:text-base">
                  <FaImages size={20} className="text-primary-500" />
                  <p>uploaded images:</p>
                  <p className="font-semibold">
                    {info.data.images.count} images
                  </p>
                  <p>|</p>
                  <p className="font-semibold">
                    {formatFileSize(info.data.images.size)}
                  </p>
                </div>
                <div className="flex items-center nowrap gap-3 w-full text-sm sm:text-base">
                  <FaPhotoVideo size={20} className="text-primary-500" />
                  <p>uploaded videos:</p>
                  <p className="font-semibold">
                    {info.data.videos.count} videos
                  </p>
                  <p>|</p>
                  <p className="font-semibold">
                    {formatFileSize(info.data.videos.size)}
                  </p>
                </div>
                <div className="flex items-center nowrap gap-3 w-full text-sm sm:text-base">
                  <FaHeadset size={20} className="text-primary-500" />
                  <p>uploaded audios:</p>
                  <p className="font-semibold">
                    {info.data.audios.count} audios
                  </p>
                  <p>|</p>
                  <p className="font-semibold">
                    {formatFileSize(info.data.audios.size)}
                  </p>
                </div>
                <div className="flex items-center nowrap gap-3 w-full text-sm sm:text-base">
                  <IoDocumentText size={20} className="text-primary-500" />
                  <p>other types:</p>
                  <p className="font-semibold">
                    {info.data.others.count} files
                  </p>
                  <p>|</p>
                  <p className="font-semibold">
                    {formatFileSize(info.data.others.size)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Me;

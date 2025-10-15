"use client";
import { IconType } from "react-icons";
import { FaDownload } from "react-icons/fa6";
import { RiUserSharedLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import path from "path";
import { downloadFile } from "@/app/functions";
import { useApi } from "@/lib/useApi";

type Btn = {
  ico: IconType;
  name: string;
  action: Function;
  style?: string;
};

const ImagePreviewer = () => {
  const { id } = useParams();
  const { api } = useApi();
  const [image, setImage] = useState({
    loading: true,
    error: false,
    img: {
      id: 0,
      userId: "",
      name: "",
      uniqueName: "",
      resolution: "",
      path: "",
      sizeInKb: 0,
      type: "",
      extenstion: "",
      createdAt: "",
      isFavourite: false,
    },
  });
  const icons: Btn[] = [
    {
      ico: FaDownload,
      name: "Download",
      action: () => {
        downloadFile(api, image.img.id, image.img.name);
      },
    },
    {
      ico: RiUserSharedLine,
      name: "Share",
      action: () => {},
    },
    {
      ico: FaStar,
      name: "Add to favourite",
      action: () => {
        if (image.img.isFavourite) {
          removeFromFavourite();
        } else {
          addToFavourite();
        }
      },
      style: "text-primary-500",
    },
  ];

  const addToFavourite = async () => {
    try {
      await api(`/favourite/add-file?fileId=${id}`, "post");
      setImage({ ...image, img: { ...image.img, isFavourite: true } });
    } catch {}
  };

  const removeFromFavourite = async () => {
    try {
      await api(`/favourite/remove-file?fileId=${id}`, "delete");
      setImage({ ...image, img: { ...image.img, isFavourite: false } });
    } catch {}
  };

  useEffect(() => {
    const fetchFiles = async () => {
      setImage({ ...image, loading: true });
      try {
        const res = await api(`/file/get-file/${id}`, "get");
        setImage({ loading: false, error: false, img: res.data.data });
      } catch (error) {
        setImage({
          loading: false,
          error: true,
          img: { ...image.img, isFavourite: false },
        });
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5 min-h-screen items-center">
      <div className="flex items-center w-full p-3 shadow-neutral-600 shadow-sm bg-neutral-800 sm:px-28 text-xl gap-4">
        <div className="flex gap-4 m-auto">
          {icons.map((b: Btn, idx: number) => {
            const Icon = b.ico;
            return (
              <div
                key={idx}
                className={`p-3 hover:bg-white/10 cursor-pointer rounded-full`}
                title={b.name}
                onClick={() => {
                  b.action();
                }}
              >
                <Icon className={`${image?.img?.isFavourite && b.style}`} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-auto flex justify-center items-center h-[calc(80vh)] ">
        <Image
          src={`${path.join(process.env.NEXT_PUBLIC_SERVER_URI || "", "uploads", image?.img?.userId || "", image?.img?.path || "", image?.img?.uniqueName || "")}`}
          width={3840}
          height={2160}
          alt={"Picture"}
          className="rounded-lg h-full object-contain border-y border-y-neutral-300/10"
        />
      </div>
    </div>
  );
};

export default ImagePreviewer;

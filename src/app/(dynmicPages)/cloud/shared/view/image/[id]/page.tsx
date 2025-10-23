"use client";
import { IconType } from "react-icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import path from "path";
import { useApi } from "@/lib/useApi";
import { FaUser } from "react-icons/fa6";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { FaImage } from "react-icons/fa";

const SharedImagePreviewer = () => {
  const { id } = useParams();
  const { api } = useApi();
  const [image, setImage] = useState({
    loading: true,
    error: false,
    img: {
      id: 0,
      userId: "",
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
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
        const res = await api(`/file/shared/get-file/${id}`, "get");
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

  if (image.loading)
    return (
      <div className="h-screen flex items-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="w-full flex flex-col min-h-screen items-center">
      <div className="w-full flex bg-neutral-800 p-2 sm:px-10">
        <FaUser color="#c83c51" className="mt-1" />
        <div className="flex flex-col ml-2">
          <p className="sm:text-base text-sm">
            <b>
              {image.img.user.firstName + " " + image.img.user.lastName + " "}
            </b>
            shared this image with you
          </p>
          <p className="sm:text-xs text-xs text-gray-400">
            {image.img.user.email}
          </p>
        </div>
      </div>
      <div className="flex p-2 text-white w-full bg-neutral-800/70 sm:px-10">
        <FaImage className="mt-1 text-2xl" color="#c83c51" />
        <div className="flex flex-col ml-2">
          <h2 className="sm:text-base text-sm font-semibold">
            {image.img.name || "Image"}
          </h2>
          <p className="text-[10px] text-gray-400">
            {image.img.resolution} ({(image.img.sizeInKb / 1024).toFixed(2)} MB)
          </p>
        </div>
      </div>
      <div className="my-auto flex justify-center items-center h-[calc(80vh)] ">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URI || ""}/uploads/${image?.img?.userId && image?.img?.userId + "/"}${image?.img?.path && image?.img?.path + "/"}${image?.img?.uniqueName}`}
          width={3840}
          height={2160}
          alt={image.img.name}
          className="rounded-lg h-full object-contain border-y border-y-neutral-300/10"
        />
      </div>
    </div>
  );
};

export default SharedImagePreviewer;

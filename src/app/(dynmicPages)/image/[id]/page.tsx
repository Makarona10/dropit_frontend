"use client";
import { IconType } from "react-icons";
import { FaDownload } from "react-icons/fa6";
import { RiUserSharedLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import path from "path";

type Btn = {
  ico: IconType;
  name: string;
  action: Function;
  style?: string;
};

const ImagePreviewer = () => {
  const { id } = useParams();
  const [image, setImage] = useState({
    loading: true,
    error: false,
    img: {
      id: null,
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
  const [token, setToken] = useState<string | null>();

  const icons: Btn[] = [
    {
      ico: FaDownload,
      name: "Download",
      action: () => {
        downloadFile();
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/add-file?fileId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImage({ ...image, img: { ...image.img, isFavourite: true } });
    } catch {}
  };

  const removeFromFavourite = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favourite/remove-file?fileId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImage({ ...image, img: { ...image.img, isFavourite: false } });
    } catch {}
  };

  const downloadFile = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/file/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        },
      );
      const blob = new Blob([res.data], { type: res.headers["content-type"] });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        res.headers["content-disposition"]?.split("filename=")[1] ||
        `file_${image.img.name}`;
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL and removing the link
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {}
  };

  useEffect(() => {
    const tok = localStorage.getItem("access_token");
    const fetchFiles = async () => {
      setToken(tok);
      setImage({ ...image, loading: true });
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-file/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          },
        );
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
      <div className="flex justify-center items-center my-auto sm:max-w-10/12 h-full p-5">
        <Image
          src={`${path.join(process.env.NEXT_PUBLIC_SERVER_URI || "", "uploads", image?.img?.userId || "", image?.img?.path || "", image?.img?.uniqueName || "")}`}
          width={3840}
          height={2160}
          alt={"Picture"}
          className="rounded-lg border-[2px] border-while-500/20"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewer;

"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { FaDownload, FaStar } from "react-icons/fa6";
import { RiUserSharedLine } from "react-icons/ri";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { downloadFile } from "@/app/functions";
import axios from "axios";
import path from "path";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Btn = {
  ico: IconType;
  name: string;
  action: Function;
  style?: string;
};

const btns_style: string =
  "sm:text-xl text-lg p-3 hover:bg-white/10 cursor-pointer rounded-full";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [video, setVideo] = useState({
    loading: true,
    error: false,
    vid: {
      id: null,
      userId: "",
      name: "",
      uniqueName: "",
      resolution: "",
      path: "",
      duration: 0,
      fps: 0,
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
        if (id && token) downloadFile(Number(id), token);
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
        if (video.vid.isFavourite) {
          removeFromFavourite;
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
      setVideo({ ...video, vid: { ...video.vid, isFavourite: true } });
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
      setVideo({ ...video, vid: { ...video.vid, isFavourite: false } });
    } catch {}
  };

  useEffect(() => {
    const tok = localStorage.getItem("access_token");
    const fetchFiles = async () => {
      setToken(tok);
      setVideo({ ...video, loading: true });
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/file/get-file/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tok}`,
            },
          },
        );
        setVideo({ loading: false, error: false, vid: res.data.data });
      } catch (error) {
        setVideo({
          loading: false,
          error: true,
          vid: { ...video.vid, isFavourite: false },
        });
      }
    };

    fetchFiles();
  }, []);

  console.log(
    `${path.join(process.env.NEXT_PUBLIC_SERVER_URI || "", "uploads", video?.vid?.userId || "", video?.vid?.path || "", video?.vid?.uniqueName || "")}`,
  );

  return (
    <div className="w-full relative min-h-screen mx-auto rounded-xl overflow-hidden">
      {/* <video */}
      {/*   ref={videoRef} */}
      {/*   loop */}
      {/*   muted */}
      {/*   autoPlay */}
      {/*   className="w-full border-2 border-primary-500" */}
      {/* > */}
      {/*   <source src="/videos/video.mp4" type="video/mp4" /> */}
      {/* </video> */}
      {/* <div className="relative bottom-8 sm:px-5 flex "> */}
      {/*   <button className="text-white" onClick={togglePlayPause}> */}
      {/*     {isPaused ? "Play" : "Pause"} */}
      {/*   </button> */}
      {/*   <p>{(vidProgress * 100).toFixed(2)}%</p> */}
      {/* </div> */}
      <div className="flex items-center p-3 w-full bg-neutral-800 shadow-sm shadow-neutral-600">
        <div className="flex items-center justify-center w-full gap-4 m-auto text-xl">
          {icons.map((b: Btn, idx: number) => {
            const Icon = b.ico;
            return (
              <div key={idx} className={btns_style} title={b.name}>
                <Icon />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full sm:mt-32 m-auto flex flex-col">
        <ReactPlayer
          playing={!isPaused}
          style={{
            margin: "auto",
            maxWidth: "100%",
            height: "min-content",
            borderStyle: "solid",
            borderWidth: "1px",
          }}
          url={`${path.join(process.env.NEXT_PUBLIC_SERVER_URI || "", "uploads", video?.vid?.userId || "", video?.vid?.path || "", video?.vid?.uniqueName || "")}`}
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayerPage;

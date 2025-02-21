"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { FaDownload, FaStar } from "react-icons/fa";
import { RiUserSharedLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type Btn = {
  ico: IconType;
  name: string;
  action: Function;
};

const icons: Btn[] = [
  { ico: FaDownload, name: "Download", action: () => {} },
  {
    ico: RiUserSharedLine,
    name: "Share",
    action: () => {},
  },
  {
    ico: FaStar,
    name: "Add to favourite",
    action: () => {},
  },
];

const btns_style: string =
  "sm:text-xl text-lg p-3 hover:bg-white/10 cursor-pointer rounded-full";

const VideoPlayerPage = () => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [duration, setDuration] = useState<string>("00:00");
  // const [playedSeconds, setPlayedSeconds] = useState<string>("00:00");
  // const [vidProgress, setVidProgress] = useState<number>(0);
  const router = useRouter();
  const search_params = useSearchParams();

  const video_id = search_params.get("id");

  useEffect(() => {}, []);

  return (
    <div className="relative py-5 w-[90%] min-h-screen max-w-6xl mx-auto rounded-xl overflow-hidden">
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
      <div className="flex items-center flex-wrap w-full">
        <div className="flex items-center">
          <div
            className={btns_style}
            title="Go back"
            onClick={() => router.back()}
          >
            <IoMdArrowRoundBack />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 m-auto text-xl">
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
          url="videos/video.mp4"
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayerPage;

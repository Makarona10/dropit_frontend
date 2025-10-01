"use client";

import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  FaDownload,
  FaStar,
  FaPlay,
  FaPause,
  FaVolumeHigh,
  FaVolumeOff,
  FaForward,
  FaBackward,
  FaExpand,
  FaCompress,
} from "react-icons/fa6";
import { RiUserSharedLine } from "react-icons/ri";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { downloadFile } from "@/app/functions";
import { useApi } from "@/lib/useApi";

interface VideoData {
  id: number | null;
  userId: string;
  name: string;
  uniqueName: string;
  resolution: string;
  path: string;
  duration: number;
  fps: number;
  sizeInKb: number;
  type: string;
  extension: string;
  createdAt: string;
  isFavourite: boolean;
}

interface Button {
  ico: IconType;
  name: string;
  action: () => void;
  style?: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const VideoPlayerPage = () => {
  const { id } = useParams();
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [buffering, setBuffering] = useState<boolean>(false);
  const [bufferedProgress, setBufferedProgress] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [video, setVideo] = useState<{
    loading: boolean;
    error: boolean;
    vid: VideoData;
  }>({
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
      extension: "",
      createdAt: "",
      isFavourite: false,
    },
  });
  const [vidPath, setVidPath] = useState<string>("");
  const { api } = useApi();

  const buttons: Button[] = [
    {
      ico: FaDownload,
      name: "Download",
      action: async () => {
        await downloadFile(Number(id), video.vid.name);
      },
    },
    {
      ico: RiUserSharedLine,
      name: "Share",
      action: () => {},
    },
    {
      ico: FaStar,
      name: video.vid.isFavourite
        ? "Remove from favourite"
        : "Add to favourite",
      action: () => {
        if (video.vid.isFavourite) {
          removeFromFavourite();
        } else {
          addToFavourite();
        }
      },
      style: video.vid.isFavourite,
    },
  ];

  const togglePlayPause = () => {
    if (vidRef.current) {
      if (isPaused) {
        vidRef.current.play().catch((e) => {});
      } else {
        vidRef.current.pause();
      }
      setIsPaused((prev) => !prev);
    }
  };

  const handleProgress = () => {
    if (vidRef.current) {
      setCurrentTime(vidRef.current.currentTime);
      const buffered = vidRef.current.buffered;
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        setBufferedProgress((bufferedEnd / duration) * 100);
      }
    }
  };

  const handleSeek = async (seekTime: number) => {
    if (vidRef.current) {
      const buffered = vidRef.current.buffered;
      let isBuffered = false;
      for (let i = 0; i < buffered.length; i++) {
        if (seekTime >= buffered.start(i) && seekTime <= buffered.end(i)) {
          isBuffered = true;
          break;
        }
      }

      if (isBuffered) {
        vidRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
        setBuffering(false);
      } else {
        setBuffering(true);
        vidRef.current.pause();
        setIsPaused(true);

        const checkBuffer = () =>
          new Promise<void>((resolve) => {
            const onProgress = () => {
              const buffered = vidRef.current!.buffered;
              for (let i = 0; i < buffered.length; i++) {
                if (
                  seekTime >= buffered.start(i) &&
                  seekTime <= buffered.end(i)
                ) {
                  vidRef.current!.removeEventListener("progress", onProgress);
                  resolve();
                  break;
                }
              }
            };
            vidRef.current!.addEventListener("progress", onProgress);
          });

        await checkBuffer();
        vidRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
        setBuffering(false);
        if (!isPaused) {
          vidRef.current.play().catch();
        }
      }
    }
  };

  const handleProgressBarClick = async (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (vidRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const seekPercentage = (clickX / width) * 100;
      const seekTime = (seekPercentage / 100) * duration;
      await handleSeek(seekTime);
    }
  };

  const handleSkipForward = async () => {
    if (vidRef.current) {
      const newTime = Math.min(currentTime + 10, duration);
      await handleSeek(newTime);
    }
  };

  const handleSkipBackward = async () => {
    if (vidRef.current) {
      const newTime = Math.max(currentTime - 10, 0);
      await handleSeek(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen().catch();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vidRef.current) {
      const newVolume = Number(e.target.value) / 100;
      vidRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (vidRef.current) {
      if (isMuted) {
        vidRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        vidRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const addToFavourite = async () => {
    try {
      await api(`/favourite/add-file?fileId=${id}`, "post");
      setVideo((prev) => ({
        ...prev,
        vid: { ...prev.vid, isFavourite: true },
      }));
    } catch (error) {}
  };

  const removeFromFavourite = async () => {
    try {
      await api(`/favourite/remove-file?fileId=${id}`, "delete");
      setVideo((prev) => ({
        ...prev,
        vid: { ...prev.vid, isFavourite: false },
      }));
    } catch (error) {}
  };

  useEffect(() => {
    const fetchVideo = async () => {
      setVideo((prev) => ({ ...prev, loading: true }));
      try {
        const res = await api(`/file/get-file/${id}`, "get");
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI || "";
        const videoUrl = `${baseUrl}/Uploads/${res.data.data.userId}/${res.data.data.path}/${encodeURIComponent(res.data.data.uniqueName)}`;
        setVidPath(videoUrl);
        setDuration(res.data.data.duration);
        setVideo({
          loading: false,
          error: false,
          vid: res.data.data,
        });
      } catch (error) {
        setVideo((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    };

    fetchVideo();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
        {/* Upper Bar */}
        <div className="flex items-center p-3 w-full bg-neutral-800 shadow-sm shadow-neutral-600">
          <div className="flex items-center justify-center w-full gap-4 text-xl">
            {buttons.map((b, idx) => (
              <button
                key={idx}
                className={`sm:text-xl text-lg p-3 hover:bg-white/10 cursor-pointer rounded-full ${b.style ? "text-primary-500" : "text-gray-400"}`}
                title={b.name}
                onClick={b.action}
              >
                <b.ico />
              </button>
            ))}
          </div>
        </div>
        {/* Video Container */}
        <div
          ref={playerRef}
          className="relative w-full aspect-video fullscreen:w-screen fullscreen:h-screen"
        >
          {video.loading || !vidPath ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          ) : video.error ? (
            <div className="flex items-center justify-center h-full text-white">
              Error loading video
            </div>
          ) : (
            <div className="relative group fullscreen:w-screen fullscreen:h-screen">
              <video
                ref={vidRef}
                loop
                className="w-full h-full object-contain bg-black"
                onTimeUpdate={handleProgress}
                onProgress={handleProgress}
                onError={(e) => {}}
              >
                <source src={vidPath} type="video/mp4" />
              </video>
              {buffering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <LoadingSpinner />
                </div>
              )}
              {/* Control Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2">
                  {/* Skip Backward */}
                  <button
                    className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                    onClick={handleSkipBackward}
                    title="Skip Backward 10s"
                  >
                    <FaBackward size={20} />
                  </button>
                  {/* Play/Pause */}
                  <button
                    className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                    onClick={togglePlayPause}
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
                  </button>
                  {/* Skip Forward */}
                  <button
                    className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                    onClick={handleSkipForward}
                    title="Skip Forward 10s"
                  >
                    <FaForward size={20} />
                  </button>
                  {/* Progress Bar */}
                  <div
                    ref={progressBarRef}
                    className="relative flex-1 mx-2 h-1 bg-neutral-700 rounded-full cursor-pointer"
                    onClick={handleProgressBarClick}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gray-500 rounded-full"
                      style={{ width: `${bufferedProgress}%` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full bg-primary-500 rounded-full"
                      style={{
                        width: duration
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full hidden group-hover:block"
                      style={{
                        left: duration
                          ? `${(currentTime / duration) * 100}%`
                          : "0%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                  {/* Timer */}
                  <span className="text-white text-sm min-w-[100px]">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  {/* Volume Control */}
                  <button
                    className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                    onClick={toggleMute}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <FaVolumeOff size={20} />
                    ) : (
                      <FaVolumeHigh size={20} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume * 100}
                    onChange={handleVolumeChange}
                    className="w-20 accent-primary-500 cursor-pointer"
                  />
                  {/* Fullscreen */}
                  <button
                    className="text-white p-2 hover:bg-white/20 rounded-full transition-all duration-200"
                    onClick={toggleFullscreen}
                    title={
                      isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"
                    }
                  >
                    {isFullscreen ? (
                      <FaCompress size={20} />
                    ) : (
                      <FaExpand size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Video Info */}
        <div className="p-4 text-white">
          <h2 className="text-xl font-semibold">{video.vid.name || "Video"}</h2>
          <p className="text-sm text-gray-400">
            {video.vid.resolution} • {(video.vid.sizeInKb / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeNavbar from "../navigation/HomeNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  IconDefinition,
  faImage,
  faPhotoVideo,
  faAddressCard,
  faFolderClosed,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import PhotosNavBar from "../navigation/PhotosNavBar";
import VideosNavBar from "../navigation/VideosNavBar";
import FoldersNavBar from "../navigation/FoldersNavBar";

type linksObject = {
  name: string;
  img: IconDefinition;
  ref: string;
};

const mainlinks: linksObject[] = [
  {
    name: "Me",
    img: faAddressCard,
    ref: "me",
  },
  {
    name: "cloud",
    img: faCloud,
    ref: "cloud/recents",
  },
  {
    name: "photos",
    img: faImage,
    ref: "photos/recents",
  },
  {
    name: "videos",
    img: faPhotoVideo,
    ref: "videos/recents",
  },
  {
    name: "folders",
    img: faFolderClosed,
    ref: "folders/recents",
  },
];

type sideBarSelectios = {
  title?: string;
};

const SideBar = ({ title }: sideBarSelectios) => {
  const [toggleBar, setToggleBar] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!barRef.current?.contains(event.target)) {
        setToggleBar(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [barRef]);

  const pathName = usePathname();
  return (
    <div className="relative min-h-screen max-h-full flex left-0 bg-neutral-800 border-r-[1px] border-neutral-400/30">
      <nav
        aria-label="Global"
        className="flex sm:w-[70px] w-[60px] flex-col relative items-center"
      >
        <div
          className="md:hidden flex items-center justify-center bg-neutral-900/40
          text-center text-4xl text-neutral-400 cursor-pointer select-none
          w-full h-[74px] hover:bg-neutral-700/50"
          onClick={() => setToggleBar(true)}
        >
          ☛
        </div>
        {mainlinks.map((l: linksObject, idx: number) => {
          return (
            <Link
              key={idx}
              className={`
                         flex flex-col justify-center items-center w-full h-[74px]
                         text-zinc-300 greyscale
                         hover:bg-black transition-all duration-100
                         ${pathName.split("/")[1].includes(`${l.name.toLowerCase()}`) && "bg-black"}`}
              href={"/" + l.ref}
            >
              <FontAwesomeIcon
                className={`sm:w-[30px] sm:h-[30px] w-[24px] h-[24px] greyscale ${pathName.split("/")[1].includes(`${l.name.toLowerCase()}/`) ? "bg-black" : "bg-transparent"}`}
                icon={l.img}
                style={{
                  color: `${pathName.split("/")[1].includes(`${l.name.toLowerCase()}`) ? "#c83c51" : "grey"}`,
                }}
              />
              <p className="mt-1 sm:text-[13px] text-[11px] font-[500]">
                {l.name.charAt(0).toUpperCase() + l.name.slice(1)}
              </p>
            </Link>
          );
        })}
      </nav>
      <div
        className={`absolute transition duration-200 md:relative h-full md:right-0 z-10 md:-translate-x-0 ${toggleBar ? "" : "-translate-x-[440px]"}`}
        ref={barRef}
      >
        {title === "Cloud" && <HomeNavbar />}
        {title === "Photos" && <PhotosNavBar />}
        {title === "Folders" && <FoldersNavBar />}
        {title === "Videos" && <VideosNavBar />}
      </div>
    </div>
  );
};

export default SideBar;

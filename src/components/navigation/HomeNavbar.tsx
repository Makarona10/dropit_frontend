"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTag,
  faFileVideo,
  faImages,
  faFolderOpen,
  faTrash,
  faStar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

type linkForming = {
  name: string;
  img: IconDefinition;
  ref: string;
};

const links: linkForming[] = [
  { name: "Recents", img: faClock, ref: "recents" },
  { name: "Favourites", img: faStar, ref: "favourites" },
  { name: "Deleted", img: faTrash, ref: "deleted" },
  { name: "Tags", img: faTag, ref: "tags" },
  { name: "Folders", img: faFolderOpen, ref: "shared/folders" },
  { name: "Images", img: faImages, ref: "shared/images" },
  { name: "Videos", img: faFileVideo, ref: "shared/videos" },
];

const HomeNavbar = () => {
  const pathname = usePathname();

  const isActive = (ref: string) => pathname.includes(`/cloud/${ref}`);

  return (
    <div className="flex flex-col h-full w-[230px] bg-neutral-700 text-sm md:text-base">
      <h2 className="sm:text-2xl text-xl m-6">Cloud</h2>

      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.slice(0, 4).map((l) => (
          <Link
            key={l.ref}
            className={`
              relative flex items-center w-full p-2 pl-7 rounded-xl
              hover:bg-neutral-800 hover:cursor-pointer opacity-80
              ${isActive(l.ref) ? "bg-neutral-800 text-white opacity-100" : ""}
            `}
            href={`/cloud/${l.ref}`}
          >
            <FontAwesomeIcon
              icon={l.img}
              width={17}
              height={17}
              style={{ color: isActive(l.ref) ? "#dd2c2c" : "" }}
            />
            <p
              className={`ml-2 ${isActive(l.ref) ? "opacity-100" : "opacity-80"}`}
            >
              {l.name}
            </p>
          </Link>
        ))}
      </div>

      <h5 className="opacity-90 font-[600] tracking-wider text-neutral-300 p-5 text-[10px] md:text-xs">
        Shared items
      </h5>

      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.slice(4, 7).map((l) => (
          <Link
            key={l.ref}
            className={`
              relative flex items-center w-full p-2 pl-7 rounded-xl
              hover:bg-neutral-800 hover:cursor-pointer
              ${isActive(l.ref) ? "bg-neutral-800 text-white opacity-100" : ""}
            `}
            href={`/cloud/${l.ref}`}
          >
            <FontAwesomeIcon
              icon={l.img}
              className={`w-[17px] h-[17px] ${isActive(l.ref) ? "text-primary-500" : "opacity-80"}`}
            />
            <p
              className={`ml-2 ${isActive(l.ref) ? "opacity-100" : "opacity-80"}`}
            >
              {l.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeNavbar;

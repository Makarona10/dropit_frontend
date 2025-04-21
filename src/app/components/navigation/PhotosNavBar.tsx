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

const links = [
  {
    name: "Recently uploaded",
    img: faClock,
    ref: "recents",
  },
  {
    name: "Favourite Photos",
    img: faStar,
    ref: "favourites",
  },
  {
    name: "Deleted Photos",
    img: faTrash,
    ref: "deleted",
  },
  {
    name: "Folders",
    img: faFolderOpen,
    ref: "shared-folders",
  },
  {
    name: "Images",
    img: faImages,
    ref: "shared-images",
  },
  {
    name: "Videos",
    img: faFileVideo,
    ref: "shared-videos",
  },
];

const PhotosNavBar = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col h-full w-[230px] bg-neutral-700 text-sm md:text-base">
      <h2 className="sm:text-2xl text-xl m-6">Photos</h2>
      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.slice(0, 3).map((l: linkForming, idx: number) => {
          return (
            <Link
              key={idx}
              className={`
                            relative flex items-center w-full p-2 pl-7 rounded-xl
                            hover:bg-neutral-800 hover:cursor-pointer opacity-80
                            ${pathName.includes(`/photos/${l.ref.toLowerCase()}`) && "bg-neutral-800"}
                            `}
              href={`${"/photos/" + l.ref}`}
            >
              <FontAwesomeIcon
                icon={l.img}
                width={17}
                height={17}
                style={{
                  color: pathName.includes(`/photos/${l.ref.toLowerCase()}`)
                    ? "#dd2c2c"
                    : "",
                }}
              />
              <p
                className={`ml-2 ${pathName.includes(`/cloud/${l.name.toLowerCase()}`) && "opacity-100"}`}
              >
                {l.name}
              </p>
            </Link>
          );
        })}
      </div>
      <h5 className="opacity-90 font-[600] tracking-wider text-neutral-300 p-5 text-[10px] md:text-xs">
        Shared Photos{" "}
      </h5>
      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.slice(3, 7).map((l: linkForming, idx: number) => {
          return (
            <a
              key={idx}
              className={`
                            relative flex items-center w-full p-2 pl-7 rounded-xl
                            hover:bg-neutral-800 hover:cursor-pointer
                            ${pathName.includes(`/home/${l.name}`) && "bg-neutral-800"}
                            `}
              href={`${pathName}/${l.ref.toLowerCase()}`}
            >
              {/* <Image
                                    src={l.img}
                                    alt={`${l.name} photo`}
                                    className="w-12 h-12 rounded-full object-cover"
                                    width={48}
                                    height={48}
                                /> */}
              <FontAwesomeIcon
                icon={l.img}
                className="opacity-80"
                width={17}
                height={17}
              />

              <p className="ml-2 opacity-80">{l.name}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosNavBar;

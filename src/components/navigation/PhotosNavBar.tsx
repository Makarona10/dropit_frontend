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
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

type linkForming = {
  name: string;
  img: IconDefinition;
  ref: string;
  num?: number;
};

const links = [
  {
    name: "Recently uploaded",
    img: faClock,
    ref: "recents",
  },
  // {
  //   name: "Uploaded last week",
  //   img: faClock,
  //   ref: "uploads",
  //   num: 7,
  // },
  // {
  //   name: "Uploaded last month",
  //   img: faClock,
  //   ref: "uploads",
  //   num: 30,
  // },
  // {
  //   name: "Uploaded last 6 months",
  //   img: faClock,
  //   ref: "uploads",
  //   num: 180,
  // },
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
];

const PhotosNavBar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const days = searchParams.get("days");

  return (
    <div className="flex flex-col h-full w-[230px] bg-neutral-700 text-sm md:text-base">
      <h2 className="sm:text-2xl text-xl m-6">Photos</h2>
      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.map((l: linkForming, idx: number) => {
          return (
            <Link
              key={idx}
              className={`
                            relative flex items-center w-full p-2 pl-7 rounded-xl
                            hover:bg-neutral-800 hover:cursor-pointer duration-200 opacity-80
              ${
                pathName.includes(`/photos/${l.ref.toLowerCase()}`) &&
                (days === l?.num?.toString() || (!days && !l?.num))
                  ? "bg-neutral-800"
                  : ""
              }
                            `}
              href={`/photos/${l.ref}${l?.num ? `?days=${l.num}` : ""}`}
            >
              <FontAwesomeIcon
                icon={l.img}
                width={17}
                height={17}
                style={{
                  color:
                    pathName.includes(`/photos/${l.ref.toLowerCase()}`) &&
                    (days === l?.num?.toString() || (!days && !l?.num))
                      ? "#dd2c2c"
                      : "",
                }}
              />
              <p
                className={`ml-2 ${pathName.includes(`/photos/${l.name.toLowerCase()}`) && "opacity-100"}`}
              >
                {l.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosNavBar;

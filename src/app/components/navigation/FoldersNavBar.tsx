import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
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
    name: "Personal folders",
    img: faFolder,
    ref: "recents",
  },
];

const FoldersNavBar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const days = searchParams.get("days");

  return (
    <div className="flex flex-col h-full w-[230px] bg-neutral-700 text-sm md:text-base">
      <h2 className="sm:text-2xl text-xl m-6">Folders</h2>
      <div className="flex flex-col w-10/12 mx-auto gap-[3px]">
        {links.map((l: linkForming, idx: number) => {
          return (
            <Link
              key={idx}
              className={`
                            relative flex items-center w-full p-2 pl-7 rounded-xl
                            hover:bg-neutral-800 hover:cursor-pointer opacity-80
              ${
                pathName.includes(`/folders/${l.ref.toLowerCase()}`) &&
                (days === l?.num?.toString() || (!days && !l?.num))
                  ? "bg-neutral-800"
                  : ""
              }
                            `}
              href={`/folders/${l.ref}${l?.num ? `?days=${l.num}` : ""}`}
            >
              <FontAwesomeIcon
                icon={l.img}
                width={17}
                height={17}
                style={{
                  color:
                    pathName.includes(`/folders/${l.ref.toLowerCase()}`) &&
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

export default FoldersNavBar;

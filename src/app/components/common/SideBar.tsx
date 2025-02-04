'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeNavbar from "../navigation/HomeNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, IconDefinition, faImage, faPhotoVideo } from "@fortawesome/free-solid-svg-icons"; 

type linksObject = {
    name: string,
    img: IconDefinition,
    ref: string
}

const mainlinks: linksObject[] = [
    {
        name: "cloud",
        img: faCloud,
        ref: 'cloud/recents'
    },
    {
        name: "photos",
        img: faImage,
        ref: 'photos'
    },
    {
        name: "videos",
        img: faPhotoVideo,
        ref: 'videos'
    }
];

type sideBarSelectios = {
    title: string
}

const SideBar = ({ title }: sideBarSelectios) => {
    const pathName = usePathname();
    return (
        <div className="relative h-screen flex left-0 h-full bg-neutral-800">
            <nav aria-label="Global" className="flex w-[70px] flex-col relative items-center">
                {mainlinks.map((l: linksObject, idx: number) => {
                    return (
                        <Link
                            key={idx}
                            className={`
                                flex flex-col justify-center items-center w-full h-[74px]
                                text-[12px] text-zinc-300 greyscale
                                hover:bg-black transition-all duration-100
                                ${pathName.includes(`/${l.name}`) && 'bg-black'}
                                `} href={'/'+l.ref}
                                >
                            <FontAwesomeIcon
                            className={`w-[30px] h-[30px] greyscale ${pathName.includes(`/${l.name}`) && 'bg-black greyscale'}`}
                            icon={l.img} style={{color: `${pathName.includes(`/${l.name}`) && '#c83c51'}`}}
                            />
                            <p className="mt-1 font-[500]">{l.name.charAt(0).toUpperCase() + l.name.slice(1)}</p>
                        </Link>
                    )
                })}
            </nav>
            {title === 'Cloud' && <HomeNavbar />}
        </div>
    )
}

export default SideBar;

'use client';
import { faEllipsisVertical, faShareNodes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuFolderPen } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";



type props = {
    id: number,
    fName: string,
    image: string,
    favourite: boolean
}

type option = {
    name: string,
    ico: IconType,
    // action: Function, => To be implemented
}

const opts: option[] = [
    {
        name: 'Download',
        ico: FaDownload,
    },
    {
        name: 'Share file',
        ico: RiUserSharedLine,
    },
    {
        name: 'Change directory',
        ico: LuFolderPen,
    },
    {
        name: 'Properties',
        ico: IoIosInformationCircleOutline,
    },
]

const FileComponent = ({ id, fName, image, favourite }: props) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [togFOpts, setTogFOpts] = useState<boolean>(false);
    const [LocalFavourite, setLocalFavourite] = useState(favourite);


    const toggleOptios = () => {
        setTogFOpts(!togFOpts);
    };

    const icons =
        [
            {
                ico: faTrash,
                func: null,
            },
            {
                ico: faShareNodes,
                func: null,
            },
            {
                ico: faEllipsisVertical,
                func: toggleOptios,
            }
        ];

    return (
        <div className="flex flex-col relative items-center bg-neutral-800 min-w-[200px] w-[200px] h-[200px] rounded-[15px] p-0 cursor-pointer select-none"
            
            onMouseLeave={() => { setHovered(() => false); setTogFOpts(false) }}
        >
            <div className="absolute left-1 top-1 flex justify-center items-center gap-4 p-1 w-9/12 h-9 bg-neutral-800/50 rounded-full duration-200"
                style={hovered ? { opacity: '100' } : { opacity: '0' }}>
                {icons.map((i, idx: number) => {
                    return (
                        <div key={idx} className="
                            flex justify-center items-center w-8 h-8 rounded-full
                            duration-150 hover:bg-neutral-900/50 cursor-pointer
                            "
                            onClick={() => i.func && i.func()}
                        >
                            <FontAwesomeIcon icon={i.ico} color="#DEDEDE" width={15} height={15} />
                        </div>
                    )
                })}
            </div>

            {/* The favourite star div */}
            <div className="absolute justify-center top-2 right-3"
                onClick={() => setLocalFavourite(!LocalFavourite)}
                title={`${LocalFavourite ? 'Remove from favourites' : 'Add to favourites'}`}
                >
                {
                    LocalFavourite ? (
                        <FaStar className="w-6 h-6" width={15} height={15} color="#c83c51" />
                    ) : (
                        <FaRegStar className="w-6 h-6" width={15} height={15} color="#c83c51" />
                    )
                }
            </div>

            {/* The toggled options menu of file component */}
            <div className={`absolute z-20 top-12 left-3 w-[155px] duration-200 ${!togFOpts && 'scale-0'}`}>
                <ul className="flex flex-col text-[12px] w-full gap-1 bg-neutral-800 text-neutral-100/50 rounded-lg">
                    {opts.map((o: option) => {
                        const Icon = o.ico;
                        return (
                            <li className="flex items-center p-2 duration-150 rounded-lg hover:bg-neutral-700 hover:text-neutral-100" key={o.name}>
                                <p>
                                    {o.name}
                                </p>
                                <Icon className="absolute right-2 w-4 h-4" />
                            </li>
                        )
                    })}
                </ul>
            </div>

            <img src={image}
                className="object-cover w-full h-full rounded-[15px]"
                onMouseEnter={() => setHovered(() => true)} />
            <div className="absolute bottom-0 w-full flex
                    items-center indent-3 text-sm bg-red-800 rounded-b-[15px]
                    duration-200"
                style={hovered ? { height: '36px' } : { height: '0px', opacity: '0' }}>
                {fName}
            </div>
        </div>
    )
}

export default FileComponent;
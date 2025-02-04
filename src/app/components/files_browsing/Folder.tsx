'use client';
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";


type FolderProps = {
    id: number,
    name: string,
    created_at: string,
    favourite: boolean
}

const Folder = ({ id, name, created_at, favourite }: FolderProps) => {
    const [toggleOpts, setToggleOpts] = useState<boolean>(false)

    const options = [
        {
            name: 'Add to favourites',
            func: null,
            ico: FaStar
        },
        {
            name: 'Share',
            func: null,
            ico: RiUserSharedLine
        },
        {
            name: 'Download',
            func: null,
            ico: FaDownload
        },
    ]

    return (
        <div className="flex flex-col relative items-center w-[250px] h-[100px] bg-neutral-800 rounded-xl
                    duration-100 hover:bg-neutral-900 active:bg-primary-700 cursor-pointer select-none"
            onMouseLeave={() => setToggleOpts(false)}
        >
            <div className="flex relative items-center w-full p-4 z-20">
                <FaFolder style={{ width: '24px', height: '24px' }} />
                <p className="flex w-full overflow-hidden text-ellipsis whitespace-nowrap text-[16px] text-neutral-300
                            font-semibold ml-3 select-none" title={name}>
                    {name}
                </p>
                <div className="flex items-center justify-center p-2 rounded-full duration-100 hover:bg-black active:bg-black" onClick={() => setToggleOpts(!toggleOpts)}>
                    <HiDotsVertical className="w-4 h-4" />
                </div>
                <div className="absolute top-0">
                    <ul className={`flex flex-col text-[12px] w-full gap-1 bg-neutral-800 text-neutral-100/50 rounded-lg duration-150 ${!toggleOpts && 'scale-0'}`}>
                        {options.map(o => {
                            const Icon = o.ico;
                            return (
                                <li key={o.name} className="flex items-center p-2 duration-150 rounded-lg hover:bg-neutral-700 hover:text-neutral-100">
                                    <p className="pr-6">
                                    {o.name}
                                    </p>
                                    <Icon className="absolute right-2 w-4 h-4" />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="flex items-center w-full p-3 pl-4 mt-1 border-t-[1px] border-neutral-600">
                <span className="flex w-full relative left-1 gap-[3px] items-center text-sm text-neutral-300/80">
                    <p className="relative top-[1px]">Created at:</p>
                    <p>{created_at}</p>
                    <span className="absolute right-2 p-[5px] rounded-full hover:bg-neutral-700 active:bg-black">
                        <MdDeleteForever title="delete tag"
                            className=" w-5 h-5 " />
                    </span>
                    <span className="absolute right-9 p-[5px] rounded-full hover:bg-neutral-700 active:bg-black">
                        <BiSolidEdit title="delete tag"
                            className="w-5 h-5 " />
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Folder;

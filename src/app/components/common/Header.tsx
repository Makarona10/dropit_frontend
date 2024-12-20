import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";


const Header = () => {
    return (
        <div className="flex bg-neutral-800 h-[60px] w-full">
            <div className="flex p-4 pl-10 w-[400px] lg:w-8/12 items-center">
                <FontAwesomeIcon width={15} height={15}
                className="relative opacity-60 left-[30px]"
                icon={faMagnifyingGlass} 
                />
                <input type="text" className="
                    bg-neutral-900 rounded-full h-[35px] w-full indent-[45px]
                    placeholder:text-sm placeholder:opacity-80 outline-0"
                    placeholder="Looking for something ... ?" />
            </div>
            <div className="flex relative items-center h-full w-full">
                <FontAwesomeIcon width={15} height={15}
                className="absolute lg:right-[230px] right-4"
                style={{color: 'Highlight', width: '20px', height: '20px', cursor: 'pointer'}}
                icon={faBell} />
                <div className="
                w-[28px] h-[28px] rounded-full cursor-pointer
                absolute lg:right-[160px] right-4
                ">
                    <Image src={'https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg'}
                     width={28} height={28}
                     className="object-cover w-full h-full rounded-full"
                     alt="No" />
                </div>
            </div>
        </div>
    )
}

export default Header;
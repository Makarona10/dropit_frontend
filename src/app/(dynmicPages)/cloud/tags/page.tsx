import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import Tag from "@/app/components/files_browsing/Tag";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaTags } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import HeadBtnsBar from "@/app/components/common/HeadBtnsBar";


const btns = [
    {
        name: 'Add tag',
        ico: IoMdAddCircleOutline,
        color: '#4AA927'
    },
    {
        name: 'Sort by name',
        ico: FaSort,
        color: '#D2D2D2'
    },
    {
        name: 'Sort by files',
        ico: FaSort,
        color: '#D2D2D2'
    },
]


const TagsPage = () => {
    return (
        <div className="flex">
            <SideBar title="Cloud" />
            <div className="flex flex-col w-full">
                <Header />
                <HeadBtnsBar buttons={btns}/>
                <div className="flex items-center gap-4 pt-10 pl-10">
                    <h1 className="text-2xl font-bold">Tags</h1>
                    <FaTags style={{ width: '21px', height: '21px' }} />
                </div>
                <div className="flex flex-wrap gap-5 p-8 w-full">
                    <Tag />
                    <Tag />
                    <Tag />
                    <Tag />
                    <Tag />
                    <Tag />
                    <Tag />
                </div>
            </div>
        </div>
    )
}

export default TagsPage;
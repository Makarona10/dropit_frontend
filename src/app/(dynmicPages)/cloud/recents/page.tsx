'use client';

import HeadBtnsBar from "@/app/components/common/HeadBtnsBar";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import Folder from "@/app/components/files_browsing/Folder";
import { FaSort } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdWatchLater, MdFileUpload, MdCreateNewFolder } from "react-icons/md";


const btns = [
    {
        name: 'Upload file',
        ico: MdFileUpload,
        color: '#4AA927'
    },
    {
        name: 'Create folder',
        ico: MdCreateNewFolder,
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

const RecentsPage = () => {
    return (
        <div className="flex">
            <SideBar title='Cloud' />
            <div className="flex flex-col w-full">
                <Header />
                <HeadBtnsBar buttons={btns} />
                <div className="flex items-center gap-4 pt-10 pl-10">
                    <h1 className="text-2xl font-bold">Recents</h1>
                    <MdWatchLater style={{ width: '21px', height: '21px' }} />
                </div>
                <hr className="mt-5 w-8/12 opacity-40 ml-8" />
                <div className="flex items-center gap-4 pt-10 pl-10">
                    <h1 className="text-2xl font-bold">Files</h1>
                </div>
                <div className="flex gap-3 p-8 flex-wrap">
                    <FileComponent
                        id={1}
                        image={'https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg'}
                        fName={'Ahmed Sayed Mizo'} favourite={true} />
                    <FileComponent id={2} favourite={true} image={'https://i.eurosport.com/2019/09/23/2682134-55464990-2560-1440.jpg'} fName={'Mr Carlito'} />
                    <FileComponent id={3} favourite={false} image={'https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg'} fName={'Ahmed Sayed Mizo'} />
                    <FileComponent id={4} favourite={true} image={'https://i.eurosport.com/2019/09/23/2682134-55464990-2560-1440.jpg'} fName={'Mr Carlito'} />
                </div>
                <hr className="mt-5 w-11/12 opacity-40 ml-8" />
                <div className="flex items-center gap-4 pt-10 pl-10">
                    <h1 className="text-2xl font-bold">Folders</h1>
                </div>
                <div className="flex gap-3 p-8 flex-wrap">
                    <Folder id={1} name="FCBarcelona" created_at="24-5-2020" />
                    <Folder id={2} name="Real Madrid CF" created_at="24-5-2020" />
                    <Folder id={3} name="FC Bayern Munchin" created_at="24-5-2020" />
                    <Folder id={4} name="Arsenal" created_at="24-5-2020" />
                    <Folder id={5} name="Man City" created_at="24-5-2020" />
                    <Folder id={6} name="Chelsea" created_at="24-5-2020" />
                    <Folder id={7} name="Roma FC" created_at="24-5-2020" />
                </div>
            </div>
        </div>
    )
}

export default RecentsPage;
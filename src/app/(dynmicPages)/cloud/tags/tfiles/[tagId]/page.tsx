"use client";

import Header from "@/app/components/common/Header";
import OrdAndFiltHead from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { useParams } from "next/navigation";
import { FaTags } from "react-icons/fa";

const TagFiles = () => {
  // const { tag_id } = useParams();

  return (
    <div className="flex w-full">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full flex items-center h-14 px-8 bg-neutral-800 border-t-[1px] border-neutral-100/10">
          <OrdAndFiltHead />
        </div>
        <div className="flex items-center gap-10 pt-10 pl-10">
          <div className="flex items-center gap-4 flex-nowrap">
            <h1 className="sm:text-2xl text-lg font-bold">Work related</h1>
            <FaTags className="text-primary-500 sm:w-[21px] sm:h-[21px] h-[16px] w-[16px]" />
          </div>
          <div className="flex sm:flex-row-reverse sm:w-8/12 sm:px-16">
            <PaginationButtons total={5} />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full sm:mt-4">
          <FileComponent
            id={1}
            image={
              "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg"
            }
            fName={"Ahmed Sayed Mizo"}
            favourite={true}
            type="video"
            resolution="1920 * 1080"
            uploaded="13/11/2023"
            size="990"
            owner="Bashs rostom"
            extenstion=".mp4"
            duration="22:31"
          />
          <FileComponent
            id={2}
            favourite={true}
            image={
              "https://i.eurosport.com/2019/09/23/2682134-55464990-2560-1440.jpg"
            }
            fName={"Mr Carlito"}
            type="image"
            resolution="1920 * 1080"
            uploaded="13/11/2023"
            size="12"
            owner="Adel Emam"
            extenstion="JPEG"
          />
          <FileComponent
            id={3}
            favourite={false}
            image={
              "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg"
            }
            fName={"Ahmed Sayed Mizo"}
            type="document"
            uploaded="1/9/2013"
            size="1"
            owner="Amr eldeeb"
            extenstion=".pdf"
          />
          <FileComponent
            id={4}
            favourite={true}
            image={
              "https://i.eurosport.com/2019/09/23/2682134-55464990-2560-1440.jpg"
            }
            fName={"Mr Carlito"}
            type="audio"
            uploaded="15/1/2021"
            size="90"
            owner="Hussain labib"
            extenstion=".mp3"
            duration="82:41"
          />
        </div>
      </div>
    </div>
  );
};

export default TagFiles;

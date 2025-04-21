"use client";
import Header from "@/app/components/common/Header";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { LuAudioLines, LuFileVideo, LuFilterX, LuImages } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { video_filter } from "../../utils";

const order: FT[] = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

const FavouritesPhotos = () => {
  return (
    <div className="flex">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-8 flex items-center h-14 bg-neutral-800 border-t-[1px] border-t-neutral-700/70">
          <OrdAndFiltHead order={order} filter={video_filter} />
        </div>
        <div className="flex items-center gap-3 pt-10 pl-10">
          <div className="sm:w-[300px] flex items-center gap-3">
            <h1 className="sm:text-2xl text-lg font-bold">Favourite Videos</h1>
            <FaStar
              style={{ width: "23px", height: "23px", color: "#A81C1C" }}
            />
          </div>
          <div className="w-full flex sm:flex-row-reverse sm:px-8 items-center">
            <PaginationButtons total={7} />
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-8 w-full">
          <FileComponent
            id={1}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
          <FileComponent
            id={2}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
          <FileComponent
            id={3}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
          <FileComponent
            id={4}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
          <FileComponent
            id={5}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
          <FileComponent
            id={6}
            fName="Vini Jr."
            image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
            size="88"
            type="image"
            owner="Mother"
            uploaded="15/7/2014"
            extenstion=".PNG"
            resolution="1446 * 800"
            favourite={false}
          />
        </div>
      </div>
    </div>
  );
};

export default FavouritesPhotos;

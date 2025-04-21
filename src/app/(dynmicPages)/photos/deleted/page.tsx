"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import Folder from "@/app/components/files_browsing/Folder";
import OrdAndFiltHead, { FT } from "@/app/components/common/Ord&FiltHead";
import { LuAudioLines, LuFileVideo, LuFilterX, LuImages } from "react-icons/lu";
import { IoDocumentText } from "react-icons/io5";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";
import { photo_filter } from "../recents/page";

const order: FT[] = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

const DeletedPhotos = () => {
  return (
    <div className="flex h-full w-full ">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead filter={photo_filter} order={order} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex gap-3 items-center">
            <div className="sm:w-[280px] gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p>Your Photos Bin</p>
              <FontAwesomeIcon
                width={18}
                height={18}
                icon={faTrash}
                className="text-primary-500"
              />
            </div>
            <div className="w-full flex items-center flex-row-reverse">
              <PaginationButtons total={4} />
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-5">
            <FileComponent
              id={1}
              fName="Vini Jr."
              image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
              favourite={true}
              resolution="1444 * 900"
              extenstion="JPG"
              uploaded="12/4/2020"
              owner="Hanzala"
              type="image"
              size="44"
            />

            <FileComponent
              id={2}
              fName="Vini Jr."
              image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
              favourite={true}
              resolution="1444 * 900"
              extenstion="JPG"
              uploaded="12/4/2020"
              owner="Hanzala"
              type="image"
              size="44"
            />
            <FileComponent
              id={3}
              fName="Vini Jr."
              image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
              favourite={true}
              resolution="1444 * 900"
              extenstion="JPG"
              uploaded="12/4/2020"
              owner="Hanzala"
              type="image"
              size="44"
            />
            <FileComponent
              id={4}
              fName="Vini Jr."
              image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
              favourite={true}
              resolution="1444 * 900"
              extenstion="JPG"
              uploaded="12/4/2020"
              owner="Hanzala"
              type="image"
              size="44"
            />
            <FileComponent
              id={5}
              fName="Vini Jr."
              image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
              favourite={true}
              resolution="1444 * 900"
              extenstion="JPG"
              uploaded="12/4/2020"
              owner="Hanzala"
              type="image"
              size="44"
            />
          </div>
          <hr className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default DeletedPhotos;

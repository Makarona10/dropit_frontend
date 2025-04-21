"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faImage, faImages, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import Folder from "@/app/components/files_browsing/Folder";
import OrdAndFiltHead from "@/app/components/common/Ord&FiltHead";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { LuImages } from "react-icons/lu";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";

const order = [
  { name: "Newest", ico: BiUpArrowAlt },
  { name: "Oldest", ico: BiDownArrowAlt },
];

export const photo_filter = [
  {
    name: "PNG",
  },
  {
    name: "JPG/JPEG",
  },
  {
    name: "GIF",
  },
  {
    name: "ICO",
  },
  {
    name: "OTHERS",
  },
];

const Photos = () => {
  return (
    <div className="flex h-full w-full ">
      <SideBar title="Photos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead order={order} filter={photo_filter} />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="w-full flex items-center ">
            <div className="w-80 gap-3 flex items-center sm:text-2xl text-lg font-bold">
              <p className="">Uploaded Photos</p>
              <FontAwesomeIcon
                width={30}
                height={30}
                icon={faImages}
                className="text-white"
              />
            </div>
            <div className="w-full flex flex-row-reverse">
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

export default Photos;

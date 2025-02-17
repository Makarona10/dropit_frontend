"use client";
import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import Folder from "@/app/components/files_browsing/Folder";
import OrdAndFiltHead from "@/app/components/common/Ord&FiltHead";

const Deleted = () => {
  return (
    <div className="flex h-full w-full ">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center w-full h-14 bg-neutral-800 border-t-neutral-700/70 border-t-[1px] px-8 gap-8">
          <OrdAndFiltHead />
        </div>
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="flex gap-3 items-center sm:text-2xl text-lg font-bold">
            <p>Your personal trash bin</p>
            <FontAwesomeIcon
              width={18}
              height={18}
              icon={faTrash}
              className="text-primary-500"
            />
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
          <div className="text-2xl font-bold">Folders</div>
          <div className="flex flex-wrap gap-8">
            <Folder name="Just folder" created_at="4/8/2025" />
            <Folder name="Just folder" created_at="4/8/2025" />
            <Folder name="Just folder" created_at="4/8/2025" />
            <Folder name="Just folder" created_at="4/8/2025" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deleted;

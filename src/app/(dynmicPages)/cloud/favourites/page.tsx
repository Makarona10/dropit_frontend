import Header from "@/app/components/common/Header";
import OrdAndFiltHead from "@/app/components/common/Ord&FiltHead";
import SideBar from "@/app/components/common/SideBar";
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { FaStar } from "react-icons/fa";
import PaginationButtons from "@/app/components/pagination_btns/PaginationComp";

const FavouritesPage = () => {
  return (
    <div className="flex">
      <SideBar title="Cloud" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="w-full px-8 flex items-center h-14 bg-neutral-800 border-t-[1px] border-t-neutral-700/70">
          <OrdAndFiltHead />
        </div>
        <div className="flex items-center gap-4 pt-10 pl-10">
          <h1 className="sm:text-2xl text-lg font-bold">Favourites</h1>
          <FaStar style={{ width: "23px", height: "23px", color: "#A81C1C" }} />
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

export default FavouritesPage;

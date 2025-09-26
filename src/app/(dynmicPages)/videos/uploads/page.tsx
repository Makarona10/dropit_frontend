"use client";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileComponent from "@/components/files_browsing/FileComponent";

const VideosUploads = () => {
  return (
    <div className="flex h-full w-full ">
      <SideBar title="Videos" />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col flex-wrap p-8 gap-8 w-full">
          <div className="flex gap-3 items-center sm:text-2xl text-lg font-bold">
            <p>Uploaded Videos</p>
            <FontAwesomeIcon
              width={30}
              height={30}
              icon={faVideo}
              className="text-white"
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
        </div>
      </div>
    </div>
  );
};

export default VideosUploads;

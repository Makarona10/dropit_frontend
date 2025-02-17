import { IconType } from "react-icons";
import { FaDownload } from "react-icons/fa6";
import { RiUserSharedLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";

type Btn = {
  ico: IconType;
  name: string;
  action: Function;
};

const icons: Btn[] = [
  { ico: FaDownload, name: "Download", action: () => {} },
  {
    ico: RiUserSharedLine,
    name: "Share",
    action: () => {},
  },
  {
    ico: FaStar,
    name: "Add to favourite",
    action: () => {},
  },
];

const ImagePreviewer = () => {
  return (
    <div className="w-full flex flex-col gap-5 p-10 min-h-screen items-center">
      <div className="flex items-center w-full sm:px-28 text-xl gap-4">
        <div
          className="mr-64 cursor-pointer p-3 rounded-full hover:bg-white/10"
          title="Go back"
        >
          <IoMdArrowRoundBack />
        </div>

        <div className="flex gap-4 m-auto">
          {icons.map((b: Btn, idx: number) => {
            const Icon = b.ico;
            return (
              <div
                key={idx}
                className="p-3 hover:bg-white/10 cursor-pointer rounded-full"
                title={b.name}
              >
                <Icon />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center my-auto sm:max-w-10/12 h-full p-5">
        <Image
          src={
            "https://www.kingfut.com/wp-content/uploads/2025/02/image-5-680x454.png"
          }
          width={3840}
          height={2160}
          alt={"Picture"}
          className="rounded-lg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewer;

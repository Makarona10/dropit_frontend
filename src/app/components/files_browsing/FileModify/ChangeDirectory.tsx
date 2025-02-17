import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

type FileProps = {
  id: string;
};

const ChangeDirectoryOverlay = ({ id }: FileProps) => {
  const [path, setPath] = useState<string>(""); // will hold the path of the current folder that is user in
  const divRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="fixed m-auto h-screen inset-0 select-text cursor-default
      flex items-center justify-center bg-black bg-opacity-50 z-50   
      transition duration-300 invisible"
      id={id}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Change directory
        </h1>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="sm:text-base text-sm font-bold py-4">Folders</h1>
            <div className="flex flex-col gap-5 sm:max-h-[500px] max-h-[350px] overflow-auto">
              <div className="flex items-center gap-3 sm:text-sm text-xs hover:underline cursor-pointer">
                <FontAwesomeIcon icon={faFolder} />
                <p>Security materials</p>
              </div>
              <div className="flex items-center gap-3 sm:text-sm text-xs hover:underline cursor-pointer">
                <FontAwesomeIcon icon={faFolder} />
                <p>Valorant haters</p>
              </div>
              <div className="flex items-center gap-3 sm:text-sm text-xs hover:underline cursor-pointer">
                <FontAwesomeIcon icon={faFolder} />
                <p>Why always me</p>
              </div>
              <div className="flex items-center gap-3 sm:text-sm text-xs hover:underline cursor-pointer">
                <FontAwesomeIcon icon={faFolder} />
                <p>Why always me</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-2 sm:text-sm text-xs mt-5">
          <button className="bg-green-600 active:bg-green-700 p-2 rounded-md">
            Create a new folder
          </button>
          <button
            className="bg-primary-600 active:bg-primary-700 p-2 rounded-md"
            onClick={() => {
              const element = document.getElementById(id);
              if (element) {
                element.style.visibility = "hidden";
                element.style.opacity = "0";
              }
            }}
          >
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDirectoryOverlay;

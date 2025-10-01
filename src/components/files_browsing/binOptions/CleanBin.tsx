import { useApi } from "@/lib/useApi";
import { useEffect, useRef, useState } from "react";
import { IoIosWarning } from "react-icons/io";

const id = "clean_bin_div";

const CleanBin = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");
  const { api } = useApi();

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      const element = document.getElementById(id);
      if (element) {
        element.style.visibility = "hidden";
        element.style.opacity = "0";
      }
    }
  };

  const deleteRequest = async () => {
    try {
      const res = await api(`/bin/clean-bin`, "delete");
      if (res.status === 200) window.location.reload();
    } catch (error: any) {
      setError(error?.response?.data?.message);
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
      onClick={(e) => e.stopPropagation()}
    >
      <div className="fixed inset-0 bg-white/10 p-6 shadow-lg overflow-auto"></div>
      <div
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-xl border-[1px] border-white/30"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <h1 className="sm:text-xl text-base font-bold pb-3 border-b-[1px] border-neutral-300/30">
          Clean bin
        </h1>
        <div className="flex flex-col items-center gap-2 mt-4">
          <IoIosWarning className="text-primary-500 sm:text-4xl text-lg" />
          <p className="sm:text-base text-sm font-medium">
            All files in your bin will be deleted forever, no look back.
          </p>
        </div>
        {error && (
          <div className="text-sm text-primary-600">
            {error || "Error happened!"}
          </div>
        )}
        <div className="flex flex-row-reverse gap-2 sm:text-sm text-xs mt-5">
          <button
            className="bg-green-600 active:bg-green-700 p-2 rounded-md"
            onClick={() => deleteRequest()}
          >
            Confirm
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

export default CleanBin;

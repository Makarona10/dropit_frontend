"use client";
import { useRef, useEffect } from "react";
import { FaTags } from "react-icons/fa6";

const AddTag = () => {
  const id = "add_tag";
  const divRef = useRef<HTMLDivElement>(null);

  const hideDiv = () => {
    const element = document.getElementById(id);
    if (element) {
      element.style.visibility = "hidden";
      element.style.opacity = "0";
    }
  };

  const handleOutsideClick = (event: any) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      hideDiv();
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
        className="flex flex-col sm:w-[450px] bg-black p-6 rounded-lg gap-6"
        style={{ zIndex: 2 }}
        ref={divRef}
      >
        <div className="flex items-center gap-3 sm:text-lg text-sm font-bold">
          <h1>Write a name for your tag</h1>
          <FaTags />
        </div>

        <div className="w-full">
          <input
            className="w-full indent-2 p-2 outline-none border-0 ring-offset-none text-neutral-950
                       rounded-lg text-xs sm:text-base"
            type="text"
            placeholder="Tag name"
          />
        </div>
        <div className="flex flex-row-reverse items-center gap-2 sm:text-sm text-xs">
          <button className="p-2 bg-green-600 rounded-lg active:bg-green-700">
            Confirm
          </button>
          <button
            className="p-2 bg-neutral-700 rounded-lg active:bg-neutral-800"
            onClick={() => hideDiv()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTag;

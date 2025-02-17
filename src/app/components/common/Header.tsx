"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState } from "react";

type m_btn = {
  name: string;
  ref: string;
};

const menu_buttons: m_btn[] = [
  {
    name: "Settings",
    ref: "account-settings",
  },
  {
    name: "Logout",
    ref: "",
  },
];

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col-reverse items-start justify-start
      sm:grid sm:grid-cols-2
      bg-neutral-800 py-2 w-full"
    >
      <div className="flex w-[270px] sm:w-[400px] items-center ">
        <FontAwesomeIcon
          width={15}
          height={15}
          className="relative opacity-60 left-[30px]"
          icon={faMagnifyingGlass}
        />
        <input
          type="text"
          className="bg-neutral-900 rounded-full h-[35px] w-full indent-[45px]
                     placeholder:text-xs sm:placeholder:text-sm placeholder:opacity-80
                     outline-none border-0"
          placeholder="Looking for something ... ?"
        />
      </div>
      <div className="flex justify-start sm:justify-end gap-9 relative items-center px-5 lg:px-16 sm:pb-0 pb-5 h-full w-full">
        <FontAwesomeIcon
          width={15}
          height={15}
          className=""
          style={{
            color: "Highlight",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
          icon={faBell}
        />
        <div
          className="
                w-[28px] h-[28px] rounded-full cursor-pointer
                "
        >
          <Image
            src={
              "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg"
            }
            width={28}
            height={28}
            className="object-cover w-full h-full rounded-full"
            alt="No"
            onClick={() => setToggle(!toggle)}
          />
          {toggle && (
            <div
              className="
                         flex flex-col relative p-2
                         w-[300px] right-[110px] sm:right-[240px] top-[10px] z-20
                         rounded-xl bg-neutral-900 cursor-default
                        "
            >
              <div className="flex h-[100px] border-b-[1px] border-zinc-600">
                <div className="w-[100px] flex justify-center items-center">
                  <img
                    src={
                      "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg"
                    }
                    className="object-cover w-[70px] h-[70px] rounded-xl"
                    alt="profile picture"
                  />
                </div>
                <div className="flex flex-col w-[200px] p-3">
                  <h2 className="text-slate-200">Ahmed Abdelnaby</h2>
                  <h3 className="text-[#868687] text-sm">
                    ahmedneyssi@gmail.com
                  </h3>
                </div>
              </div>
              <div className="flex flex-col mt-2 p-1 text-[14px] text-[#ADADAE]">
                {menu_buttons.map((b: m_btn, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="
                                        flex items-center w-full p-2 rounded-lg
                                        duration-200 hover:bg-neutral-600 hover:text-[#D6D5D6]"
                    >
                      {b.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

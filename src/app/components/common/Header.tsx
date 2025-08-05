"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type m_btn = {
  name: string;
  action: Function;
};
const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [info, setInfo] = useState({
    loading: true,
    info: {
      name: "",
      email: "",
    },
    error: "",
  });

  const menu_buttons: m_btn[] = [
    {
      name: "Account info",
      action: () => {
        router.push("/me");
      },
    },
    {
      name: "Logout",
      action: async () => {
        const token = localStorage.getItem("access_token");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.status === 201) {
          localStorage.removeItem("access_token");
          router.push("/user/login");
        }
      },
    },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (res.data.statusCode === 200) {
          const fname = res.data.data.firstName;
          const lname = res.data.data.lastName;
          const email = res.data.data.email;
          setInfo({
            loading: false,
            error: "",
            info: {
              name: fname + " " + lname,
              email,
            },
          });
          sessionStorage.setItem("name", fname + " " + lname);
          sessionStorage.setItem("email", email);
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("accessToken");
          router.push("/user/login");
        }
      }
    };

    let name = sessionStorage.getItem("name");
    let email = sessionStorage.getItem("email");
    if (!name || !email) {
      try {
        fetchUserInfo();
      } catch {}
    } else {
      setInfo({
        loading: false,
        error: "",
        info: {
          name: name || "",
          email: email || "",
        },
      });
    }
  }, []);

  return (
    <div
      className="flex flex-col-reverse items-start justify-start
      sm:grid sm:grid-cols-2
      bg-neutral-800 py-2 w-full"
    >
      <div className="flex items-center sm:px-6 px-2 sm:gap-4">
        <a href="/cloud/recents" className="w-12 h-12">
          <Image
            alt="dropit logo"
            src={"/redlogo.png"}
            width={250}
            height={250}
            className="min-w-12 min-h-12"
          />
        </a>
        <form
          className="flex w-[240px] sm:w-[400px] items-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?ss=${searchRef.current?.value}`);
          }}
        >
          <FontAwesomeIcon
            width={15}
            height={15}
            className="relative opacity-60 left-[30px]"
            icon={faMagnifyingGlass}
          />
          <input
            ref={searchRef}
            type="text"
            className="bg-neutral-900 rounded-full h-[35px] w-full indent-[45px]
                     placeholder:text-xs sm:placeholder:text-sm placeholder:opacity-80
                     outline-none border-0"
            placeholder="Looking for something ... ?"
          />
        </form>
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
            src={"/Sample_User_Icon.png"}
            width={28}
            height={28}
            className="object-cover w-full h-full rounded-full bg-slate-100"
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
                  {/* <img */}
                  {/*   src={ */}
                  {/*     "https://www.kingfut.com/wp-content/uploads/2020/11/Zizo-1-scaled.jpg" */}
                  {/*   } */}
                  {/*   className="object-cover w-[70px] h-[70px] rounded-xl" */}
                  {/*   alt="profile picture" */}
                  {/* /> */}
                  <div className="relative w-16 h-16 rounded-full bg-neutral-300 text-4xl text-primary-500">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
                      {info?.info?.name[0]?.toUpperCase() || ".."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-[200px] p-3">
                  {info?.info?.name && (
                    <h2 className="text-slate-200">{info.info.name}</h2>
                  )}
                  {!info?.info?.name && (
                    <span className="loading loading-spinner text-error"></span>
                  )}
                  {info?.info?.email && (
                    <h3 className="text-[#868687] text-sm">
                      {info.info.email}
                    </h3>
                  )}
                  {!info?.info?.email && (
                    <span className="loading loading-spinner text-error"></span>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-2 p-1 text-[14px] text-[#ADADAE]">
                {menu_buttons.map((b: m_btn, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="
                                        flex items-center w-full p-2 rounded-lg
                                        duration-200 bg-transparent hover:bg-neutral-600 hover:text-white/90
                                        cursor-pointer"
                      onClick={() => b.action()}
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

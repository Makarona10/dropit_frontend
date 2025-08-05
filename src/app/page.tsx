"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pullUpVariant = {
  initial: {
    x: 20,
    opacity: 0,
    color: "#ffffff",
  },
  show: (i: number) => ({
    x: 0,
    opacity: 1,
    color: ["#FF0000", "#9C2611", "#EBF7EB"],
    transition: {
      delay: i * 0.05,
    },
  }),
};

const buttonAnimation = {
  initial: {
    y: 5,
    opacity: 0,
  },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
    },
  }),
};

export default function Home() {
  const part1 = "👋 Welcome to DROPIT";
  const st1_point = "1. Where you can securely store your files";
  const nd2_point =
    "2. Structure your files and folders the way whatever you like.";
  const rd3_point = "3. Download your files whenever needed.";
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) router.replace("/cloud/recents");
    else setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) return null;
  return (
    <div className="w-full h-full">
      <div className="fixed inset-0 bg-[url('/cover.jpeg')] bg-cover bg-center bg-no-repeat z-[-1]"></div>
      <div className="flex flex-col sm:px-16 px-5 relative top-10 text-[20px] font-bold">
        <div className="flex flex-col sm:w-6/12">
          <div className="flex flex-wrap mt-12 py-5">
            {part1.split(" ").map((word, idx) => (
              <motion.h1
                key={"p1-" + idx}
                custom={idx}
                variants={pullUpVariant}
                initial="initial"
                animate="show"
                className="tracking-tighter ml-1 sm:text-4xl text-xl"
              >
                {word}
              </motion.h1>
            ))}
          </div>
          <br />
          <ul className="sm:text-lg text-sm">
            <li>
              <div className="flex flex-wrap break-normal">
                {st1_point.split(" ").map((word, idx) => (
                  <motion.h1
                    key={"p2-" + idx}
                    custom={idx + part1.length}
                    variants={pullUpVariant}
                    initial="initial"
                    animate="show"
                    className="ml-1"
                  >
                    {word}
                  </motion.h1>
                ))}
              </div>
            </li>

            <li>
              <div className="flex flex-wrap break-normal">
                {nd2_point.split(" ").map((word, idx) => (
                  <motion.h1
                    key={"p2-" + idx}
                    custom={idx + part1.length}
                    variants={pullUpVariant}
                    initial="initial"
                    animate="show"
                    className="ml-1"
                  >
                    {word}
                  </motion.h1>
                ))}
              </div>
            </li>
            <li>
              <div className="flex flex-wrap break-normal">
                {rd3_point.split(" ").map((word, idx) => (
                  <motion.h1
                    key={"p2-" + idx}
                    custom={idx + part1.length}
                    variants={pullUpVariant}
                    initial="initial"
                    animate="show"
                    className="ml-1"
                  >
                    {word}
                  </motion.h1>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex flex-col gap-5 sm:w-96">
          <motion.button
            custom={part1.length * 2}
            variants={buttonAnimation}
            initial="initial"
            animate="show"
            className="flex flex-nowrap items-center gap-3 transition-colors duration-300 bg-neutral-800/50 text-neutral-200 text-base p-3 rounded-full border-[1px] border-transparent hover:bg-primary-400 hover:border-neutral-100"
            onClick={() => window.location.replace("/user/login")}
          >
            🗂️
            <p>Start browing your own files</p>
          </motion.button>
          <motion.button
            custom={part1.length * 2 + 4}
            variants={buttonAnimation}
            initial="initial"
            animate="show"
            className="flex flex-nowrap transition-colors duration-300 items-center gap-3 bg-neutral-800/50 text-neutral-200 text-base p-3 rounded-full border-[1px] border-transparent hover:bg-blue-500 hover:border-neutral-100"
            onClick={() => window.location.replace("/user/register")}
          >
            👤➕
            <p>Create an account</p>
          </motion.button>
          <motion.button
            custom={part1.length * 2 + 6}
            variants={buttonAnimation}
            initial="initial"
            animate="show"
            className="flex flex-nowrap items-center gap-3  transition-colors duration-300 bg-neutral-800/50 text-neutral-200 text-base p-3 rounded-full border-[1px] border-transparent hover:bg-blue-500 hover:border-neutral-100"
            onClick={() => window.location.replace("/user/login")}
          >
            🔑👤
            <p>Login with your account</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

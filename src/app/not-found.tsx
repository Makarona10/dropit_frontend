"use client";

import Link from "next/link";
import Header from "./components/common/Header";

export default function Custom404() {
  return (
    <div className="w-full text-center">
      <Header />
      <div className="text-xl relative mt-64">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you’re looking for does not exist.</p>
        <Link href="/">
          <span className="inline-flex gap-2 mt-5 text-primary-500 text-lg border-b-2 border-primary-500 hover:border-b-0">
            <span className="font-extrabold">&#8592;</span>{" "}
            <span>Go back home</span>{" "}
          </span>
        </Link>
      </div>
    </div>
  );
}

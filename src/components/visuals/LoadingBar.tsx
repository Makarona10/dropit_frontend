"use client";
import React from "react";

interface _Props {
  title?: string;
}

const LoadingBar = ({ title }: _Props) => {
  return (
    <>
      <div className="w-full  bg-gray-200 overflow-hidden rounded-full flex flex-col">
        <div className="h-2 bg-primary-600 animate-loading-bar" />
      </div>
      <div className="w-full mt-2">
        <p className="sm:text-sm text-xs text-center font-semibold">{title}</p>
      </div>
    </>
  );
};

export default LoadingBar;

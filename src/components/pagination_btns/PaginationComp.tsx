"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const btnStyle = `sm:text-2xl text-lg flex items-center justify-center text-center
  hover:bg-white/20 active:bg-white/20 cursor-pointer rounded-full size-8 select-none`;

type _Props = { total: number };

const PaginationButtons = ({ total }: _Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }, [total]);

  return (
    <div className="flex items-center sm:gap-2 gap-1">
      <div
        className={`${btnStyle} ${currentPage <= 1 && "opacity-70"}`}
        onClick={() => {
          if (currentPage > 1) handlePageChange(currentPage - 1);
        }}
      >
        {"<"}
      </div>
      <div className="flex items-center sm:text-base text-xs">
        <p>{currentPage}</p>-<p>{total}</p>
      </div>
      <div
        className={`${btnStyle} ${currentPage >= total && "opacity-70"}`}
        onClick={() => {
          if (currentPage < total) return handlePageChange(currentPage + 1);
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default PaginationButtons;

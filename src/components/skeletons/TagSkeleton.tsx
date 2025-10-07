const TagSkeleton = () => {
  return (
    <div className="w-[110px] h-[70px] sm:w-[260px] sm:h-[100px] rounded-xl animate-pulse">
      <div className="w-full flex items-center sm:h-[70px] bg-neutral-800 rounded-t-xl">
        <div className="ml-5 w-1/2 h-8 rounded-lg bg-neutral-700" />
      </div>
      <div className="flex items-center sm:h-[40px] h-[96px] bg-neutral-700 rounded-b-xl w-full">
        <div className="w-2/3 h-6 ml-5 rounded-lg bg-neutral-800" />
      </div>
    </div>
  );
};

export default TagSkeleton;

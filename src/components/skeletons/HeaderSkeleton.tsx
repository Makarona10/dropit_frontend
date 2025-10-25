const HeaderSkeleton = () => {
  return (
    <div
      className="flex items-center h-16
      bg-neutral-800 w-full animate-pulse"
    >
      <div className="sm:w-full w-[220px] sm:ml-20 ml-4 h-9 rounded-full bg-neutral-700"></div>
      <div className="flex flex-row-reverse flex-1 sm:px-10 pr-4">
        <div className="w-10 h-10 rounded-full bg-neutral-700"></div>
      </div>
    </div>
  );
};

export default HeaderSkeleton;

const SharedFileSkeleton = () => {
  return (
    <div className="w-full p-5 flex items-center sm:h-[120px] h-[80px] rounded-xl bg-neutral-800 animate-pulse">
      <div className="w-16 flex items-center sm:h-[70px] h-[40px] bg-neutral-700 rounded-lg"></div>
      <div className="sm:w-56 w-full flex items-center sm:h-[45px] h-[40px] bg-neutral-700 rounded-lg sm:ml-10 ml-3"></div>
    </div>
  );
};

export default SharedFileSkeleton;

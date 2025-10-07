const FileSkeleton = () => {
  return (
    <div className="w-[110px] h-[110px] sm:w-[200px] sm:h-[200px] rounded-xl animate-pulse">
      <div className="w-full sm:h-[164px] aspect-[5/4] bg-neutral-800 rounded-t-xl" />
      <div className="sm:h-[36px] h-6 bg-neutral-700 rounded-b-xl w-full" />
    </div>
  );
};

export default FileSkeleton;

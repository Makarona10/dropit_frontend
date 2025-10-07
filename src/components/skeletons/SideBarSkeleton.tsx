const SideBarSkeleton = () => {
  return (
    <div
      className="min-h-screen sm:min-w-[70px] min-w-[60px] max-h-full py-3
      flex flex-col items-center gap-4 bg-neutral-800 animate-pulse"
    >
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
      <div className="h-10 w-10 rounded-full bg-neutral-700"></div>
    </div>
  );
};

export default SideBarSkeleton;

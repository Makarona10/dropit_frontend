const NavBarSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen h-full min-w-[230px] gap-[5px] bg-neutral-700 animate-pulse">
      <div className="w-1/2 h-8 rounded-lg bg-neutral-600 m-6"></div>
      <div className="w-10/12 h-9 ml-7 rounded-lg bg-neutral-600 "></div>
      <div className="w-10/12 h-9 ml-7 rounded-lg bg-neutral-600 "></div>
      <div className="w-10/12 h-9 ml-7 rounded-lg bg-neutral-600 "></div>
      <div className="w-10/12 h-9 ml-7 rounded-lg bg-neutral-600 "></div>
    </div>
  );
};

export default NavBarSkeleton;

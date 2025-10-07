import HeaderSkeleton from "@/components/skeletons/HeaderSkeleton";
import SideBarSkeleton from "@/components/skeletons/SideBarSkeleton";
import NavBarSkeleton from "../NavBarSkeleton";
import FolderSkeleton from "../FolderSkeleton";

const FolderSkeletonPage = () => {
  return (
    <div className="flex h-full w-full">
      <SideBarSkeleton />
      <div className="sm:block hidden">
        <NavBarSkeleton />
      </div>
      <div className="w-full h-full flex flex-col">
        <HeaderSkeleton />
        <div className="w-full h-full flex flex-wrap gap-10 p-10 mt-10">
          {Array.from({ length: 10 }, (_, index) => (
            <FolderSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderSkeletonPage;

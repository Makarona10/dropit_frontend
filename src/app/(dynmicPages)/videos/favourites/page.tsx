import { Suspense } from "react";
import FavouriteVideos from "@/components/pages/videos/Favourites";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function FavouriteVideosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <FavouriteVideos />
    </Suspense>
  );
}

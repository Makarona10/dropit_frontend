import { Suspense } from "react";
import FavouritesPhotos from "@/components/pages/photos/Favourites";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function FavouritesPhotosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <FavouritesPhotos />
    </Suspense>
  );
}

import { Suspense } from "react";
import Favourites from "@/components/pages/cloud/Favourites";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function FavouritesPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <Favourites />
    </Suspense>
  );
}

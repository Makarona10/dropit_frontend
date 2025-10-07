import { Suspense } from "react";
import Photos from "@/components/pages/photos/Recents";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function PhotosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <Photos />
    </Suspense>
  );
}

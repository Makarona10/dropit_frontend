import { Suspense } from "react";
import DeletedPhotos from "@/components/pages/photos/Deleted";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function DeletedPhotosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <DeletedPhotos />
    </Suspense>
  );
}

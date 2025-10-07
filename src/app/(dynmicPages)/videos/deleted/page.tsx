import { Suspense } from "react";
import DeletedVideos from "@/components/pages/videos/Deleted";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function DeletedVideosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <DeletedVideos />
    </Suspense>
  );
}

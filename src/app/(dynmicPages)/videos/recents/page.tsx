import { Suspense } from "react";
import Videos from "@/components/pages/videos/Recents";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function VideosPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <Videos />
    </Suspense>
  );
}

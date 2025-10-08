import { Suspense } from "react";
import SharedFilesSkeletonPage from "@/components/skeletons/pages/SharedFilesPageSkeleton";
import SharedVideosComponent from "@/components/pages/cloud/shared/Videos";

export default function SharedVideosPage() {
  return (
    <Suspense fallback={<SharedFilesSkeletonPage />}>
      <SharedVideosComponent />
    </Suspense>
  );
}

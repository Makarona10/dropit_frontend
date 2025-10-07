import { Suspense } from "react";
import SharedFoldersComponent from "@/components/pages/cloud/shared/Folders";
import SharedFilesSkeletonPage from "@/components/skeletons/pages/SharedFilesPageSkeleton";

export default function SharedFoldersPage() {
  return (
    <Suspense fallback={<SharedFilesSkeletonPage />}>
      <SharedFoldersComponent />
    </Suspense>
  );
}

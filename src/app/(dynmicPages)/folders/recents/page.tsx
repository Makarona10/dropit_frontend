import { Suspense } from "react";
import RecentFolders from "@/components/pages/folders/recents";
import FolderSkeletonPage from "@/components/skeletons/pages/FoldersPageSkeleton";

export default function RecentFoldersPage() {
  return (
    <Suspense fallback={<FolderSkeletonPage />}>
      <RecentFolders />
    </Suspense>
  );
}

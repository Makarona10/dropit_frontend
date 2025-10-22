import { Suspense } from "react";
import SharedFilesSkeletonPage from "@/components/skeletons/pages/SharedFilesPageSkeleton";
import SharedFilesComponent from "@/components/pages/cloud/shared/Files";

export default function SharedFilesPage() {
  return (
    <Suspense fallback={<SharedFilesSkeletonPage />}>
      <SharedFilesComponent />
    </Suspense>
  );
}

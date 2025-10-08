import { Suspense } from "react";
import SharedFilesSkeletonPage from "@/components/skeletons/pages/SharedFilesPageSkeleton";
import SharedImagesComponent from "@/components/pages/cloud/shared/Images";

export default function SharedImagesPage() {
  return (
    <Suspense fallback={<SharedFilesSkeletonPage />}>
      <SharedImagesComponent />
    </Suspense>
  );
}

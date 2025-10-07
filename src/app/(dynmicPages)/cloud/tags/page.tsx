import { Suspense } from "react";
import Tags from "@/components/pages/cloud/tags/tags";
import TagsSkeletonPage from "@/components/skeletons/pages/FoldersPageSkeleton";

export default function TagsPage() {
  return (
    <Suspense fallback={<TagsSkeletonPage />}>
      <Tags />
    </Suspense>
  );
}

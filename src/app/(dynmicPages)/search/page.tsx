import { Suspense } from "react";
import SearchResult from "@/components/pages/search";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function SearchResultPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <SearchResult />
    </Suspense>
  );
}

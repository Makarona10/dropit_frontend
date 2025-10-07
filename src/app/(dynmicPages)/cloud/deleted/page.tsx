import { Suspense } from "react";
import Deleted from "@/components/pages/cloud/Deleted";
import FilesSkeletonPage from "@/components/skeletons/pages/FilesPageSkeleton";

export default function DeletedPage() {
  return (
    <Suspense fallback={<FilesSkeletonPage />}>
      <Deleted />
    </Suspense>
  );
}

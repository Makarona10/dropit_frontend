"use client";

import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import GoogleCallback from "@/components/pages/auth/callback/GoogleCallBack";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleCallback />
    </Suspense>
  );
}

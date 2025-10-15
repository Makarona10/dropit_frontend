"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("access_token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/cloud/recents");
    }
  }, [token, router]);

  return (
    <div className="font-bold h-screen w-full flex flex-col  justify-center gap-3 items-center p-4">
      <div className="size-16">
        <LoadingSpinner />
      </div>
      <p>Logging you in with Google...</p>
    </div>
  );
}

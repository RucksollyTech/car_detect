import GoogleCallbackClient from "@/components/GoogleCallbackClient";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Completing sign in…</span>
      </div>
    </div>}>
      <GoogleCallbackClient />
    </Suspense>
  );
}
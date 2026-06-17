"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function QRLandingPage() {
  const router = useRouter();
  const params = useParams();
  const tableId = params?.tableId as string;

  useEffect(() => {
    if (tableId) {
      // Securely store table number in sessionStorage across the login redirect barrier
      sessionStorage.setItem("qr_table_number", tableId);
      
      // Redirect to login while preserving any existing query params if necessary
      router.push("/login");
    }
  }, [tableId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
      <p className="text-lg font-medium text-gray-300">Securing your table connection...</p>
      <p className="text-sm text-gray-500 mt-1">Please wait while we sync your menu.</p>
    </div>
  );
}
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-20 md:py-24 min-h-[60vh] flex items-center">
      <div className="container text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-[#daa520]">500</h1>
        <p className="text-xl md:text-2xl text-skin-base/70 mt-4">
          Something went wrong
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#daa520] text-black rounded-lg font-medium"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-skin-base/20 text-skin-base rounded-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="py-20 md:py-24 min-h-[60vh] flex items-center">
      <div className="container text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-[#daa520]">404</h1>
        <p className="text-xl md:text-2xl text-skin-base/70 mt-4">
          Page not found
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

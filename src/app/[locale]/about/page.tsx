import type { Metadata } from "next";
import { Christiano } from "@/components/sections/TeamSection";

export const metadata: Metadata = {
  title: "About - Milliark Investments",
  description: "Meet the Milliark team. Learn about Christiano Trotta and the strategic leadership behind Milliark Investments.",
};

export default function AboutPage() {
  return (
    <>
      <Christiano />
    </>
  );
}

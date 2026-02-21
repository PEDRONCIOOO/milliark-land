import type { Metadata } from "next";
import { Features } from "@/components/sections/Features";

export const metadata: Metadata = {
  title: "Services - Milliark Investments",
  description: "Explore our comprehensive business and financial services. From corporate governance to risk management.",
};

export default function ServicesPage() {
  return (
    <>
      <Features />
    </>
  );
}

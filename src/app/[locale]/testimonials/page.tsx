import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Testimonials - Milliark Investments",
  description: "See what our clients say about working with Milliark Investments.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Testimonials />
    </>
  );
}

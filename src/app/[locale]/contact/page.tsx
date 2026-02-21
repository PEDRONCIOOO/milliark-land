import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CallToAction } from "@/components/sections/CallToAction";
import { ParticlesBg } from "@/components/sections/ParticlesWrapper";

const Headquarter = dynamic(
  () => import("@/components/sections/Headquarters").then((m) => m.Headquarter),
);

export const metadata: Metadata = {
  title: "Contact - Milliark Investments",
  description: "Get in touch with Milliark Investments. Visit our headquarters worldwide.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      <CallToAction />
      <ParticlesBg />
      <Headquarter />
    </div>
  );
}

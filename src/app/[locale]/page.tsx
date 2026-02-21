import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const ServicesPreview = dynamic(
  () =>
    import("@/components/sections/ServicesPreview").then(
      (m) => m.ServicesPreview,
    ),
);

const Stats = dynamic(
  () => import("@/components/sections/Stats").then((m) => m.Stats),
);

const CallToAction = dynamic(
  () =>
    import("@/components/sections/CallToAction").then((m) => m.CallToAction),
);

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Stats />
      <CallToAction />
    </>
  );
}

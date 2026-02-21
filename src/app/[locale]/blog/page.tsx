import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Milliark Investments",
  description: "Insights and updates from Milliark Investments.",
};

export default function BlogPage() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h1 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Blog
        </h1>
        <p className="text-lg md:text-xl text-skin-base/70 text-center tracking-tight mt-5 max-w-2xl mx-auto">
          Coming soon. Stay tuned for insights and updates.
        </p>
      </div>
    </section>
  );
}

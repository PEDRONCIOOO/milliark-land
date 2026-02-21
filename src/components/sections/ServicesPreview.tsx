"use client";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const previewServices = [
  { key: "strongBusiness", icon: "/assets/lottie/advantage.json" },
  { key: "financialSecurity", icon: "/assets/lottie/security.json" },
  { key: "governance", icon: "/assets/lottie/test.json" },
  { key: "riskManagement", icon: "/assets/lottie/risk.json" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-200 group-hover:translate-x-0.5"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ServiceIcon = ({ src }: { src: string }) => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [src]);
  if (!data) { return null; }
  return <Lottie animationData={data} className="w-full h-full" autoplay loop />;
};

export const ServicesPreview = () => {
  const t = useTranslations("servicesPreview");
  const tFeatures = useTranslations("features");

  return (
    <AnimatedSection
      distance={80}
      direction="vertical"
      reverse={false}
      delay={0.1}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.03}
      threshold={0.1}
    >
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Ambient background */}
        <div className="theme-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.04)_0%,transparent_60%)]" />

        <div className="container relative">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight heading-gradient"
            >
              {t("heading")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-sm md:text-base lg:text-lg text-skin-base/50 max-w-xl mx-auto leading-relaxed"
            >
              {t("subheading")}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 h-px bg-gradient-to-r from-transparent via-[#daa520]/40 to-transparent max-w-xs mx-auto"
            />
          </div>

          {/* Service Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-12 md:mt-16"
          >
            {previewServices.map((service) => (
              <motion.div key={service.key} variants={itemVariants}>
                <Link href="/services" className="block h-full">
                  <div className="group relative h-full flex flex-col p-5 md:p-6 rounded-2xl border border-skin-base/10 card-surface hover:border-[#daa520]/30 hover:bg-[#daa520]/[0.04] transition-all duration-300">
                    {/* Icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-skin-base/5 border border-skin-base/10 group-hover:border-[#daa520]/25 group-hover:bg-[#daa520]/10 flex items-center justify-center transition-all duration-300">
                      <div className="w-7 h-7 md:w-8 md:h-8">
                        <ServiceIcon src={service.icon} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 text-base md:text-lg font-semibold text-skin-base/90 group-hover:text-skin-base transition-colors duration-300 leading-tight">
                      {tFeatures(`tabs.${service.key}.title`)}
                    </h3>

                    {/* Short description */}
                    <p className="mt-2 text-xs md:text-sm text-skin-base/40 group-hover:text-skin-base/50 leading-relaxed line-clamp-3 flex-1 transition-colors duration-300">
                      {tFeatures(`tabs.${service.key}.description`)}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-4 text-skin-base/20 group-hover:text-[#daa520] transition-colors duration-300">
                      <ArrowRight />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center mt-10"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm md:text-base text-[#daa520] hover:text-[#f7b526] font-medium transition-colors duration-200"
            >
              {t("viewAll")}
              <ArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};

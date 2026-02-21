"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FloripaOffice,
  ZurichOficce,
  nyOffice,
  CampinasOffice,
  BVIoffice,
} from "@/assets";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const locations = [
  { key: "florianopolis", image: FloripaOffice },
  { key: "zurich", image: ZurichOficce },
  { key: "campinas", image: CampinasOffice },
  { key: "newYork", image: nyOffice },
  { key: "bvi", image: BVIoffice },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MapPinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-[#daa520]"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-200 group-hover/link:translate-x-0.5"
  >
    <path d="M7 17l9.2-9.2M17 17V7H7" />
  </svg>
);

export const Headquarter = () => {
  const t = useTranslations("headquarters");
  const tBtn = useTranslations("buttons");

  const getMapsUrl = (location: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  };

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
        {/* Ambient background glow */}
        <div className="theme-glow absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(218,165,32,0.05)_0%,transparent_60%)]" />

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
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 h-px bg-gradient-to-r from-transparent via-[#daa520]/40 to-transparent max-w-xs mx-auto"
            />
          </div>

          {/* Location Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 md:mt-16 max-w-6xl mx-auto"
          >
            {locations.map((loc) => {
              const locationName = t(`locations.${loc.key}`);
              return (
                <motion.div
                  key={loc.key}
                  variants={itemVariants}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="group relative rounded-2xl overflow-hidden border border-skin-base/10 card-surface hover:border-skin-base/20 transition-colors duration-300 h-full">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={loc.image}
                        alt={locationName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="p-4 md:p-5">
                      <div className="flex items-center gap-2.5">
                        <MapPinIcon />
                        <h3 className="text-sm md:text-base font-semibold text-skin-base leading-tight">
                          {locationName}
                        </h3>
                      </div>

                      <Link
                        href={getMapsUrl(locationName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link mt-3 inline-flex items-center gap-1.5 text-xs md:text-sm text-[#daa520] hover:text-[#f7b526] transition-colors duration-200"
                      >
                        {tBtn("viewOnMaps")}
                        <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default Headquarter;

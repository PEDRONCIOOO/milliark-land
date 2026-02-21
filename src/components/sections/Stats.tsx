"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useTranslations } from "next-intl";

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <path d="M2 13h20" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const MapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
    <path d="M8 2v16" />
    <path d="M16 6v16" />
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const statIcons: Record<string, React.FC> = {
  years: BriefcaseIcon,
  offices: GlobeIcon,
  countries: MapIcon,
  clients: UsersIcon,
};

const statKeys = ["years", "offices", "countries", "clients"] as const;

const CountUp = ({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Stats = () => {
  const t = useTranslations("stats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="theme-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(218,165,32,0.04)_0%,transparent_70%)]" />

      <div className="container relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {statKeys.map((key) => {
            const value = parseInt(t(`${key}.value`), 10);
            const suffix = t(`${key}.suffix`);
            const label = t(`${key}.label`);
            const Icon = statIcons[key];

            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative rounded-2xl border border-skin-base/[0.08] card-surface p-5 md:p-7 text-center overflow-hidden hover:border-[#daa520]/20 transition-colors duration-500"
              >
                {/* Card glow on hover */}
                <div className="theme-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(218,165,32,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#daa520]/10 border border-[#daa520]/20 text-[#daa520] mb-4">
                    <Icon />
                  </div>

                  {/* Number */}
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold heading-gradient leading-none">
                    <CountUp target={value} suffix={suffix} inView={isInView} />
                  </div>

                  {/* Decorative gold dot */}
                  <div className="mx-auto mt-3 mb-2 w-1 h-1 rounded-full bg-[#daa520]/40" />

                  {/* Label */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-skin-base/40 font-medium uppercase tracking-[0.15em]">
                    {label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

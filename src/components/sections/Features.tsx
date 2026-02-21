"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import FeatureTab from "@/components/FeatureTab";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const tabKeys = [
  "strongBusiness",
  "latam",
  "financialSecurity",
  "governance",
  "regulations",
  "compliances",
  "policies",
  "riskManagement",
];

const tabIcons = [
  "/assets/lottie/advantage.json",
  "/assets/lottie/smallb.json",
  "/assets/lottie/security.json",
  "/assets/lottie/test.json",
  "/assets/lottie/regulation.json",
  "/assets/lottie/compliances.json",
  "/assets/lottie/sops.json",
  "/assets/lottie/risk.json",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
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

const DetailLottie = ({ src }: { src: string }) => {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [src]);
  if (!data) return null;
  return <Lottie animationData={data} className="w-full h-full" autoplay loop />;
};

export const Features = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const t = useTranslations("features");

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
      <section className="py-16 md:py-24 relative overflow-hidden" id="what-we-offer">
        {/* Ambient background glow */}
        <div className="theme-glow absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(218,165,32,0.05)_0%,transparent_70%)]" />

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

          {/* Service Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-12 md:mt-16"
          >
            {tabKeys.map((key, index) => (
              <motion.div key={key} variants={itemVariants} className="h-full">
                <FeatureTab
                  title={t(`tabs.${key}.title`)}
                  icon={tabIcons[index]}
                  isNew={false}
                  description={t(`tabs.${key}.description`)}
                  backgroundPositionX={50}
                  backgroundPositionY={0}
                  backgroundSizeX={220}
                  onClick={() => setCurrentTab(index)}
                  selected={currentTab === index}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Selected Service Detail */}
          <div className="mt-8 md:mt-10">
            <AnimatePresence mode="wait">
              {currentTab !== null && (
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative rounded-2xl border border-skin-base/10 card-surface backdrop-blur-sm overflow-hidden"
                >
                  {/* Gold ambient glow */}
                  <div className="theme-glow absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-[#daa520]/8 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative p-5 md:p-8 flex flex-col sm:flex-row gap-5 md:gap-8 items-start">
                    {/* Large icon */}
                    <div className="shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#daa520]/20 to-[#daa520]/5 border border-[#daa520]/20 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-12 md:h-12">
                        <DetailLottie src={tabIcons[currentTab]} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-semibold text-skin-base">
                        {t(`tabs.${tabKeys[currentTab]}.title`)}
                      </h3>
                      <p className="mt-2 md:mt-3 text-sm md:text-base text-skin-base/55 leading-relaxed">
                        {t(`tabs.${tabKeys[currentTab]}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#daa520]/30 to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

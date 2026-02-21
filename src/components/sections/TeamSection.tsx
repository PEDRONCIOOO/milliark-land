"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import TeamMemberBox from "@/components/ui/TeamMemberBox";
import { TeamMilliark as teamData } from "@/data/data";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Christiano = () => {
  const t = useTranslations("team");
  const tBtn = useTranslations("buttons");

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
      <section className="py-16 md:py-24 relative overflow-hidden" id="who-we-are">
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
              className="mt-4 text-sm md:text-base lg:text-lg text-skin-base/50 max-w-2xl mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 h-px bg-gradient-to-r from-transparent via-[#daa520]/40 to-transparent max-w-xs mx-auto"
            />
          </div>

          {/* Team Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16 max-w-5xl mx-auto"
          >
            {teamData.map((member) => (
              <motion.div key={member.key} variants={itemVariants}>
                <TeamMemberBox
                  name={t(`members.${member.key}.name`)}
                  role={t(`members.${member.key}.role`)}
                  avatarImg={member.avatarImg}
                  socials={member.socials}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-10 md:mt-14"
          >
            <Link href="tel:+5511975544049">
              <Button>{tBtn("talkToUs")}</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};

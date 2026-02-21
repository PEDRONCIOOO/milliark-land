"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  Logo,
  StarsImage,
  AcmeLogo,
  ApexLogo,
  CelestialLogo,
  QuantumLogo,
  PulseLogo,
  EchoLogo,
  PhilipsLogo,
  ExpressaLogo,
  MedleyLogo,
  MerckLogo,
  BrasterapicaLogo,
} from "@/assets";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";

const logos = [
  AcmeLogo,
  PulseLogo,
  EchoLogo,
  CelestialLogo,
  ApexLogo,
  QuantumLogo,
  PhilipsLogo,
  ExpressaLogo,
  MedleyLogo,
  MerckLogo,
  BrasterapicaLogo,
];

const Planet = () => {
  const planetStyle = {
    backgroundImage:
      "radial-gradient(50% 50% at 16.8% 18.3%, white, #daa520 37.7%, rgb(24,40,66))",
  };

  return (
    <div
      className="absolute size-48 sm:size-64 md:size-96 border border-white/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[-20px_-20px_50px_rgba(255,255,255,0.5),-20px_-20px_80px_rgba(255,255,255,0.1),0_0_50px_rgb(218,165,32,255)]"
      style={planetStyle}
    />
  );
};

const RotatingRing = ({
  size,
  borderClass,
  duration,
  rotation,
  children,
}: {
  size: string;
  borderClass: string;
  duration: number;
  rotation: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateX: "-50%", translateY: "-50%" }}
      animate={{ rotate: rotation }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      className={`absolute ${size} top-1/2 left-1/2 rounded-full ${borderClass}`}
    >
      {children}
    </motion.div>
  );
};

export const Hero = () => {
  const tHero = useTranslations("hero");
  const tBtn = useTranslations("buttons");
  const tTicker = useTranslations("logoTicker");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <div className="force-dark">
    <AnimatedSection
      distance={-150}
      direction="horizontal"
      reverse={false}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
    >
      <motion.section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center overflow-hidden min-h-[600px] md:min-h-[90vh] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        style={{
          backgroundImage: `url(${StarsImage.src})`,
          backgroundPositionY,
        }}
        animate={{ backgroundPositionX: StarsImage.width }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgba(218,165,32,0.5)_15%,rgb(14,0,36,0.5)_78%,transparent)]" />

        {/* Orbital system - centered */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Planet />

          <RotatingRing
            size="size-[260px] sm:size-[344px] md:size-[580px]"
            borderClass="border border-white opacity-20"
            duration={60}
            rotation="1turn"
          >
            <div className="absolute size-2 bg-white top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="absolute size-2 bg-white top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="absolute size-5 border border-white top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 rounded-full inline-flex justify-center items-center">
              <div className="size-2 bg-white rounded-full" />
            </div>
          </RotatingRing>

          <RotatingRing
            size="size-[340px] sm:size-[444px] md:size-[780px]"
            borderClass="border border-dashed border-white/20"
            duration={60}
            rotation="-1turn"
          />

          <RotatingRing
            size="size-[420px] sm:size-[544px] md:size-[980px]"
            borderClass="border border-white opacity-20"
            duration={90}
            rotation="1turn"
          >
            <div className="absolute size-2 bg-white top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="absolute size-2 bg-white top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </RotatingRing>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 md:pt-28">
          <Image
            className="rounded-xl shadow-lg shadow-[#ffffff42]"
            src={Logo}
            alt="Milliark Logo"
            width={120}
            height={84}
            priority
            sizes="120px"
          />

          <h1 className="mt-5 md:mt-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Milliark Investments
          </h1>

          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-md md:max-w-lg mx-auto leading-relaxed">
            {tHero("tagline")}
          </p>

          <div className="mt-6 md:mt-8">
            <Link href="/services">
              <Button>{tBtn("seeOurJob")}</Button>
            </Link>
          </div>
        </div>

        {/* Logo ticker - integrated at the bottom */}
        <div className="relative z-10 w-full mt-auto pb-10 md:pb-14 pt-12 md:pt-16">
          <div className="container">
            <p className="text-center text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mb-5 md:mb-6">
              {tTicker("title")}
            </p>
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
              <motion.div
                initial={{ translateX: "-50%" }}
                animate={{ translateX: "0" }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex flex-none gap-10 md:gap-14 pr-10 md:pr-14 -translate-x-1/2 items-center"
              >
                {[...logos, ...logos].map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt="Partner logo"
                    className="h-7 md:h-9 w-auto opacity-50 hover:opacity-100 transition"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatedSection>
    </div>
  );
};

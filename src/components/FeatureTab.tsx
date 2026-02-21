"use client";
import { useRef, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  ValueAnimationTransition,
} from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { featuresTabs } from "@/data/data";

const FeatureTab = (
  props: (typeof featuresTabs)[number] &
    ComponentPropsWithoutRef<"div"> & { selected: boolean },
) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%,black,transparent)`;

  useEffect(() => {
    const path = props.icon.startsWith("./") ? props.icon.slice(1) : props.icon;
    fetch(path)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {});
  }, [props.icon]);

  useEffect(() => {
    if (!tabRef.current || !props.selected) {
      return;
    }
    xPercentage.set(0);
    yPercentage.set(0);

    const { height, width } = tabRef.current.getBoundingClientRect();
    const circumference = height * 2 + width * 2;

    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 - height) / circumference,
      1,
    ];

    const options: ValueAnimationTransition = {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [props.selected, xPercentage, yPercentage]);

  const handleTabHover = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    }
  };

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      onClick={props.onClick}
      className={`
        relative group flex flex-col h-full p-4 md:p-5 rounded-xl border cursor-pointer
        transition-all duration-300
        ${props.selected
          ? "border-[#daa520]/30 bg-[#daa520]/[0.06]"
          : "border-skin-base/10 card-surface hover:border-skin-base/20 hover:bg-skin-base/[0.05]"
        }
      `}
    >
      {/* Animated border trace when selected */}
      {props.selected && (
        <motion.div
          style={{ maskImage }}
          className="absolute inset-0 -m-px border border-[#daa520] rounded-xl"
        />
      )}

      {/* Icon container */}
      <div
        className={`
          inline-flex justify-center items-center size-11 md:size-14 rounded-lg mb-3
          transition-all duration-300
          ${props.selected
            ? "bg-[#daa520]/15 border border-[#daa520]/25"
            : "bg-skin-base/5 border border-skin-base/10 group-hover:border-skin-base/20"
          }
        `}
      >
        {animationData && (
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            className="size-6 md:size-8"
            autoplay
            loop={false}
          />
        )}
      </div>

      {/* Title */}
      <span
        className={`
          text-xs md:text-sm font-medium leading-tight transition-colors duration-300
          ${props.selected ? "text-skin-base" : "text-skin-base/70 group-hover:text-skin-base/90"}
        `}
      >
        {props.title}
      </span>

      {/* "new" badge */}
      {props.isNew && (
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] bg-[#daa520] text-black font-semibold rounded-full">
          new
        </span>
      )}
    </div>
  );
};

export default FeatureTab;

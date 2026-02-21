"use client";
import { testimonials } from "@/data/data";
import { motion } from "framer-motion";
import Image from "next/image";

import AnimatedSection from "@/components/ui/AnimatedSection";

export const Testimonials = () => {
  return (
    <AnimatedSection
    distance={-100}
    direction="vertical"
    reverse={false}
    delay={0.3}
    config={{ tension: 80, friction: 20 }}
    initialOpacity={0.2}
    animateOpacity
    scale={1.1}
    threshold={0.2}
    >
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl text-center font-medium tracking-tighter heading-gradient">
          Beyond Expectations.
        </h2>
        <p className="text-lg md:text-xl text-center text-skin-base/70 tracking-tight mt-5 max-w-sm mx-auto">
          Our revolutionary mindset have transformed our clients&apos;
          strategies.
        </p>
        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{
              translateX: "-50%",
            }}
            animate={{
              translateX: "0",
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-5 pr-5 flex-none"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 md:p-10 border border-skin-base/10 rounded-xl card-surface max-w-xs md:max-w-md flex-none"
              >
                <span className="text-lg md:text-2xl tracking-tight">
                  {testimonial.text}
                </span>
                <div className="flex items-center gap-3 mt-5">
                  <div className="relative after:content-[''] before:content-[''] after:absolute before:absolute after:inset-0 before:inset-0 after:bg-[rgb(218,165,32)] after:mix-blend-soft-light before:border before:border-skin-base/30 before:z-10 before:rounded-lg">
                    <Image
                      src={testimonial.avatarImg}
                      alt={`Avatar for ${testimonial.name}`}
                      width={44}
                      height={44}
                      className="size-11 rounded-lg grayscale"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>{testimonial.name}</span>
                    <span className="text-sm text-skin-base/50">
                      {testimonial.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
    </AnimatedSection>
  );
};

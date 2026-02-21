"use client";
import React, { lazy, Suspense } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const LazyParticles = lazy(() => import("@/components/sections/ParticleBackground"));

export const ParticlesBg = () => {
    return (
        <div style={{ width: '100%', position: 'absolute', top: "20%", zIndex: -1 }}>
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
            <Suspense fallback={<div>Loading...</div>}>
                <LazyParticles
                    className="h-[600px]"
                    particleColors={['#daa520', '#b8860b']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.4}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                />
            </Suspense>
        </AnimatedSection>
        </div>
    );
};

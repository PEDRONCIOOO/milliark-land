"use client";
import { SocialX, SocialInstagram, SocialYoutube } from "@/assets";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const Footer = () => {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const navItems = [
    { href: "/", title: t("home") },
    { href: "/about", title: t("about") },
    { href: "/services", title: t("services") },
    { href: "/testimonials", title: t("testimonials") },
    { href: "/contact", title: t("contact") },
  ];

  return (
    <AnimatedSection
      distance={100}
      direction="vertical"
      reverse={false}
      delay={0.3}
      config={{ tension: 80, friction: 20 }}
      initialOpacity={0.2}
      animateOpacity
      scale={1.1}
      threshold={0.2}
    >
      <footer className="py-5 border-t border-skin-base/10">
        <div className="container">
          <div className="flex items-center flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex gap-2 items-center lg:flex-1">
              <span className="font-medium">{tFooter("brand")}</span>
            </div>
            <nav aria-label="Footer navigation" className="flex text-center flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-skin-base/70 hover:text-skin-base text-xs md:text-sm transition"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
            <div className="flex gap-5 lg:flex-1 lg:justify-end">
              <SocialX className="text-skin-base/40 hover:text-skin-base transition" />
              <SocialInstagram className="text-skin-base/40 hover:text-skin-base transition" />
              <SocialYoutube className="text-skin-base/40 hover:text-skin-base transition" />
            </div>
          </div>
        </div>
        <div className="coded-by text-center pt-12 opacity-50">
          <span className="text-xs">{tFooter("codedBy")} <Link href="https://trotta.dev" className="text-yellow-600" target="_blank">Pedro Trotta</Link></span>
        </div>
      </footer>
    </AnimatedSection>
  );
};

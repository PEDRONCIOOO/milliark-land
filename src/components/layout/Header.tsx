"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import milliark from "@/assets/logomilliark.jpeg";
import LocaleSwitcher from "./LocaleSwitcher";
// import ThemeToggle from "./ThemeToggle";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tBtn = useTranslations("buttons");

  const navItems = [
    { href: "/", title: t("home") },
    { href: "/about", title: t("about") },
    { href: "/services", title: t("services") },
    { href: "/contact", title: t("contact") },
  ];

  // Strip locale prefix for active link comparison
  const segments = pathname.split("/");
  const pathWithoutLocale = "/" + segments.slice(2).join("/");

  const isActive = (href: string) =>
    pathWithoutLocale === href || (href === "/" && pathWithoutLocale === "/");

  return (
    <header className="sticky top-0 z-50">
      {/* Desktop header */}
      <div className="py-4 border-b border-skin-base/10 md:border-none">
        <div className="absolute inset-0 backdrop-blur-xl bg-skin-bg/70 -z-10" />
        <div className="container">
          <div className="relative flex justify-between items-center md:border border-skin-base/10 md:p-2.5 rounded-xl max-w-3xl mx-auto">
            <div className="absolute inset-0 backdrop-blur-xl bg-skin-bg/50 -z-10 hidden md:block rounded-xl" />

            {/* Logo */}
            <Link href="/">
              <div className="inline-flex items-center justify-center size-10 border border-skin-base/15 rounded-lg">
                <Image
                  src={milliark}
                  alt="Milliark Logo"
                  width={32}
                  height={32}
                  className="size-8 rounded-lg"
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <nav aria-label="Main navigation" className="flex gap-6 text-sm">
                {navItems.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap transition ${
                      isActive(link.href)
                        ? "text-skin-base"
                        : "text-skin-base/70 hover:text-skin-base"
                    }`}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* <ThemeToggle /> */}
              <LocaleSwitcher />
              <Link href="tel:+5511975544049" className="hidden sm:block whitespace-nowrap">
                <Button>{tBtn("callUs")}</Button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); }}
                className="md:hidden p-2 text-skin-base/70 hover:text-skin-base transition"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-skin-base/10">
          <div className="absolute inset-0 top-0 backdrop-blur-xl bg-skin-bg/90 -z-10" />
          <div className="relative container py-4">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => { setMobileOpen(false); }}
                  className={`py-3 px-4 rounded-lg text-base transition ${
                    isActive(link.href)
                      ? "text-skin-base bg-skin-base/10 font-medium"
                      : "text-skin-base/70 active:bg-skin-base/5"
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <Link
                href="tel:+5511975544049"
                onClick={() => { setMobileOpen(false); }}
                className="block"
              >
                <Button classname="w-full">{tBtn("callUs")}</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

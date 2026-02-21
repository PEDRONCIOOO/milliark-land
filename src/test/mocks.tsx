import React from "react";
import { vi } from "vitest";

// Mock next/navigation
export const mockPush = vi.fn();
export const mockUsePathname = vi.fn(() => "/en");
export const mockUseRouter = vi.fn(() => ({
  push: mockPush,
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => mockUseRouter(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock next-intl
const translations: Record<string, Record<string, string>> = {
  nav: {
    home: "Home",
    about: "Who we are",
    services: "What we offer",
    testimonials: "Testimonials",
    contact: "Contact",
    blog: "Blog",
  },
  buttons: {
    callUs: "Call Us",
    seeOurJob: "See Our Job",
    talkToUs: "Talk To Us",
    backToHome: "Back to Home",
  },
  footer: {
    brand: "Milliark Investments",
    codedBy: "Coded by",
  },
};

export const mockUseLocale = vi.fn(() => "en");

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    return (key: string) => translations[namespace]?.[key] ?? `${namespace}.${key}`;
  },
  useLocale: () => mockUseLocale(),
}));

// Mock SVG assets
vi.mock("@/assets", () => ({
  MenuIcon: (props: Record<string, unknown>) => <svg data-testid="menu-icon" {...props} />,
  SocialX: (props: Record<string, unknown>) => <svg data-testid="social-x" {...props} />,
  SocialInstagram: (props: Record<string, unknown>) => (
    <svg data-testid="social-instagram" {...props} />
  ),
  SocialYoutube: (props: Record<string, unknown>) => (
    <svg data-testid="social-youtube" {...props} />
  ),
}));

// Mock @/i18n/routing
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "pt-BR", "es"],
    defaultLocale: "en",
  },
}));

// Mock static image imports
vi.mock("@/assets/logomilliark.jpeg", () => ({ default: "/test-logo.jpeg" }));

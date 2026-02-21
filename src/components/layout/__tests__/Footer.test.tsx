import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@/test/mocks";
import { Footer } from "../Footer";

// Mock AnimatedSection to render children directly
import { vi } from "vitest";
vi.mock("@/components/ui/AnimatedSection", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("Milliark Investments")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Who we are")).toBeInTheDocument();
    expect(screen.getByText("What we offer")).toBeInTheDocument();
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders navigation links as anchor elements", () => {
    render(<Footer />);
    const homeLink = screen.getByText("Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders social media icons", () => {
    render(<Footer />);
    expect(screen.getByTestId("social-x")).toBeInTheDocument();
    expect(screen.getByTestId("social-instagram")).toBeInTheDocument();
    expect(screen.getByTestId("social-youtube")).toBeInTheDocument();
  });

  it("renders coded by credit", () => {
    render(<Footer />);
    expect(screen.getByText(/Coded by/)).toBeInTheDocument();
    expect(screen.getByText("Pedro Trotta")).toBeInTheDocument();
  });

  it("links to Pedro Trotta's site", () => {
    render(<Footer />);
    const link = screen.getByText("Pedro Trotta").closest("a");
    expect(link).toHaveAttribute("href", "https://trotta.dev");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

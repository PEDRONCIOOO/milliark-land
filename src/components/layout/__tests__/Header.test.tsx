import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@/test/mocks";
import { mockUsePathname } from "@/test/mocks";
import { Header } from "../Header";

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/en");
  });

  it("renders the logo", () => {
    render(<Header />);
    expect(screen.getByAltText("Milliark Logo")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Who we are")).toBeInTheDocument();
    expect(screen.getByText("What we offer")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Call Us button", () => {
    render(<Header />);
    expect(screen.getByText("Call Us")).toBeInTheDocument();
  });

  it("renders locale switcher", () => {
    render(<Header />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
  });

  it("highlights active Home link on root path", () => {
    mockUsePathname.mockReturnValue("/en");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink?.className).toContain("text-white");
    expect(homeLink?.className).not.toContain("text-white/70");
  });

  it("highlights active About link on /about path", () => {
    mockUsePathname.mockReturnValue("/en/about");
    render(<Header />);
    const aboutLink = screen.getByText("Who we are").closest("a");
    expect(aboutLink?.className).toContain("text-white");
    expect(aboutLink?.className).not.toContain("text-white/70");
  });

  it("renders as sticky header", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("sticky");
    expect(header.className).toContain("top-0");
  });

  it("renders menu icon for mobile", () => {
    render(<Header />);
    expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@/test/mocks";
import { mockUsePathname, mockPush, mockUseLocale } from "@/test/mocks";
import LocaleSwitcher from "../LocaleSwitcher";

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/en");
    mockUseLocale.mockReturnValue("en");
    mockPush.mockClear();
  });

  it("renders all three locale buttons", () => {
    render(<LocaleSwitcher />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
  });

  it("highlights the active locale (EN)", () => {
    render(<LocaleSwitcher />);
    const enButton = screen.getByText("EN");
    expect(enButton.className).toContain("bg-[#daa520]");
    expect(enButton.className).toContain("font-bold");
  });

  it("does not highlight inactive locales", () => {
    render(<LocaleSwitcher />);
    const ptButton = screen.getByText("PT");
    expect(ptButton.className).not.toContain("bg-[#daa520]");
    expect(ptButton.className).toContain("text-white/50");
  });

  it("navigates to pt-BR locale on PT click", () => {
    mockUsePathname.mockReturnValue("/en");
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByText("PT"));
    expect(mockPush).toHaveBeenCalledWith("/pt-BR");
  });

  it("navigates to es locale on ES click", () => {
    mockUsePathname.mockReturnValue("/en");
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByText("ES"));
    expect(mockPush).toHaveBeenCalledWith("/es");
  });

  it("preserves path when switching locale", () => {
    mockUsePathname.mockReturnValue("/en/about");
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByText("PT"));
    expect(mockPush).toHaveBeenCalledWith("/pt-BR/about");
  });

  it("highlights PT when pt-BR is active locale", () => {
    mockUseLocale.mockReturnValue("pt-BR");
    render(<LocaleSwitcher />);
    const ptButton = screen.getByText("PT");
    expect(ptButton.className).toContain("bg-[#daa520]");
  });
});

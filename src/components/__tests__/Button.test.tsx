import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders as a button element", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has type=button", () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("applies default gradient classes", () => {
    render(<Button>Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-gradient-to-b");
    expect(btn.className).toContain("rounded-lg");
  });

  it("merges custom classname via twMerge", () => {
    render(<Button classname="mt-4">Test</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("mt-4");
  });

  it("renders inner decorative layers", () => {
    const { container } = render(<Button>Test</Button>);
    const decorativeDivs = container.querySelectorAll(".absolute.inset-0");
    // The outer wrapper + 3 inner decorative divs
    expect(decorativeDivs.length).toBeGreaterThanOrEqual(3);
  });
});

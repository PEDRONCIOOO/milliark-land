import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedSection from "../AnimatedSection";

// Mock framer-motion to avoid animation complexity in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      whileInView,
      viewport,
      transition,
      ...props
    }: Record<string, unknown>) => (
      <div
        data-testid="animated-section"
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(whileInView)}
        data-viewport={JSON.stringify(viewport)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children as React.ReactNode}
      </div>
    ),
  },
}));

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(
      <AnimatedSection>
        <p>Hello World</p>
      </AnimatedSection>,
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies default vertical animation (y offset)", () => {
    render(
      <AnimatedSection>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.y).toBe(100);
    expect(initial.opacity).toBe(0);
    expect(initial.scale).toBe(1);
  });

  it("applies horizontal direction (x offset)", () => {
    render(
      <AnimatedSection direction="horizontal">
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.x).toBe(100);
    expect(initial.y).toBeUndefined();
  });

  it("applies reverse direction (negative offset)", () => {
    render(
      <AnimatedSection reverse>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.y).toBe(-100);
  });

  it("respects custom distance", () => {
    render(
      <AnimatedSection distance={50}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.y).toBe(50);
  });

  it("applies custom scale", () => {
    render(
      <AnimatedSection scale={0.8}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.scale).toBe(0.8);
  });

  it("sets viewport threshold", () => {
    render(
      <AnimatedSection threshold={0.5}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const viewport = JSON.parse(el.dataset.viewport!);
    expect(viewport.amount).toBe(0.5);
    expect(viewport.once).toBe(true);
  });

  it("sets delay in transition", () => {
    render(
      <AnimatedSection delay={0.5}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const transition = JSON.parse(el.dataset.transition!);
    expect(transition.delay).toBe(0.5);
    expect(transition.type).toBe("spring");
    expect(transition.stiffness).toBe(80);
    expect(transition.damping).toBe(20);
  });

  it("skips opacity animation when animateOpacity is false", () => {
    render(
      <AnimatedSection animateOpacity={false}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.opacity).toBeUndefined();
  });

  it("uses custom initialOpacity", () => {
    render(
      <AnimatedSection initialOpacity={0.5}>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const initial = JSON.parse(el.dataset.initial!);
    expect(initial.opacity).toBe(0.5);
  });

  it("animates to final state (y:0, scale:1, opacity:1)", () => {
    render(
      <AnimatedSection>
        <p>Content</p>
      </AnimatedSection>,
    );
    const el = screen.getByTestId("animated-section");
    const animate = JSON.parse(el.dataset.animate!);
    expect(animate.y).toBe(0);
    expect(animate.scale).toBe(1);
    expect(animate.opacity).toBe(1);
  });
});

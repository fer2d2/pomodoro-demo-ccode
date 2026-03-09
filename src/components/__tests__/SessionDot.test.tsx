import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SessionDot } from "@/components/SessionDot";

describe("SessionDot", () => {
  it("renders with inactive styling by default", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("bg-bg-surface");
    expect(dot.className).toContain("border-border");
  });

  it("renders with active styling when active", () => {
    render(<SessionDot active />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("bg-accent");
    expect(dot.className).not.toContain("border-border");
  });

  it("is 8x8 pixels", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("h-[8px]");
    expect(dot.className).toContain("w-[8px]");
  });

  it("is circular", () => {
    render(<SessionDot />);
    const dot = screen.getByRole("img", { hidden: true });
    expect(dot.className).toContain("rounded-full");
  });

  it("has accessible aria-label", () => {
    render(<SessionDot aria-label="Session 1 complete" />);
    expect(screen.getByLabelText("Session 1 complete")).toBeInTheDocument();
  });
});

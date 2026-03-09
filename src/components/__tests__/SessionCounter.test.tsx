import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SessionCounter } from "../SessionCounter";

describe("SessionCounter", () => {
  it("renders correct number of dots (4 by default)", () => {
    render(<SessionCounter current={0} />);
    const dots = screen.getAllByRole("img");
    expect(dots).toHaveLength(4);
  });

  it("shows '2/4' label when current=2", () => {
    render(<SessionCounter current={2} />);
    expect(screen.getByText("2/4")).toBeInTheDocument();
  });

  it("marks first N dots as active", () => {
    render(<SessionCounter current={2} />);
    const dots = screen.getAllByRole("img");
    expect(dots[0]).toHaveAttribute("aria-label", "Session 1 complete");
    expect(dots[1]).toHaveAttribute("aria-label", "Session 2 complete");
    expect(dots[2]).toHaveAttribute("aria-label", "Session 3 pending");
    expect(dots[3]).toHaveAttribute("aria-label", "Session 4 pending");
  });

  it("custom total works", () => {
    render(<SessionCounter current={1} total={6} />);
    const dots = screen.getAllByRole("img");
    expect(dots).toHaveLength(6);
    expect(screen.getByText("1/6")).toBeInTheDocument();
  });
});

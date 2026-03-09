import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TimerRing } from "@/components/TimerRing";

describe("TimerRing", () => {
  it("renders the time display", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("renders the label", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByText("minutes remaining")).toBeInTheDocument();
  });

  it("renders two SVG circles (background + progress)", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
    );
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
  });

  it("sets stroke-dashoffset based on progress", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
    );
    const circles = container.querySelectorAll("circle");
    const progressCircle = circles[1];
    // radius=107, circumference=2*PI*107≈672.26
    const circumference = 2 * Math.PI * 107;
    const expectedOffset = circumference * (1 - 0.75);
    expect(progressCircle.style.strokeDashoffset).toBe(`${expectedOffset}`);
  });

  it("shows full ring when progress is 1", () => {
    const { container } = render(
      <TimerRing timeDisplay="25:00" label="minutes remaining" progress={1} />
    );
    const progressCircle = container.querySelectorAll("circle")[1];
    expect(progressCircle.style.strokeDashoffset).toBe("0");
  });

  it("shows empty ring when progress is 0", () => {
    const { container } = render(
      <TimerRing timeDisplay="0:00" label="minutes remaining" progress={0} />
    );
    const progressCircle = container.querySelectorAll("circle")[1];
    const circumference = 2 * Math.PI * 107;
    expect(progressCircle.style.strokeDashoffset).toBe(`${circumference}`);
  });

  it("has accessible timer role", () => {
    render(<TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />);
    expect(screen.getByRole("timer")).toBeInTheDocument();
  });
});

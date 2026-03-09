import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Play } from "lucide-react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders children as label", () => {
    render(<Button>Start</Button>);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
  });

  it("defaults to primary variant", () => {
    render(<Button>Start</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-accent");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Reset</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-bg-surface");
    expect(btn.className).toContain("border");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Settings</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-transparent");
  });

  it("renders an icon when provided", () => {
    render(<Button icon={Play}>Start</Button>);
    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("does not render an icon when not provided", () => {
    render(<Button>Start</Button>);
    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("forwards onClick handler", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("forwards disabled prop and applies disabled styling", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.className).toContain("disabled:opacity-50");
    expect(btn.className).toContain("disabled:pointer-events-none");
  });

  it("defaults to type button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("allows type override to submit", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("has focus-visible outline classes", () => {
    render(<Button>Focus</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("focus-visible:outline-2");
  });
});

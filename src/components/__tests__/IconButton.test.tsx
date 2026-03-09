import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/IconButton";

describe("IconButton", () => {
  it("renders a button with an icon", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    const btn = screen.getByRole("button", { name: "Decrease" });
    expect(btn).toBeInTheDocument();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("applies surface background and border classes", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-bg-surface");
    expect(btn.className).toContain("border-border");
  });

  it("is circular (rounded-full)", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button").className).toContain("rounded-full");
  });

  it("forwards onClick handler", async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={Plus} aria-label="Increase" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("forwards disabled prop", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("has focus-visible outline classes", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button").className).toContain("focus-visible:outline-2");
  });

  it("defaults to type button", () => {
    render(<IconButton icon={Minus} aria-label="Decrease" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

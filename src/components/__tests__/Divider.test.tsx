import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "@/components/Divider";

describe("Divider", () => {
  it("renders an hr element", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies border color class", () => {
    render(<Divider />);
    expect(screen.getByRole("separator").className).toContain("border-border");
  });

  it("is full width", () => {
    render(<Divider />);
    expect(screen.getByRole("separator").className).toContain("w-full");
  });

  it("merges custom className", () => {
    render(<Divider className="my-spacing-lg" />);
    const hr = screen.getByRole("separator");
    expect(hr.className).toContain("my-spacing-lg");
  });
});

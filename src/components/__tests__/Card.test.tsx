import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Hello world</p></Card>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("has correct base classes (bg-bg-card, rounded-xl, border)", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-bg-card");
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("border");
  });

  it("accepts additional className", () => {
    render(<Card data-testid="card" className="mt-8">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("mt-8");
    expect(card.className).toContain("bg-bg-card");
  });
});

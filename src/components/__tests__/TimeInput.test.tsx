import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TimeInput } from "@/components/TimeInput";

describe("TimeInput", () => {
  it("renders label text in uppercase", () => {
    render(<TimeInput label="Focus" value={25} onChange={() => {}} />);
    const label = screen.getByText("Focus");
    expect(label).toBeInTheDocument();
    expect(label.className).toContain("uppercase");
  });

  it("displays formatted value with min suffix", () => {
    render(<TimeInput label="Focus" value={25} onChange={() => {}} />);
    expect(screen.getByText("25 min")).toBeInTheDocument();
  });

  it("calls onChange with value + step when plus is clicked", async () => {
    const handleChange = vi.fn();
    render(<TimeInput label="Focus" value={25} onChange={handleChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Increase Focus" }));
    expect(handleChange).toHaveBeenCalledWith(26);
  });

  it("calls onChange with value - step when minus is clicked", async () => {
    const handleChange = vi.fn();
    render(<TimeInput label="Focus" value={25} onChange={handleChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Decrease Focus" }));
    expect(handleChange).toHaveBeenCalledWith(24);
  });

  it("disables minus button when value is at min", () => {
    render(<TimeInput label="Focus" value={1} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Decrease Focus" })).toBeDisabled();
  });

  it("disables plus button when value is at max", () => {
    render(<TimeInput label="Focus" value={60} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Increase Focus" })).toBeDisabled();
  });

  it("uses custom step value", async () => {
    const handleChange = vi.fn();
    render(<TimeInput label="Focus" value={25} onChange={handleChange} step={5} />);
    await userEvent.click(screen.getByRole("button", { name: "Increase Focus" }));
    expect(handleChange).toHaveBeenCalledWith(30);
  });
});

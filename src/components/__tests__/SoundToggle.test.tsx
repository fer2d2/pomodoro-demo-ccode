import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SoundToggle } from "../SoundToggle";

describe("SoundToggle", () => {
  it("renders 'Sound' label", () => {
    render(<SoundToggle enabled={true} onToggle={() => {}} />);
    expect(screen.getByText("Sound")).toBeInTheDocument();
  });

  it("shows volume-2 icon when enabled (aria-label 'Mute sound')", () => {
    render(<SoundToggle enabled={true} onToggle={() => {}} />);
    expect(screen.getByLabelText("Mute sound")).toBeInTheDocument();
  });

  it("shows volume-x icon when disabled (aria-label 'Unmute sound')", () => {
    render(<SoundToggle enabled={false} onToggle={() => {}} />);
    expect(screen.getByLabelText("Unmute sound")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<SoundToggle enabled={true} onToggle={onToggle} />);

    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});

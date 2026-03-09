import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Clock, Coffee, Settings } from "lucide-react";
import { TabBar } from "@/components/TabBar";

const items = [
  { value: "focus", label: "Focus", icon: Clock },
  { value: "break", label: "Break", icon: Coffee },
  { value: "settings", label: "Settings", icon: Settings },
];

describe("TabBar", () => {
  it("renders a tablist", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders all tabs", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("marks the active tab with aria-selected", () => {
    render(<TabBar items={items} value="break" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
  });

  it("applies active styling to the selected tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const activeTab = screen.getByRole("tab", { name: "Focus" });
    expect(activeTab.className).toContain("bg-bg-card");
    expect(activeTab.className).toContain("border");
  });

  it("applies inactive styling to unselected tabs", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const inactiveTab = screen.getByRole("tab", { name: "Break" });
    expect(inactiveTab.className).not.toContain("bg-bg-card");
    expect(inactiveTab.className).not.toContain("border");
  });

  it("calls onChange with the tab value on click", async () => {
    const handleChange = vi.fn();
    render(<TabBar items={items} value="focus" onChange={handleChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Break" }));
    expect(handleChange).toHaveBeenCalledWith("break");
  });

  it("renders icons in each tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    const tabs = screen.getAllByRole("tab");
    tabs.forEach((tab) => {
      expect(tab.querySelector("svg")).toBeInTheDocument();
    });
  });

  it("renders labels in each tab", () => {
    render(<TabBar items={items} value="focus" onChange={() => {}} />);
    expect(screen.getByText("Focus")).toBeInTheDocument();
    expect(screen.getByText("Break")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});

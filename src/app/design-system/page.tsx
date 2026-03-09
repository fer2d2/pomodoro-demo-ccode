"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { TabBar } from "@/components/TabBar";
import { useTheme } from "@/hooks/useTheme";
import { Play, RotateCcw, Settings, Moon, Sun, Clock, Coffee } from "lucide-react";

export default function DesignSystemPage() {
  const { theme, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState("focus");

  return (
    <main className="min-h-screen bg-bg-page px-spacing-xl py-spacing-3xl font-body">
      <div className="mx-auto max-w-2xl">
        <div className="mb-spacing-3xl flex items-center justify-between">
          <h1 className="font-display text-3xl text-text-primary">
            Design System
          </h1>
          <Button variant="ghost" icon={theme === "dark" ? Sun : Moon} onClick={toggle}>
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>

        <section>
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Buttons
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Primary, Secondary, and Ghost button variants
          </p>

          <div className="flex flex-wrap gap-spacing-lg">
            <Button icon={Play}>Start</Button>
            <Button>Primary</Button>
            <Button variant="secondary" icon={RotateCcw}>Reset</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost" icon={Settings}>Settings</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        <section className="mt-spacing-3xl">
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Tabs
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Tab bar with active and inactive states
          </p>

          <TabBar
            items={[
              { value: "focus", label: "Focus", icon: Clock },
              { value: "break", label: "Break", icon: Coffee },
              { value: "settings", label: "Settings", icon: Settings },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          />
        </section>
      </div>
    </main>
  );
}

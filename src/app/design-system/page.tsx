"use client";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { IconButton } from "@/components/IconButton";
import { Divider } from "@/components/Divider";
import { SessionDot } from "@/components/SessionDot";
import { Play, RotateCcw, Settings, Moon, Sun, Minus, Plus } from "lucide-react";

export default function DesignSystemPage() {
  const { theme, toggle } = useTheme();

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
            Controls
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Icon buttons, steppers, dividers, and session indicators
          </p>

          <div className="flex items-center gap-spacing-2xl">
            <IconButton icon={Minus} aria-label="Decrease" />
            <IconButton icon={Plus} aria-label="Increase" />
            <Divider className="flex-1" />
            <SessionDot active aria-label="Session 1 complete" />
            <SessionDot aria-label="Session 2 pending" />
            <SessionDot aria-label="Session 3 pending" />
            <SessionDot aria-label="Session 4 pending" />
          </div>
        </section>
      </div>
    </main>
  );
}

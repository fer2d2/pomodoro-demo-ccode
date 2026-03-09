"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { TabBar } from "@/components/TabBar";
import { TimerRing } from "@/components/TimerRing";
import { useTheme } from "@/hooks/useTheme";
import { IconButton } from "@/components/IconButton";
import { Divider } from "@/components/Divider";
import { SessionDot } from "@/components/SessionDot";
import { TimeInput } from "@/components/TimeInput";
import { SoundToggle } from "@/components/SoundToggle";
import { SessionCounter } from "@/components/SessionCounter";
import { Card } from "@/components/Card";
import { Play, RotateCcw, Settings, Moon, Sun, Minus, Plus, Clock, Coffee } from "lucide-react";

export default function DesignSystemPage() {
  const { theme, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState("focus");
  const [timeValue, setTimeValue] = useState(25);
  const [soundOn, setSoundOn] = useState(true);

  return (
    <main className="min-h-screen bg-bg-page px-spacing-xl py-spacing-3xl font-body">
      <div className="mx-auto max-w-2xl">
        <div className="mb-spacing-3xl flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-text-primary">
              Design System
            </h1>
            <p className="mt-spacing-xs text-md text-text-secondary">
              Reusable components for implementation
            </p>
          </div>
          <Button variant="ghost" icon={theme === "dark" ? Sun : Moon} onClick={toggle}>
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>

        {/* Buttons */}
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

        {/* Tabs */}
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

        {/* Timer */}
        <section className="mt-spacing-3xl">
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Timer
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Circular timer with progress ring and countdown display
          </p>
          <div className="flex flex-wrap items-center gap-spacing-3xl">
            <TimerRing timeDisplay="25:00" label="minutes remaining" progress={0.75} />
          </div>
        </section>

        {/* Controls */}
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

        {/* Inputs */}
        <section className="mt-spacing-3xl">
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Inputs
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Time input with stepper controls
          </p>
          <div className="flex gap-[40px]">
            <TimeInput label="Focus Time" value={timeValue} onChange={setTimeValue} min={1} max={60} step={5} />
            <TimeInput label="Break Time" value={5} onChange={() => {}} min={1} max={30} />
          </div>
        </section>

        {/* Layout */}
        <section className="mt-spacing-3xl">
          <h2 className="mb-spacing-sm font-display text-xl text-text-primary">
            Layout
          </h2>
          <p className="mb-spacing-lg text-md text-text-secondary">
            Sound toggle, session counter, and card container
          </p>
          <div className="flex flex-col gap-spacing-xl">
            <div className="flex items-center gap-spacing-3xl">
              <SoundToggle enabled={soundOn} onToggle={() => setSoundOn(!soundOn)} />
              <SessionCounter current={2} />
            </div>
            <Card className="!w-auto">
              <p className="text-md text-text-secondary">Card container with border, padding, and gap</p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

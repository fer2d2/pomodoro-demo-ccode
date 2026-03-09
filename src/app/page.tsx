"use client";

import { Brain, Coffee, Play, Pause, RotateCcw } from "lucide-react";
import { usePomodoro } from "@/hooks/usePomodoro";
import { Card } from "@/components/Card";
import { TabBar } from "@/components/TabBar";
import { TimerRing } from "@/components/TimerRing";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { TimeInput } from "@/components/TimeInput";
import { SoundToggle } from "@/components/SoundToggle";
import { SessionCounter } from "@/components/SessionCounter";

const tabs = [
  { value: "focus" as const, label: "Focus", icon: Brain },
  { value: "break" as const, label: "Break", icon: Coffee },
];

export default function Home() {
  const {
    mode,
    status,
    timeDisplay,
    progress,
    focusDuration,
    breakDuration,
    sessions,
    soundEnabled,
    start,
    pause,
    reset,
    setFocusDuration,
    setBreakDuration,
    switchMode,
    toggleSound,
  } = usePomodoro();

  const isRunning = status === "running";

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-page p-spacing-xl">
      <Card>
        {/* Header */}
        <div className="flex flex-col items-center gap-[4px]">
          <h1 className="font-display text-4xl text-text-primary">Pomodoro</h1>
          <p className="text-md text-text-secondary">
            stay focused, stay fresh
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <TabBar items={tabs} value={mode} onChange={(v) => switchMode(v as "focus" | "break")} />
        </div>

        {/* Timer */}
        <div className="flex justify-center">
          <TimerRing
            timeDisplay={timeDisplay}
            label="minutes remaining"
            progress={progress}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-spacing-md">
          <Button
            icon={isRunning ? Pause : Play}
            onClick={isRunning ? pause : start}
            className="w-[140px]"
          >
            {isRunning ? "Pause" : status === "paused" ? "Resume" : "Start"}
          </Button>
          <Button
            variant="secondary"
            icon={RotateCcw}
            onClick={reset}
            className="w-[140px]"
          >
            Reset
          </Button>
        </div>

        <Divider />

        {/* Settings */}
        <div className="flex items-start justify-center gap-[40px]">
          <TimeInput
            label="Focus Time"
            value={focusDuration}
            onChange={setFocusDuration}
            min={1}
            max={60}
            step={5}
          />
          <TimeInput
            label="Break Time"
            value={breakDuration}
            onChange={setBreakDuration}
            min={1}
            max={30}
            step={1}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
          <SessionCounter current={sessions} />
        </div>
      </Card>
    </main>
  );
}

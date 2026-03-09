"use client";

import { useState, useEffect, useCallback } from "react";

type Mode = "focus" | "break";
type Status = "idle" | "running" | "paused";

export function usePomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [status, setStatus] = useState<Status>("idle");
  const [focusDuration, setFocusDurationState] = useState(25);
  const [breakDuration, setBreakDurationState] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer effect
  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer complete - handle in a separate effect to avoid state conflicts
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Handle timer completion
  useEffect(() => {
    if (timeRemaining !== 0 || status !== "running") return;

    if (mode === "focus") {
      setSessions((prev) => {
        const next = prev + 1;
        return next >= 4 ? 0 : next;
      });
      setMode("break");
      setTimeRemaining(breakDuration * 60);
    } else {
      setMode("focus");
      setTimeRemaining(focusDuration * 60);
    }
    setStatus("idle");
  }, [timeRemaining, status, mode, focusDuration, breakDuration]);

  const start = useCallback(() => setStatus("running"), []);
  const pause = useCallback(() => setStatus("paused"), []);

  const reset = useCallback(() => {
    setStatus("idle");
    setTimeRemaining(mode === "focus" ? focusDuration * 60 : breakDuration * 60);
  }, [mode, focusDuration, breakDuration]);

  const setFocusDuration = useCallback(
    (minutes: number) => {
      setFocusDurationState(minutes);
      // Only reset time if idle and in focus mode
      if (mode === "focus") {
        setStatus("idle");
        setTimeRemaining(minutes * 60);
      }
    },
    [mode]
  );

  const setBreakDuration = useCallback(
    (minutes: number) => {
      setBreakDurationState(minutes);
      if (mode === "break") {
        setStatus("idle");
        setTimeRemaining(minutes * 60);
      }
    },
    [mode]
  );

  const switchMode = useCallback(
    (newMode: Mode) => {
      setMode(newMode);
      setStatus("idle");
      setTimeRemaining(
        newMode === "focus" ? focusDuration * 60 : breakDuration * 60
      );
    },
    [focusDuration, breakDuration]
  );

  const toggleSound = useCallback(
    () => setSoundEnabled((prev) => !prev),
    []
  );

  // Format time as MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Progress (1 = full, 0 = empty)
  const totalSeconds =
    mode === "focus" ? focusDuration * 60 : breakDuration * 60;
  const progress = totalSeconds > 0 ? timeRemaining / totalSeconds : 0;

  return {
    mode,
    status,
    timeRemaining,
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
  };
}

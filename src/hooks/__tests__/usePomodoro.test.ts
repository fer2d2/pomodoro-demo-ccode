import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { usePomodoro } from "../usePomodoro";

describe("usePomodoro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with focus mode, idle status, and 25:00", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.mode).toBe("focus");
    expect(result.current.status).toBe("idle");
    expect(result.current.timeRemaining).toBe(25 * 60);
    expect(result.current.timeDisplay).toBe("25:00");
  });

  it("start() changes status to running", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.start();
    });

    expect(result.current.status).toBe("running");
  });

  it("pause() changes status to paused", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.pause();
    });

    expect(result.current.status).toBe("paused");
  });

  it("reset() returns to idle with correct time", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.timeRemaining).toBe(25 * 60);
  });

  it("timer decrements when running", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeRemaining).toBe(25 * 60 - 1);
    expect(result.current.timeDisplay).toBe("24:59");
  });

  it("timer completion in focus mode increments sessions, switches to break, goes idle", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(25 * 60 * 1000);
    });

    expect(result.current.mode).toBe("break");
    expect(result.current.status).toBe("idle");
    expect(result.current.sessions).toBe(1);
    expect(result.current.timeRemaining).toBe(5 * 60);
  });

  it("timer completion in break mode switches to focus, goes idle", () => {
    const { result } = renderHook(() => usePomodoro());

    // Complete a focus session first
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(25 * 60 * 1000);
    });

    // Now in break mode, start and complete it
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(result.current.mode).toBe("focus");
    expect(result.current.status).toBe("idle");
    expect(result.current.timeRemaining).toBe(25 * 60);
  });

  it("sessions reset to 0 after reaching 4", () => {
    const { result } = renderHook(() => usePomodoro());

    // Complete 4 focus/break cycles
    for (let i = 0; i < 4; i++) {
      // Focus session
      act(() => {
        result.current.start();
      });
      act(() => {
        vi.advanceTimersByTime(25 * 60 * 1000);
      });

      // Break session (skip for last iteration check)
      if (i < 3) {
        act(() => {
          result.current.start();
        });
        act(() => {
          vi.advanceTimersByTime(5 * 60 * 1000);
        });
      }
    }

    expect(result.current.sessions).toBe(0);
  });

  it("setFocusDuration updates time when idle in focus mode", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.setFocusDuration(30);
    });

    expect(result.current.focusDuration).toBe(30);
    expect(result.current.timeRemaining).toBe(30 * 60);
    expect(result.current.status).toBe("idle");
  });

  it("setBreakDuration updates time when idle in break mode", () => {
    const { result } = renderHook(() => usePomodoro());

    // Switch to break mode first
    act(() => {
      result.current.switchMode("break");
    });
    act(() => {
      result.current.setBreakDuration(10);
    });

    expect(result.current.breakDuration).toBe(10);
    expect(result.current.timeRemaining).toBe(10 * 60);
    expect(result.current.status).toBe("idle");
  });

  it("switchMode changes mode and resets timer", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.switchMode("break");
    });

    expect(result.current.mode).toBe("break");
    expect(result.current.status).toBe("idle");
    expect(result.current.timeRemaining).toBe(5 * 60);

    act(() => {
      result.current.switchMode("focus");
    });

    expect(result.current.mode).toBe("focus");
    expect(result.current.status).toBe("idle");
    expect(result.current.timeRemaining).toBe(25 * 60);
  });

  it("toggleSound toggles soundEnabled", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.soundEnabled).toBe(true);

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.soundEnabled).toBe(false);

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.soundEnabled).toBe(true);
  });

  it("timeDisplay formats correctly", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.timeDisplay).toBe("25:00");

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeDisplay).toBe("24:59");

    // Check single-digit minute formatting
    act(() => {
      result.current.setFocusDuration(5);
    });

    expect(result.current.timeDisplay).toBe("05:00");
  });

  it("progress calculates correctly", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.progress).toBe(1.0);

    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.progress).toBeLessThan(1.0);
    expect(result.current.progress).toBeGreaterThan(0);
  });
});

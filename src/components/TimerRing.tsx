type TimerRingProps = {
  timeDisplay: string;
  label: string;
  progress: number;
};

const SIZE = 220;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2; // 107
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing({ timeDisplay, label, progress }: TimerRingProps) {
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div role="timer" className="relative" style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} className="-rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="var(--color-bg-surface)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="var(--color-accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset: `${offset}`,
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4px]">
        <span className="font-mono text-timer font-medium tracking-[-1px] text-text-primary">
          {timeDisplay}
        </span>
        <span className="font-body text-sm font-normal text-text-secondary">
          {label}
        </span>
      </div>
    </div>
  );
}

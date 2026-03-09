import { SessionDot } from "@/components/SessionDot";

type SessionCounterProps = {
  current: number;
  total?: number;
};

export function SessionCounter({ current, total = 4 }: SessionCounterProps) {
  return (
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: total }, (_, i) => (
        <SessionDot
          key={i}
          active={i < current}
          aria-label={`Session ${i + 1} ${i < current ? "complete" : "pending"}`}
        />
      ))}
      <span className="font-body text-sm font-medium text-text-secondary">
        {current}/{total}
      </span>
    </div>
  );
}

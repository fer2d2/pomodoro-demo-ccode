import type { HTMLAttributes } from "react";

type SessionDotProps = {
  active?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function SessionDot({
  active = false,
  className = "",
  ...rest
}: SessionDotProps) {
  return (
    <span
      role="img"
      className={`inline-block h-[8px] w-[8px] rounded-full ${
        active
          ? "bg-accent"
          : "border border-border bg-bg-surface"
      } ${className}`}
      {...rest}
    />
  );
}

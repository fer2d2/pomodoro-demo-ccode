import type { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement>;

export function Divider({ className = "", ...rest }: DividerProps) {
  return (
    <hr
      className={`w-full border-0 border-t border-border ${className}`}
      {...rest}
    />
  );
}

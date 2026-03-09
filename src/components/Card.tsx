import type { HTMLAttributes, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`flex w-[420px] flex-col gap-[32px] rounded-xl border border-border bg-bg-card p-[40px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

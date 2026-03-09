import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
  icon: LucideIcon;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({
  icon: Icon,
  className = "",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-[32px] w-[32px] items-center justify-center rounded-full border border-border bg-bg-surface text-text-secondary transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...rest}
    >
      <Icon size={14} />
    </button>
  );
}

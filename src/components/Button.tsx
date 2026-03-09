import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "bg-bg-surface text-text-primary border border-border hover:bg-surface-hover",
  ghost:
    "bg-transparent text-text-primary hover:bg-bg-surface",
} as const;

const iconVariantClasses = {
  primary: "text-white",
  secondary: "text-text-secondary",
  ghost: "text-text-secondary",
} as const;

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-[8px] rounded-full px-[24px] py-[12px] text-[14px] font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={18} className={iconVariantClasses[variant]} />}
      {children}
    </button>
  );
}

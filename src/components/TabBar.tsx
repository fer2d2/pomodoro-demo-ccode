import type { LucideIcon } from "lucide-react";

type TabItem = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type TabBarProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

function Tab({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-[6px] rounded-pill px-[20px] py-[8px] text-[13px] transition-colors duration-150 cursor-pointer ${
        active
          ? "bg-bg-card border border-border font-medium text-text-primary"
          : "text-text-secondary"
      }`}
    >
      <Icon
        size={14}
        className={active ? "text-accent" : "text-text-muted"}
      />
      {label}
    </button>
  );
}

export function TabBar({ items, value, onChange }: TabBarProps) {
  return (
    <div
      role="tablist"
      className="flex w-[340px] gap-[2px] rounded-pill bg-bg-surface p-[4px]"
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          icon={item.icon}
          label={item.label}
          active={item.value === value}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  );
}

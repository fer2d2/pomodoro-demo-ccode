import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/IconButton";

type TimeInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function TimeInput({
  label,
  value,
  onChange,
  min = 1,
  max = 60,
  step = 1,
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="uppercase text-sm font-medium tracking-[0.5px] text-text-secondary">
        {label}
      </span>
      <div className="flex items-center gap-[8px]">
        <IconButton
          icon={Minus}
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - step)}
        />
        <span className="w-[64px] text-center font-mono text-md text-text-primary">
          {value} min
        </span>
        <IconButton
          icon={Plus}
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + step)}
        />
      </div>
    </div>
  );
}

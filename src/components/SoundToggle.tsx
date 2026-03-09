import { Volume2, VolumeX } from "lucide-react";

type SoundToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  const Icon = enabled ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-[6px] text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
      aria-label={enabled ? "Mute sound" : "Unmute sound"}
    >
      <Icon size={14} className="text-accent" />
      <span>Sound</span>
    </button>
  );
}

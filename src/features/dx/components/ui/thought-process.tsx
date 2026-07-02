import { Lightbulb } from 'lucide-react';

export function ThoughtProcess({
  label,
  onOpenThoughts,
}: {
  label: string;
  onOpenThoughts: () => void;
}) {
  return (
    <button
      className="mb-1 -ml-2 flex w-max cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted active:scale-[0.98]"
      onClick={onOpenThoughts}
    >
      <Lightbulb className="size-3.5" />
      <span>Thought for {label}</span>
    </button>
  );
}

export function SourceBadge({
  label,
  domain,
  onClick,
}: {
  label: string
  domain: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="ml-1 inline-flex items-center gap-1 rounded-md border border-border bg-white px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground shadow-xs transition-colors hover:bg-muted active:scale-[0.98] dark:bg-card"
    >
      <div className="flex h-3 w-3 items-center justify-center rounded-sm bg-muted text-[6px] font-bold">
        {domain[0]}
      </div>
      {label}
    </button>
  )
}

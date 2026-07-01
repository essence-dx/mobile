export function SettingsPlaceholder({ title }: { title: string }) {
  return (
    <>
      <h2 className="mb-6 text-lg font-bold text-foreground md:text-xl">
        {title}
      </h2>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">🚧</span>
        </div>
        <p className="text-sm text-muted-foreground">
          This feature is coming soon
        </p>
      </div>
    </>
  )
}

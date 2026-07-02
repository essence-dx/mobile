export function SettingsAppearance({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-foreground md:mb-6 md:text-xl">Appearance</h2>
      <div className="flex items-center justify-between border-b border-border py-3">
        <div>
          <div className="font-medium text-foreground">Dark mode</div>
          <div className="text-sm text-muted-foreground">Use dark theme across DX</div>
        </div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={onToggleDarkMode}
            className="peer sr-only"
          />
          <div className="peer h-6 w-11 rounded-full bg-muted-foreground/20 peer-checked:bg-foreground peer-focus:ring-2 peer-focus:ring-ring peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-border after:bg-background after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
        </label>
      </div>
    </>
  );
}

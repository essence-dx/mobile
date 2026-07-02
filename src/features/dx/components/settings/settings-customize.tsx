import { Check, Info, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { DORA_COLORS, JARVIS_COLORS, PixelCanvas } from './pixel-canvas';

export function SettingsCustomize() {
  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-foreground md:mb-6 md:text-xl">Customize</h2>
      <div className="space-y-6 md:space-y-8">
        <div>
          <div className="mb-3 flex items-center gap-2 md:mb-4">
            <span className="text-[14px] font-medium text-foreground/80 md:text-[15px]">
              Customize Grok&apos;s Response
            </span>
            <Info className="size-4 text-muted-foreground" />
          </div>
          <div className="mb-3 flex flex-wrap gap-2 md:mb-4">
            <span className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-[12px] font-medium text-foreground shadow-xs md:text-[13px]">
              Custom <Check className="size-2.5" />
            </span>
            <span className="cursor-pointer rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground transition-all hover:bg-muted md:text-[13px]">
              Concise
            </span>
            <span className="cursor-pointer rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground transition-all hover:bg-muted md:text-[13px]">
              Formal
            </span>
            <span className="cursor-pointer rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground transition-all hover:bg-muted md:text-[13px]">
              Tutor
            </span>
          </div>
          <Textarea
            className="h-28 w-full resize-none rounded-xl border border-border p-3 text-[14px] md:h-32 md:rounded-2xl md:p-4 md:text-[15px]"
            placeholder="Instructions..."
            defaultValue="You are friday - I am essencefromexistence(essence/sumon) your creator and you are my ai friday so please act like more friend like Jarvis - main like Doraemon!!!"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium text-foreground/80 md:text-[15px]">
                Agent Library
              </span>
              <Info className="size-4 text-muted-foreground" />
            </div>
            <Button variant="outline" className="rounded-full text-[13px] md:text-[14px]">
              <Plus className="mr-1.5 size-3" />
              Create
            </Button>
          </div>
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-3 md:gap-4">
            <div className="flex w-[200px] flex-shrink-0 cursor-pointer snap-start items-center gap-3 rounded-xl border border-border p-3 transition-all hover:shadow-md md:w-[220px]">
              <div className="size-8 flex-shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted shadow-inner">
                <PixelCanvas palette={DORA_COLORS} />
              </div>
              <div className="overflow-hidden">
                <div className="truncate text-[13px] font-semibold text-foreground md:text-[14px]">
                  doraemon
                </div>
                <div className="truncate text-[11px] text-muted-foreground md:text-[12px]">
                  act like the famous Jap...
                </div>
              </div>
            </div>
            <div className="flex w-[200px] flex-shrink-0 cursor-pointer snap-start items-center gap-3 rounded-xl border border-border p-3 transition-all hover:shadow-md md:w-[220px]">
              <div className="size-8 flex-shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted shadow-inner">
                <PixelCanvas palette={JARVIS_COLORS} />
              </div>
              <div className="overflow-hidden">
                <div className="truncate text-[13px] font-semibold text-foreground md:text-[14px]">
                  jarvis
                </div>
                <div className="truncate text-[11px] text-muted-foreground md:text-[12px]">
                  Act like the A.I. that the...
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[12px] leading-relaxed text-muted-foreground md:mt-4 md:text-[13px]">
            Changes will only apply to new conversations, not existing ones.
          </div>
        </div>
      </div>
    </>
  );
}

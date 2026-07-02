import { CircleSlash, Languages, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SettingsAccount() {
  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-foreground md:mb-6 md:text-xl">Account</h2>
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-border py-3 md:py-4">
          <div className="flex items-center gap-3 overflow-hidden md:gap-4">
            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
              EF
            </div>
            <div className="truncate">
              <div className="truncate text-[14px] font-medium text-foreground md:text-[15px]">
                Essence From Existence
              </div>
              <div className="truncate text-[12px] text-muted-foreground md:text-[13px]">
                essencefromexistence@gmail.com
              </div>
            </div>
          </div>
          <Button variant="outline" className="ml-2 flex-shrink-0 rounded-full text-xs md:text-sm">
            Manage
          </Button>
        </div>

        <div className="flex items-center justify-between border-b border-border py-3 md:py-4">
          <div className="flex items-center gap-3">
            <CircleSlash className="size-5 text-foreground/80 md:size-[22px]" />
            <span className="text-[14px] text-foreground md:text-[15px]">SuperGrok</span>
          </div>
          <Button variant="outline" className="rounded-full text-xs md:text-sm">
            Manage
          </Button>
        </div>

        <div className="flex items-center justify-between border-b border-border py-3 md:py-4">
          <div className="flex items-center gap-3">
            <X className="size-5 text-foreground/80 md:size-[22px]" />
            <span className="text-[14px] text-foreground md:text-[15px]">X Account</span>
          </div>
          <Button variant="outline" className="rounded-full text-xs md:text-sm">
            Connect
          </Button>
        </div>

        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-foreground md:text-[15px]">Language</span>
            <Languages className="size-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="rounded-full text-xs md:text-sm">
            Change
          </Button>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-[14px] text-foreground md:text-[15px]">Birth Year</span>
          <span className="ml-2 text-[14px] text-muted-foreground md:text-[15px]">2000</span>
        </div>
      </div>
    </>
  );
}

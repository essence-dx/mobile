import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SidebarItem({
  icon: Icon,
  label,
  collapsed,
  active,
  badge,
}: {
  icon: React.ElementType
  label: string
  collapsed: boolean
  active?: boolean
  badge?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group flex items-center gap-3 rounded-lg py-2.5 text-left text-[15px] font-medium transition-colors md:py-2 md:text-sm",
            collapsed ? "w-auto justify-center px-0" : "w-full px-3",
            active
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <motion.span
            className="flex"
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Icon className="size-[18px] flex-shrink-0 text-muted-foreground md:size-4" />
          </motion.span>
          {!collapsed && (
            <>
              <span className="truncate">{label}</span>
              {badge && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    delay: 0.1,
                  }}
                  className="flex-shrink-0 rounded-full border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold text-orange-600 dark:border-orange-800 dark:bg-orange-950"
                >
                  {badge}
                </motion.span>
              )}
            </>
          )}
        </button>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  )
}

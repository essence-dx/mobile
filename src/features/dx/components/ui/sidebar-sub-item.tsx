import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SidebarSubItem({
  icon: Icon,
  label,
  collapsed,
}: {
  icon: React.ElementType
  label: string
  collapsed: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:py-1.5 md:text-sm",
            collapsed && "justify-center px-0"
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
          {!collapsed && <span className="truncate">{label}</span>}
        </button>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  )
}

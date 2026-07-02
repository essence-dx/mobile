import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export function HistoryItem({
  icon: Icon,
  label,
  collapsed,
  active,
}: {
  icon?: React.ElementType;
  label: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-3 truncate rounded-lg px-3 py-2 text-left text-[15px] transition-colors md:py-1.5 md:text-sm',
        active
          ? 'bg-muted font-medium text-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
    >
      {Icon && (
        <motion.span
          className="flex"
          whileHover={{ scale: 1.15, rotate: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Icon className="size-[18px] flex-shrink-0 text-muted-foreground md:size-4" />
        </motion.span>
      )}
      {!Icon && collapsed === false && <span className="pl-7" />}
      <span className="truncate">{label}</span>
    </button>
  );
}

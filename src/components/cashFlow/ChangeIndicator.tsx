
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ChangeIndicatorProps {
  change: number | null;
  className?: string;
}

const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ change, className }) => {
  if (change === null) return null;

  const isPositive = change > 0;
  const IconComponent = isPositive ? ArrowUp : ArrowDown;
  const colorClass = isPositive ? 'text-emerald-500' : 'text-red-500';

  return (
    <div className={cn("inline-flex items-center justify-end gap-1 w-full", className)}>
      <IconComponent className={cn('h-3 w-3', colorClass)} />
      <span className={cn('text-[10px] font-mono tabular-nums', colorClass)}>
        {Math.abs(change).toFixed(1)}%
      </span>
    </div>
  );
};

export default ChangeIndicator;


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
    <div className={cn("flex items-center justify-end gap-1", className)}>
      <IconComponent className={cn('h-4 w-4', colorClass)} />
      <span className={cn('text-xs tabular-nums', colorClass)}>
        {Math.abs(change).toFixed(1)}%
      </span>
    </div>
  );
};

export default ChangeIndicator;


import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollableTableWrapperProps {
  children: React.ReactNode;
}

const ScrollableTableWrapper: React.FC<ScrollableTableWrapperProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <ScrollArea className="h-auto max-h-[calc(100vh-200px)]">
        <div className="min-w-max">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScrollableTableWrapper;

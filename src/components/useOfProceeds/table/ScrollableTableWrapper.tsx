
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollableTableWrapperProps {
  children: React.ReactNode;
}

const ScrollableTableWrapper: React.FC<ScrollableTableWrapperProps> = ({ children }) => {
  return (
    <ScrollArea className="h-auto max-h-[calc(100vh-200px)] overflow-y-auto">
      {children}
    </ScrollArea>
  );
};

export default ScrollableTableWrapper;

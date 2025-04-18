
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScrollableTableWrapperProps {
  children: React.ReactNode;
}

const ScrollableTableWrapper: React.FC<ScrollableTableWrapperProps> = ({ children }) => {
  return (
    <ScrollArea className="max-h-[800px]">
      {children}
    </ScrollArea>
  );
};

export default ScrollableTableWrapper;

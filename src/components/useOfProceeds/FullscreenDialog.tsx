
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FullscreenDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const FullscreenDialog: React.FC<FullscreenDialogProps> = ({
  isOpen,
  onOpenChange,
  children
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-4 z-50 bg-background rounded-lg shadow-lg overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Use of Proceeds Table</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-4">
          <ScrollArea className="h-full">
            {children}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullscreenDialog;

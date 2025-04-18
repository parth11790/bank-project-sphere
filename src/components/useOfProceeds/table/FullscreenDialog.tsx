
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Minimize2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FullscreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FullscreenDialog: React.FC<FullscreenDialogProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed inset-4 z-50 bg-background rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <ScrollArea className="h-full">
              {children}
            </ScrollArea>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FullscreenDialog;


import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (items: { name: string }[]) => void;
  type: 'documents' | 'forms';
  participantName: string;
}

const AssignmentDialog: React.FC<AssignmentDialogProps> = ({ 
  open, 
  onOpenChange,
  onSave,
  type,
  participantName
}) => {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const [currentItem, setCurrentItem] = useState('');

  const handleAddItem = () => {
    if (currentItem.trim() === '') return;
    
    setItems([...items, { id: `temp-${Date.now()}`, name: currentItem.trim() }]);
    setCurrentItem('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    onSave(items);
    setItems([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'documents' ? 'Assign Documents' : 'Assign Forms'} 
          </DialogTitle>
          <DialogDescription>
            {type === 'documents' 
              ? `Specify documents required from ${participantName}`
              : `Specify forms that ${participantName} needs to complete`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={type === 'documents' ? "Enter document name..." : "Enter form name..."}
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {items.length === 0 
                ? `No ${type} added yet` 
                : `${items.length} ${type} to assign:`
              }
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {items.map(item => (
                <Badge key={item.id} className="flex items-center gap-1 py-1.5">
                  {item.name}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setItems([]);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={items.length === 0}
          >
            Assign {type === 'documents' ? 'Documents' : 'Forms'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddColumnDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  newColumnName: string;
  setNewColumnName: (name: string) => void;
  onAddColumn: () => void;
  validationErrors?: { [key: string]: string };
  validateColumnName?: (name: string) => string | null;
}

export const AddColumnDialog: React.FC<AddColumnDialogProps> = ({
  isOpen,
  setIsOpen,
  newColumnName,
  setNewColumnName,
  onAddColumn,
  validationErrors = {},
  validateColumnName
}) => {
  const hasError = !!validationErrors.newColumnName;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(e.target.value);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Plus size={16} />
          <span>Add Column</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
          <DialogDescription>
            Enter a name for the new column
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="columnName">Column Name</Label>
          <Input
            id="columnName"
            value={newColumnName}
            onChange={handleInputChange}
            placeholder="e.g. Phase 1"
            className={`mt-2 ${hasError ? 'border-destructive' : ''}`}
          />
          {hasError && (
            <p className="text-sm text-destructive mt-1">{validationErrors.newColumnName}</p>
          )}
        </div>
        <DialogFooter>
          <Button 
            variant="outline"
            onClick={handleClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={onAddColumn}
            disabled={hasError || !newColumnName.trim()}
          >
            Add Column
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CustomAddBackRow {
  id: string;
  label: string;
  fieldName: string;
}

interface CustomAddBackManagerProps {
  customRows: CustomAddBackRow[];
  onAddRow: (row: CustomAddBackRow) => void;
  onRemoveRow: (id: string) => void;
}

const CustomAddBackManager: React.FC<CustomAddBackManagerProps> = ({
  customRows,
  onAddRow,
  onRemoveRow
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRowLabel, setNewRowLabel] = useState('');

  const handleAddRow = () => {
    if (!newRowLabel.trim()) {
      toast.error('Please enter a row name');
      return;
    }

    const fieldName = `custom_${newRowLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${Date.now()}`;
    const newRow: CustomAddBackRow = {
      id: fieldName,
      label: `${newRowLabel} ($)`,
      fieldName
    };

    onAddRow(newRow);
    setNewRowLabel('');
    setIsDialogOpen(false);
    toast.success(`Added "${newRowLabel}" to Add back / Adjustments`);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Plus className="h-3 w-3" />
            Add Custom Row
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Add-back Row</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rowName">Row Name</Label>
              <Input
                id="rowName"
                placeholder="e.g., Owner Salary Add Back"
                value={newRowLabel}
                onChange={(e) => setNewRowLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddRow();
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRow}>
                Add Row
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {customRows.length > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Custom rows:</span>
          {customRows.map((row) => (
            <Button
              key={row.id}
              variant="ghost"
              size="sm"
              onClick={() => onRemoveRow(row.id)}
              className="h-6 px-2 text-xs flex items-center gap-1"
            >
              {row.label.replace(' ($)', '')}
              <Trash2 className="h-3 w-3" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomAddBackManager;

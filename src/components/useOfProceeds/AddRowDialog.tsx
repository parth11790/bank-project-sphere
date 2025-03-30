
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedOverallCategory: string;
  newRowCategory: string;
  filteredCategories: string[];
  onOverallCategoryChange: (value: string) => void;
  setNewRowCategory: (category: string) => void;
  onAddRow: () => void;
  uniqueOverallCategories: string[];
}

export const AddRowDialog: React.FC<AddRowDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedOverallCategory,
  newRowCategory,
  filteredCategories,
  onOverallCategoryChange,
  setNewRowCategory,
  onAddRow,
  uniqueOverallCategories
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Plus size={16} />
          <span>Add Row</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Select an overall category and category for the new row
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="overallCategory">Overall Category</Label>
            <Select
              value={selectedOverallCategory}
              onValueChange={onOverallCategoryChange}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select an overall category" />
              </SelectTrigger>
              <SelectContent>
                {uniqueOverallCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newRowCategory}
              onValueChange={setNewRowCategory}
              disabled={filteredCategories.length === 0}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onAddRow}>Add Row</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

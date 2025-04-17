
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedOverallCategory: string;
  newRowCategory: string;
  filteredCategories: string[];
  onOverallCategoryChange: (value: string) => void;
  setNewRowCategory: (value: string) => void;
  onAddRow: () => void;
  uniqueOverallCategories: string[];
  validationErrors?: { [key: string]: string };
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
  uniqueOverallCategories,
  validationErrors = {}
}) => {
  const overallCategoryError = validationErrors.overallCategory;
  const categoryError = validationErrors.rowCategory;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Row</DialogTitle>
          <DialogDescription>
            Select a category for the new row
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="overallCategory" className={overallCategoryError ? 'text-destructive' : ''}>
              Overall Category
            </Label>
            <Select value={selectedOverallCategory} onValueChange={onOverallCategoryChange}>
              <SelectTrigger
                id="overallCategory"
                className={`mt-2 ${overallCategoryError ? 'border-destructive' : ''}`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {uniqueOverallCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {overallCategoryError && (
              <p className="text-sm text-destructive mt-1">{overallCategoryError}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="rowCategory" className={categoryError ? 'text-destructive' : ''}>
              Row Category
            </Label>
            <Select
              value={newRowCategory}
              onValueChange={setNewRowCategory}
              disabled={!selectedOverallCategory || filteredCategories.length === 0}
            >
              <SelectTrigger
                id="rowCategory"
                className={`mt-2 ${categoryError ? 'border-destructive' : ''}`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {categoryError && (
              <p className="text-sm text-destructive mt-1">{categoryError}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={onAddRow}
            disabled={!selectedOverallCategory || !newRowCategory}
          >
            Add Row
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

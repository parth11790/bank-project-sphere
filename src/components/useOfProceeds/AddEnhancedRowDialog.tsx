
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CategoryOption } from './categoryOptions';
import { Search } from 'lucide-react';

interface AddEnhancedRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddRow: (overallCategory: string, rowName: string) => void;
  uniqueOverallCategories: string[];
  categoryOptions: CategoryOption[];
}

const AddEnhancedRowDialog: React.FC<AddEnhancedRowDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddRow,
  categoryOptions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<CategoryOption | null>(null);

  // Filter options based on search query
  const filteredOptions = searchQuery.trim() === '' 
    ? categoryOptions 
    : categoryOptions.filter(option => 
        option.overall.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Reset the form when dialog opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedOption(null);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (selectedOption) {
      onAddRow(selectedOption.overall, selectedOption.category);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Row</DialogTitle>
          <DialogDescription>
            Select a row from the list below to add to the table
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search categories..."
            className="pl-8 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ScrollArea className="h-72 rounded-md border">
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No matching categories found</p>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={`${option.overall}-${option.category}-${index}`}
                  className={`flex flex-col p-2 rounded-md cursor-pointer ${
                    selectedOption &&
                    selectedOption.overall === option.overall &&
                    selectedOption.category === option.category
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  <span className="font-medium">{option.category}</span>
                  <span className="text-xs text-muted-foreground">
                    Category: {option.overall}
                  </span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            Add Row
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEnhancedRowDialog;

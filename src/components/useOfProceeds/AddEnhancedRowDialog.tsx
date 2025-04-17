
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CategoryOption } from './categoryOptions';
import { Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AddEnhancedRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddRow: (overallCategory: string, rowName: string) => void;
  onAddMultipleRows?: (selectedOptions: Array<{overall: string, category: string}>) => void;
  uniqueOverallCategories: string[];
  categoryOptions: CategoryOption[];
}

const AddEnhancedRowDialog: React.FC<AddEnhancedRowDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddRow,
  onAddMultipleRows,
  categoryOptions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);

  // Filter options based on search query
  const filteredOptions = searchQuery.trim() === '' 
    ? categoryOptions 
    : categoryOptions.filter(option => 
        option.overall.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Reset the form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedOptions([]);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (onAddMultipleRows && selectedOptions.length > 0) {
      onAddMultipleRows(selectedOptions);
      setIsOpen(false);
    } else if (selectedOptions.length === 1) {
      onAddRow(selectedOptions[0].overall, selectedOptions[0].category);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const toggleOption = (option: CategoryOption) => {
    if (isOptionSelected(option)) {
      setSelectedOptions(selectedOptions.filter(
        item => !(item.overall === option.overall && item.category === option.category)
      ));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option: CategoryOption) => {
    return selectedOptions.some(
      item => item.overall === option.overall && item.category === option.category
    );
  };

  const removeSelectedOption = (option: CategoryOption) => {
    setSelectedOptions(selectedOptions.filter(
      item => !(item.overall === option.overall && item.category === option.category)
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Rows</DialogTitle>
          <DialogDescription>
            Select one or more rows from the list below to add to the table
          </DialogDescription>
        </DialogHeader>
        
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search categories..."
            className="pl-8 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Selected options area */}
        {selectedOptions.length > 0 && (
          <div className="border rounded-md p-2 space-y-2">
            <div className="text-sm font-medium">Selected Categories ({selectedOptions.length})</div>
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map((option, index) => (
                <Badge 
                  key={`selected-${option.overall}-${option.category}-${index}`}
                  variant="secondary"
                  className="flex items-center gap-1 pl-2 pr-1 py-1"
                >
                  <span className="text-xs">{option.category}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeSelectedOption(option)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Categories list */}
        <ScrollArea className="h-72 rounded-md border">
          <div className="p-1">
            {filteredOptions.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No matching categories found</p>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={`${option.overall}-${option.category}-${index}`}
                  className={`flex flex-col p-2 rounded-md cursor-pointer ${
                    isOptionSelected(option)
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => toggleOption(option)}
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
            disabled={selectedOptions.length === 0}
          >
            Add {selectedOptions.length > 0 ? `${selectedOptions.length} ${selectedOptions.length === 1 ? 'Row' : 'Rows'}` : 'Rows'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEnhancedRowDialog;

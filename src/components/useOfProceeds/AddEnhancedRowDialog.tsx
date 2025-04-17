
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AddEnhancedRowDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddRow: (overallCategory: string, rowName: string) => void;
  uniqueOverallCategories: string[];
  categoryOptions: Array<{ overall: string; category: string }>;
}

const AddEnhancedRowDialog: React.FC<AddEnhancedRowDialogProps> = ({
  isOpen,
  setIsOpen,
  onAddRow,
  uniqueOverallCategories,
  categoryOptions
}) => {
  const [selectedOverallCategory, setSelectedOverallCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Handle overall category change
  useEffect(() => {
    if (selectedOverallCategory) {
      const filtered = categoryOptions
        .filter(option => option.overall === selectedOverallCategory)
        .map(option => option.category);
      
      setFilteredCategories(filtered);
      if (filtered.length > 0) {
        setSelectedCategory(filtered[0]);
      } else {
        setSelectedCategory('');
      }
    } else {
      setFilteredCategories([]);
      setSelectedCategory('');
    }
  }, [selectedOverallCategory, categoryOptions]);

  const handleSubmit = () => {
    if (selectedOverallCategory && selectedCategory) {
      onAddRow(selectedOverallCategory, selectedCategory);
      
      // Reset form
      setSelectedOverallCategory('');
      setSelectedCategory('');
    }
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Row</h2>
        <p className="text-sm text-muted-foreground mb-4">Select the category for the new row</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Overall Category</label>
            <select
              value={selectedOverallCategory}
              onChange={(e) => setSelectedOverallCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
            >
              <option value="">Select an overall category</option>
              {uniqueOverallCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              disabled={filteredCategories.length === 0}
            >
              <option value="">Select a category</option>
              {filteredCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOverallCategory || !selectedCategory}
          >
            Add Row
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default AddEnhancedRowDialog;

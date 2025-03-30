
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormTemplate, Document } from '@/types/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (items: FormTemplate[] | Document[]) => void;
  type: 'documents' | 'forms';
  participantName: string;
  availableItems: FormTemplate[] | Document[];
}

const AssignmentDialog: React.FC<AssignmentDialogProps> = ({ 
  open, 
  onOpenChange,
  onSave,
  type,
  participantName,
  availableItems
}) => {
  // Initialize with proper type assertion based on the type prop
  const [selectedItems, setSelectedItems] = useState<FormTemplate[] | Document[]>(
    type === 'forms' ? ([] as FormTemplate[]) : ([] as Document[])
  );
  const [currentItemId, setCurrentItemId] = useState<string>('');

  const handleAddItem = () => {
    if (!currentItemId) return;
    
    const itemToAdd = availableItems.find(item => 
      'form_id' in item 
        ? item.form_id === currentItemId
        : item.document_id === currentItemId
    );
    
    if (itemToAdd && !selectedItems.some(item => 
      'form_id' in item && 'form_id' in itemToAdd
        ? item.form_id === itemToAdd.form_id
        : 'document_id' in item && 'document_id' in itemToAdd
          ? item.document_id === itemToAdd.document_id
          : false
    )) {
      // Use type assertion with proper type guard
      if (type === 'forms' && 'form_id' in itemToAdd) {
        setSelectedItems(prevItems => {
          // Ensure we're dealing with FormTemplate[]
          const prevForms = prevItems as FormTemplate[];
          return [...prevForms, itemToAdd as FormTemplate] as FormTemplate[];
        });
      } else if (type === 'documents' && 'document_id' in itemToAdd) {
        setSelectedItems(prevItems => {
          // Ensure we're dealing with Document[]
          const prevDocs = prevItems as Document[];
          return [...prevDocs, itemToAdd as Document] as Document[];
        });
      }
      setCurrentItemId('');
    }
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prevItems => {
      return prevItems.filter(item => 
        'form_id' in item 
          ? item.form_id !== id
          : item.document_id !== id
      ) as FormTemplate[] | Document[];
    });
  };

  const handleSubmit = () => {
    onSave(selectedItems);
    // Reset with proper type assertion
    setSelectedItems(type === 'forms' ? ([] as FormTemplate[]) : ([] as Document[]));
  };

  const availableItemsFiltered = availableItems.filter(item => {
    const id = 'form_id' in item ? item.form_id : item.document_id;
    return !selectedItems.some(selectedItem => 
      'form_id' in selectedItem && 'form_id' in item
        ? selectedItem.form_id === item.form_id
        : 'document_id' in selectedItem && 'document_id' in item
          ? selectedItem.document_id === item.document_id
          : false
    );
  });

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
            <Select
              value={currentItemId}
              onValueChange={setCurrentItemId}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={type === 'documents' ? "Select a document..." : "Select a form..."} />
              </SelectTrigger>
              <SelectContent>
                {availableItemsFiltered.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No {type} available
                  </SelectItem>
                ) : (
                  availableItemsFiltered.map((item) => (
                    <SelectItem 
                      key={'form_id' in item ? item.form_id : item.document_id} 
                      value={'form_id' in item ? item.form_id : item.document_id}
                    >
                      {item.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleAddItem} disabled={!currentItemId || currentItemId === 'none'}>
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              {selectedItems.length === 0 
                ? `No ${type} added yet` 
                : `${selectedItems.length} ${type} to assign:`
              }
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {selectedItems.map(item => {
                const id = 'form_id' in item ? item.form_id : item.document_id;
                return (
                  <Badge key={id} className="flex items-center gap-1 py-1.5">
                    {item.name}
                    <button 
                      onClick={() => handleRemoveItem(id)}
                      className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setSelectedItems(type === 'forms' ? ([] as FormTemplate[]) : ([] as Document[]));
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedItems.length === 0}
          >
            Assign {type === 'documents' ? 'Documents' : 'Forms'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;

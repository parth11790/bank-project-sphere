
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DropdownValueEditorProps {
  title: string;
  description: string;
  initialValues: string[];
  isRestricted?: boolean;
  onSave?: (values: string[]) => void;
}

export function DropdownValueEditor({
  title,
  description,
  initialValues,
  isRestricted = false,
  onSave
}: DropdownValueEditorProps) {
  const [values, setValues] = useState<string[]>(initialValues);
  const [newValue, setNewValue] = useState('');
  
  // Update values when initialValues change (for when reset occurs)
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleAdd = () => {
    if (isRestricted) {
      toast.error('This dropdown is SBA defined and cannot be modified');
      return;
    }
    
    if (!newValue.trim()) {
      toast.error('Please enter a value');
      return;
    }
    
    if (values.includes(newValue.trim())) {
      toast.error('This value already exists');
      return;
    }
    
    setValues([...values, newValue.trim()]);
    setNewValue('');
    toast.success('Value added successfully');
  };

  const handleRemove = (valueToRemove: string) => {
    if (isRestricted) {
      toast.error('This dropdown is SBA defined and cannot be modified');
      return;
    }
    
    setValues(values.filter((value) => value !== valueToRemove));
    toast.success('Value removed successfully');
  };

  const handleSave = () => {
    if (isRestricted) {
      toast.error('This dropdown is SBA defined and cannot be modified');
      return;
    }
    
    // If onSave is provided, call it with the current values
    if (onSave) {
      onSave(values);
    } else {
      // Default behavior for admin settings
      toast.success('Changes saved successfully');
    }
  };

  return (
    <div className="space-y-4">
      {isRestricted && (
        <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-xs">
          <AlertTriangle className="h-4 w-4" />
          <span>SBA defined values cannot be modified</span>
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <Input
          placeholder="Add new value..."
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
          disabled={isRestricted}
        />
        <Button onClick={handleAdd} size="icon" disabled={isRestricted}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge
            key={value}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {value}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleRemove(value)}
                    className={`ml-1 ${isRestricted ? 'text-gray-400 cursor-not-allowed' : 'hover:text-destructive'}`}
                    disabled={isRestricted}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                {isRestricted && (
                  <TooltipContent>
                    <p>SBA defined values cannot be removed</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </Badge>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full" disabled={isRestricted}>
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}

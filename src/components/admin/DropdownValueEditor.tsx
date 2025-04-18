
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

interface DropdownValueEditorProps {
  title: string;
  description: string;
  initialValues: string[];
}

export function DropdownValueEditor({
  title,
  description,
  initialValues
}: DropdownValueEditorProps) {
  const [values, setValues] = useState<string[]>(initialValues);
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
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
    setValues(values.filter((value) => value !== valueToRemove));
    toast.success('Value removed successfully');
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    toast.success('Changes saved successfully');
  };

  return (
    <div className="space-y-4">
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
        />
        <Button onClick={handleAdd} size="icon">
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
            <button
              onClick={() => handleRemove(value)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AddDropdownFormProps {
  onAdd: (id: string, label: string, description: string) => void;
}

export const AddDropdownForm = ({ onAdd }: AddDropdownFormProps) => {
  const [newDropdownName, setNewDropdownName] = useState('');

  const handleAddDropdown = () => {
    if (!newDropdownName.trim()) {
      toast.error('Please enter a name for the new dropdown');
      return;
    }

    const id = newDropdownName.toLowerCase().replace(/\s+/g, '_');
    const description = `Manage ${newDropdownName.toLowerCase()} options`;
    
    onAdd(id, newDropdownName, description);
    setNewDropdownName('');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Dropdown Type</CardTitle>
        <CardDescription>Create a new category of dropdown values to manage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Input
            placeholder="Enter dropdown name..."
            value={newDropdownName}
            onChange={(e) => setNewDropdownName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddDropdown();
              }
            }}
          />
          <Button onClick={handleAddDropdown}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

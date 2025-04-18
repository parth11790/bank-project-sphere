
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { DropdownValueEditor } from './DropdownValueEditor';
import { toast } from 'sonner';

export type DropdownType = 'entityTypes' | 'loanTypes' | 'projectStatus' | string;

const initialDropdownConfigs = [
  {
    id: 'entityTypes',
    label: 'Entity Types',
    description: 'Manage entity type options',
    initialValues: ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship']
  },
  {
    id: 'loanTypes',
    label: 'Loan Types',
    description: 'Manage loan type options',
    initialValues: ['7(a)', '504', 'Express', 'Microloans']
  },
  {
    id: 'projectStatus',
    label: 'Project Status',
    description: 'Manage project status options',
    initialValues: ['Draft', 'In Progress', 'Under Review', 'Approved', 'Declined']
  }
];

export function DropdownManager() {
  const [dropdownConfigs, setDropdownConfigs] = useState(initialDropdownConfigs);
  const [newDropdownName, setNewDropdownName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddDropdown = () => {
    if (!newDropdownName.trim()) {
      toast.error('Please enter a name for the new dropdown');
      return;
    }

    const id = newDropdownName.toLowerCase().replace(/\s+/g, '_');
    
    if (dropdownConfigs.some(config => config.id === id)) {
      toast.error('A dropdown with this name already exists');
      return;
    }

    const newDropdown = {
      id,
      label: newDropdownName,
      description: `Manage ${newDropdownName.toLowerCase()} options`,
      initialValues: []
    };

    setDropdownConfigs([...dropdownConfigs, newDropdown]);
    setNewDropdownName('');
    setShowAddForm(false);
    toast.success('New dropdown type added successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          className="mb-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Dropdown Type
        </Button>
      </div>

      {showAddForm && (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dropdownConfigs.map((config) => (
          <Card key={config.id} className="w-full">
            <CardHeader>
              <CardTitle>{config.label}</CardTitle>
              <CardDescription>{config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownValueEditor
                title={config.label}
                description={config.description}
                initialValues={config.initialValues}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

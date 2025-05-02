
import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { sbaDropdownFields, CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownCard } from './DropdownCard';
import { AddDropdownForm } from './AddDropdownForm';
import { DropdownFilters } from './DropdownFilters';

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
  const [dropdownConfigs, setDropdownConfigs] = useState([...initialDropdownConfigs, ...sbaDropdownFields]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<CustomizationLevel | 'All'>('All');

  const modules = useMemo(() => {
    const moduleSet = new Set<string>();
    sbaDropdownFields.forEach(field => moduleSet.add(field.module));
    return ['All', ...Array.from(moduleSet)];
  }, []);

  const filteredDropdowns = useMemo(() => {
    return dropdownConfigs.filter(config => {
      if (activeTab !== 'all' && 'module' in config) {
        if (config.module !== activeTab) return false;
      }
      
      if (filterLevel !== 'All' && 'customizationLevel' in config) {
        if (config.customizationLevel !== filterLevel) return false;
      }
      
      return true;
    });
  }, [dropdownConfigs, activeTab, filterLevel]);

  const handleAddDropdown = (id: string, label: string, description: string) => {
    if (dropdownConfigs.some(config => config.id === id)) {
      toast.error('A dropdown with this name already exists');
      return;
    }

    const newDropdown = {
      id,
      label,
      description,
      customizationLevel: 'Lender Customizable' as CustomizationLevel,
      module: 'Custom',
      initialValues: []
    };

    setDropdownConfigs([...dropdownConfigs, newDropdown]);
    toast.success('New dropdown type added successfully');
    setShowAddForm(false);
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
        
        <DropdownFilters 
          filterLevel={filterLevel} 
          onFilterChange={(value) => setFilterLevel(value)}
        />
      </div>

      {showAddForm && (
        <AddDropdownForm onAdd={handleAddDropdown} />
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 overflow-x-auto flex-nowrap whitespace-nowrap w-full">
          <TabsTrigger value="all">All Dropdowns</TabsTrigger>
          {modules.filter(m => m !== 'All').map((module) => (
            <TabsTrigger key={module} value={module}>
              {module}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDropdowns.map((config) => (
              <DropdownCard
                key={config.id}
                id={config.id}
                label={config.label}
                description={config.description}
                initialValues={config.initialValues}
                customizationLevel={'customizationLevel' in config ? config.customizationLevel as CustomizationLevel : undefined}
                module={'module' in config ? config.module : undefined}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

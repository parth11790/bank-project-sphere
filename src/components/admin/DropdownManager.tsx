
import React, { useState, useMemo } from 'react';
import { Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { sbaDropdownFields, CustomizationLevel, DropdownField } from '@/lib/mockData/dropdownFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownCard } from './DropdownCard';
import { AddDropdownForm } from './AddDropdownForm';
import { DropdownFilters } from './DropdownFilters';
import { 
  Alert, 
  AlertDescription 
} from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type DropdownType = 'entityTypes' | 'loanTypes' | 'projectStatus' | string;

// Type for our extended dropdown config that includes both SBA fields and custom ones
type DropdownConfig = DropdownField | {
  id: string;
  label: string;
  description: string;
  initialValues: string[];
};

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

const customizationLevelInfo = {
  'SBA Defined': 'Values defined by SBA Standard Operating Procedures (SOP). Cannot be modified.',
  'SBA Influenced': 'Values influenced by SBA guidance but can be extended by lenders with caution.',
  'Lender Customizable': 'Values that can be fully customized by lenders to meet their business needs.'
};

export function DropdownManager() {
  const [dropdownConfigs, setDropdownConfigs] = useState<DropdownConfig[]>([...initialDropdownConfigs, ...sbaDropdownFields]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<CustomizationLevel | 'All'>('All');

  const modules = useMemo(() => {
    const moduleSet = new Set<string>();
    sbaDropdownFields.forEach(field => moduleSet.add(field.module));
    return ['All', ...Array.from(moduleSet)].sort();
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

    const newDropdown: DropdownConfig = {
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

  // Count dropdown fields by customization level
  const countByLevel = useMemo(() => {
    const counts = {
      'SBA Defined': 0,
      'SBA Influenced': 0,
      'Lender Customizable': 0
    };
    
    dropdownConfigs.forEach(config => {
      if ('customizationLevel' in config) {
        counts[config.customizationLevel]++;
      }
    });
    
    return counts;
  }, [dropdownConfigs]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(customizationLevelInfo).map(([level, description]) => (
          <div key={level} className="flex items-start space-x-2">
            <div className={`w-3 h-3 mt-1 rounded-full ${
              level === 'SBA Defined' ? 'bg-red-500' : 
              level === 'SBA Influenced' ? 'bg-amber-500' : 
              'bg-green-500'
            }`} />
            <div>
              <div className="flex items-center">
                <span className="font-medium">{level}</span>
                <span className="ml-2 text-sm text-muted-foreground">({countByLevel[level as CustomizationLevel]})</span>
              </div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

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
                customizationLevel={'customizationLevel' in config ? config.customizationLevel : undefined}
                module={'module' in config ? config.module : undefined}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

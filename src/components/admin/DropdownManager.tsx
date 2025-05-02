
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Filter } from 'lucide-react';
import { DropdownValueEditor } from './DropdownValueEditor';
import { toast } from 'sonner';
import { sbaDropdownFields, CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

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
  const [newDropdownName, setNewDropdownName] = useState('');
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
      customizationLevel: 'Lender Customizable' as CustomizationLevel,
      module: 'Custom',
      initialValues: []
    };

    setDropdownConfigs([...dropdownConfigs, newDropdown]);
    setNewDropdownName('');
    setShowAddForm(false);
    toast.success('New dropdown type added successfully');
  };

  const renderCustomizationLevelBadge = (level?: CustomizationLevel) => {
    if (!level) return null;
    
    let color = "bg-gray-100 text-gray-800";
    if (level === "SBA Defined") color = "bg-red-100 text-red-800";
    else if (level === "SBA Influenced") color = "bg-yellow-100 text-yellow-800";
    else if (level === "Lender Customizable") color = "bg-green-100 text-green-800";
    
    return (
      <Badge variant="outline" className={`${color} font-medium text-xs`}>
        {level}
      </Badge>
    );
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
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filterLevel}
            onValueChange={(value) => setFilterLevel(value as CustomizationLevel | 'All')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="SBA Defined">SBA Defined</SelectItem>
              <SelectItem value="SBA Influenced">SBA Influenced</SelectItem>
              <SelectItem value="Lender Customizable">Lender Customizable</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
              <Card key={config.id} className="w-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{config.label}</CardTitle>
                    {'customizationLevel' in config && 
                      renderCustomizationLevelBadge(config.customizationLevel)
                    }
                  </div>
                  <CardDescription className="mt-1">{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <DropdownValueEditor
                    title={config.label}
                    description={config.description}
                    initialValues={config.initialValues}
                    isRestricted={'customizationLevel' in config && config.customizationLevel === 'SBA Defined'}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

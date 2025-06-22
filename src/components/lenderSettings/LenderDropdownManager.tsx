import React, { useState, useMemo } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useLenderDropdowns } from '@/hooks/useLenderDropdowns';
import { DropdownValueEditor } from '@/components/admin/DropdownValueEditor';
import { CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';

export const LenderDropdownManager: React.FC = () => {
  const {
    customizableDropdowns,
    hasOverride,
    getDropdownValues,
    setDropdownValues,
    resetToDefault
  } = useLenderDropdowns();
  
  const [activeModuleTab, setActiveModuleTab] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<CustomizationLevel | 'All'>('Lender Customizable');
  
  // Get unique modules for tabs
  const modules = useMemo(() => {
    const moduleSet = new Set<string>();
    customizableDropdowns.forEach(dropdown => moduleSet.add(dropdown.module));
    return ['All', ...Array.from(moduleSet)].sort();
  }, [customizableDropdowns]);

  // Filter dropdowns based on active module tab
  const filteredDropdowns = useMemo(() => {
    return customizableDropdowns.filter(dropdown => {
      if (activeModuleTab !== 'all' && dropdown.module !== activeModuleTab) {
        return false;
      }
      
      if (filterLevel !== 'All' && filterLevel !== dropdown.customizationLevel) {
        return false;
      }
      
      return true;
    });
  }, [customizableDropdowns, activeModuleTab, filterLevel]);

  // Handle saving dropdown values
  const handleSaveValues = (fieldId: string, fieldLabel: string, values: string[]) => {
    setDropdownValues(fieldId, fieldLabel, values);
  };
  
  // Handle resetting to default values
  const handleResetToDefault = (fieldId: string, fieldLabel: string) => {
    resetToDefault(fieldId, fieldLabel);
  };

  // Count overridden dropdowns
  const overriddenCount = useMemo(() => {
    return customizableDropdowns.filter(dropdown => hasOverride(dropdown.id)).length;
  }, [customizableDropdowns, hasOverride]);

  return (
    <div className="space-y-6">
      <Alert variant="info" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="flex items-center">
          Lender-Specific Dropdown Values
          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">
            {overriddenCount} Customized
          </Badge>
        </AlertTitle>
        <AlertDescription>
          Customize dropdown values for your institution without affecting the core SBA application settings.
          Changes made here will be visible only to your organization.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={filterLevel === 'Lender Customizable' ? 'default' : 'outline'}
            onClick={() => setFilterLevel('Lender Customizable')}
          >
            Lender Customizable
          </Button>
          <Button 
            size="sm" 
            variant={filterLevel === 'All' ? 'default' : 'outline'}
            onClick={() => setFilterLevel('All')}
          >
            Show All
          </Button>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-sm text-muted-foreground cursor-help">
                <Info className="h-4 w-4 mr-1" />
                About Customization Levels
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs mb-2"><strong>Lender Customizable:</strong> Values that can be fully customized by lenders.</p>
              <p className="text-xs"><strong>SBA Defined:</strong> Values defined by SBA SOPs. Cannot be modified.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="all" value={activeModuleTab} onValueChange={setActiveModuleTab}>
        <TabsList className="mb-6 overflow-x-auto flex-nowrap whitespace-nowrap w-full">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {modules.filter(m => m !== 'All').map(module => (
            <TabsTrigger key={module} value={module}>
              {module}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeModuleTab}>
          {filteredDropdowns.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No customizable dropdown fields found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDropdowns.map((dropdown) => {
                const isOverridden = hasOverride(dropdown.id);
                const currentValues = getDropdownValues(dropdown.id);
                
                // Set border color based on customization level
                const getBorderStyle = () => {
                  return isOverridden ? 'border-blue-300' : '';
                };
                
                return (
                  <Card key={dropdown.id} className={`${isOverridden ? 'shadow-blue-100 shadow-sm' : ''} ${getBorderStyle()}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{dropdown.label}</CardTitle>
                        <div className="flex gap-1">
                          {isOverridden && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 font-medium text-xs">
                              Customized
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription className="mt-1">{dropdown.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <DropdownValueEditor
                          title={dropdown.label}
                          description={dropdown.description}
                          initialValues={currentValues}
                          isRestricted={false}
                          onSave={(values) => handleSaveValues(dropdown.id, dropdown.label, values)}
                        />
                        
                        {isOverridden && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2 text-xs" 
                            onClick={() => handleResetToDefault(dropdown.id, dropdown.label)}
                          >
                            <RefreshCcw className="h-3 w-3 mr-1" />
                            Reset to SBA Default
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};


import React, { useState } from 'react';
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
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useLenderDropdowns } from '@/hooks/useLenderDropdowns';
import { DropdownValueEditor } from '@/components/admin/DropdownValueEditor';

export const LenderDropdownManager: React.FC = () => {
  const {
    customizableDropdowns,
    hasOverride,
    getDropdownValues,
    setDropdownValues,
    resetToDefault
  } = useLenderDropdowns();
  
  const [activeModuleTab, setActiveModuleTab] = useState<string>("all");
  
  // Get unique modules for tabs
  const modules = Array.from(
    new Set(customizableDropdowns.map(dropdown => dropdown.module))
  );

  // Filter dropdowns based on active module tab
  const filteredDropdowns = activeModuleTab === "all" 
    ? customizableDropdowns 
    : customizableDropdowns.filter(dropdown => dropdown.module === activeModuleTab);

  // Handle saving dropdown values
  const handleSaveValues = (fieldId: string, fieldLabel: string, values: string[]) => {
    setDropdownValues(fieldId, fieldLabel, values);
  };
  
  // Handle resetting to default values
  const handleResetToDefault = (fieldId: string, fieldLabel: string) => {
    resetToDefault(fieldId, fieldLabel);
  };

  return (
    <div className="space-y-6">
      <Alert variant="info" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle>Lender-Specific Dropdown Values</AlertTitle>
        <AlertDescription>
          Customize dropdown values for your institution without affecting the core SBA application settings.
          Changes made here will be visible only to your organization.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" value={activeModuleTab} onValueChange={setActiveModuleTab}>
        <TabsList className="mb-6 overflow-x-auto flex-nowrap whitespace-nowrap w-full">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {modules.map(module => (
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
                
                return (
                  <Card key={dropdown.id} className={isOverridden ? 'border-blue-300 shadow-blue-100 shadow-sm' : ''}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{dropdown.label}</CardTitle>
                        {isOverridden && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 font-medium text-xs">
                            Customized
                          </Badge>
                        )}
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

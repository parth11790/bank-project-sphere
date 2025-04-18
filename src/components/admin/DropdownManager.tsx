
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownValueEditor } from './DropdownValueEditor';

export type DropdownType = 'entityTypes' | 'loanTypes' | 'projectStatus';

const dropdownConfigs = [
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
  const [activeTab, setActiveTab] = useState<DropdownType>('entityTypes');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dropdown Values Management</CardTitle>
        <CardDescription>
          Manage the values available in various dropdown menus throughout the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DropdownType)}>
          <TabsList className="grid grid-cols-3 w-full">
            {dropdownConfigs.map((config) => (
              <TabsTrigger key={config.id} value={config.id}>
                {config.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dropdownConfigs.map((config) => (
            <TabsContent key={config.id} value={config.id}>
              <DropdownValueEditor
                title={config.label}
                description={config.description}
                initialValues={config.initialValues}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

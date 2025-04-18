
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  return (
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
  );
}

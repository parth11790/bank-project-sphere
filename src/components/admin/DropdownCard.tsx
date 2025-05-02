
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownValueEditor } from './DropdownValueEditor';
import { Badge } from '@/components/ui/badge';
import { CustomizationLevel } from '@/lib/mockData/dropdownFields';

interface DropdownCardProps {
  id: string;
  label: string;
  description: string;
  initialValues: string[];
  customizationLevel?: CustomizationLevel;
  module?: string;
}

export const DropdownCard = ({
  id,
  label,
  description,
  initialValues,
  customizationLevel
}: DropdownCardProps) => {
  
  const renderCustomizationLevelBadge = (level: CustomizationLevel) => {
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
    <Card key={id} className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{label}</CardTitle>
          {customizationLevel && renderCustomizationLevelBadge(customizationLevel)}
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownValueEditor
          title={label}
          description={description}
          initialValues={initialValues}
          isRestricted={customizationLevel === 'SBA Defined'}
        />
      </CardContent>
    </Card>
  );
};

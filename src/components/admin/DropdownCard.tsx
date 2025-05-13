
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownValueEditor } from './DropdownValueEditor';
import { Badge } from '@/components/ui/badge';
import { CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  customizationLevel,
  module
}: DropdownCardProps) => {
  
  const renderCustomizationLevelBadge = (level: CustomizationLevel) => {
    let color = "bg-gray-100 text-gray-800";
    if (level === "SBA Defined") color = "bg-red-100 text-red-800";
    else if (level === "SBA Influenced") color = "bg-amber-100 text-amber-800";
    else if (level === "Lender Customizable") color = "bg-green-100 text-green-800";
    
    return (
      <Badge variant="outline" className={`${color} font-medium text-xs`}>
        {level}
      </Badge>
    );
  };

  // Different border colors based on customization level
  const getBorderStyle = () => {
    if (!customizationLevel) return "";
    
    if (customizationLevel === "SBA Defined") 
      return "border-red-200";
    else if (customizationLevel === "SBA Influenced") 
      return "border-amber-200";
    else if (customizationLevel === "Lender Customizable") 
      return "border-green-200";
    
    return "";
  };

  return (
    <Card key={id} className={`w-full ${getBorderStyle()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{label}</CardTitle>
          {customizationLevel && renderCustomizationLevelBadge(customizationLevel)}
        </div>
        <CardDescription className="mt-1">{description}</CardDescription>
        {module && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center text-xs text-muted-foreground mt-1">
                  <span className="mr-1">Module:</span> {module}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">This dropdown belongs to the {module} module</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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

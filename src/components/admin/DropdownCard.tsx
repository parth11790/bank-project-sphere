
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Lock } from 'lucide-react';
import { DropdownValueEditor } from './DropdownValueEditor';
import { CustomizationLevel } from '@/lib/mockData/dropdownFields';

interface DropdownCardProps {
  id: string;
  label: string;
  description: string;
  initialValues: string[];
  customizationLevel?: CustomizationLevel;
  module?: string;
}

export function DropdownCard({
  id,
  label,
  description,
  initialValues,
  customizationLevel,
  module
}: DropdownCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const isRestricted = customizationLevel === 'SBA Defined';
  
  const getBadgeColor = () => {
    if (!customizationLevel) return 'bg-blue-100 text-blue-800';
    
    switch (customizationLevel) {
      case 'SBA Defined':
        return 'bg-red-100 text-red-800';
      case 'Lender Customizable':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{label}</CardTitle>
          <div className="flex gap-1">
            {module && (
              <Badge variant="outline" className="text-xs">
                {module}
              </Badge>
            )}
            {customizationLevel && (
              <Badge className={`text-xs ${getBadgeColor()}`}>
                {customizationLevel}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {initialValues.length} values
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isRestricted}
            >
              {isRestricted ? (
                <Lock className="h-4 w-4 mr-2" />
              ) : (
                <Settings className="h-4 w-4 mr-2" />
              )}
              {isRestricted ? 'Locked' : 'Edit'}
            </Button>
          </div>
          
          {isEditing && (
            <DropdownValueEditor
              title={label}
              description={description}
              initialValues={initialValues}
              isRestricted={isRestricted}
              onSave={(values) => {
                console.log('Saved values for', id, ':', values);
                setIsEditing(false);
              }}
            />
          )}
          
          {!isEditing && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Current values:</p>
              <div className="flex flex-wrap gap-1">
                {initialValues.slice(0, 3).map((value, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {value}
                  </Badge>
                ))}
                {initialValues.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{initialValues.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

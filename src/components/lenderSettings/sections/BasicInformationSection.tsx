
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LenderInfo } from '@/contexts/LenderContext';

interface BasicInformationSectionProps {
  lenderInfo: LenderInfo;
  editForm: LenderInfo;
  isEditing: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
}

export const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  lenderInfo,
  editForm,
  isEditing,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Lender Name</Label>
          {isEditing ? (
            <Input
              id="name"
              value={editForm.name}
              onChange={(e) => onInputChange('name', e.target.value)}
            />
          ) : (
            <p className="text-sm">{lenderInfo.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nmlsId">NMLS ID</Label>
          {isEditing ? (
            <Input
              id="nmlsId"
              value={editForm.nmlsId}
              onChange={(e) => onInputChange('nmlsId', e.target.value)}
            />
          ) : (
            <p className="text-sm">{lenderInfo.nmlsId}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          {isEditing ? (
            <Input
              id="contactEmail"
              type="email"
              value={editForm.contactEmail}
              onChange={(e) => onInputChange('contactEmail', e.target.value)}
            />
          ) : (
            <p className="text-sm">{lenderInfo.contactEmail}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          {isEditing ? (
            <Input
              id="contactPhone"
              type="tel"
              value={editForm.contactPhone}
              onChange={(e) => onInputChange('contactPhone', e.target.value)}
            />
          ) : (
            <p className="text-sm">{lenderInfo.contactPhone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          {isEditing ? (
            <Input
              id="website"
              type="url"
              value={editForm.website}
              onChange={(e) => onInputChange('website', e.target.value)}
            />
          ) : (
            <p className="text-sm">
              <a href={lenderInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {lenderInfo.website}
              </a>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

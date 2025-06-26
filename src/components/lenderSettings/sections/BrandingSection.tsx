
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { LenderInfo } from '@/contexts/LenderContext';

interface BrandingSectionProps {
  lenderInfo: LenderInfo;
  editForm: LenderInfo;
  isEditing: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
}

export const BrandingSection: React.FC<BrandingSectionProps> = ({
  lenderInfo,
  editForm,
  isEditing,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Logo</Label>
          {isEditing ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Click to upload logo</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 text-center">
              {lenderInfo.logoUrl ? (
                <img src={lenderInfo.logoUrl} alt="Lender Logo" className="h-16 mx-auto" />
              ) : (
                <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No logo uploaded</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={editForm.primaryColor}
                  onChange={(e) => onInputChange('primaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={editForm.primaryColor}
                  onChange={(e) => onInputChange('primaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: lenderInfo.primaryColor }}
                />
                <span className="text-sm">{lenderInfo.primaryColor}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={editForm.secondaryColor}
                  onChange={(e) => onInputChange('secondaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={editForm.secondaryColor}
                  onChange={(e) => onInputChange('secondaryColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: lenderInfo.secondaryColor }}
                />
                <span className="text-sm">{lenderInfo.secondaryColor}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { LenderInfo } from '@/contexts/LenderContext';

interface ComplianceSectionProps {
  lenderInfo: LenderInfo;
  editForm: LenderInfo;
  isEditing: boolean;
  onInputChange: (field: string, value: string | boolean) => void;
}

export const ComplianceSection: React.FC<ComplianceSectionProps> = ({
  lenderInfo,
  editForm,
  isEditing,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal & Compliance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="complianceStatement">Compliance Statement</Label>
          {isEditing ? (
            <Textarea
              id="complianceStatement"
              value={editForm.complianceStatement}
              onChange={(e) => onInputChange('complianceStatement', e.target.value)}
              rows={3}
            />
          ) : (
            <p className="text-sm">{lenderInfo.complianceStatement}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Equal Housing Lender
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Member FDIC
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

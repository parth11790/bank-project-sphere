
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, Save, Edit, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLender } from '@/contexts/LenderContext';

export const LenderProfileTab: React.FC = () => {
  const { lenderInfo, updateLenderInfo } = useLender();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(lenderInfo);

  const handleEdit = () => {
    setEditForm(lenderInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateLenderInfo(editForm);
    setIsEditing(false);
    toast.success('Lender profile updated successfully');
    console.log('[AUDIT] Lender profile updated by Current User at', new Date().toISOString());
  };

  const handleCancel = () => {
    setEditForm(lenderInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Lender Profile</h2>
            <p className="text-muted-foreground">
              Configure your white label branding and compliance information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
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
                  onChange={(e) => handleInputChange('nmlsId', e.target.value)}
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
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
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
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
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
                  onChange={(e) => handleInputChange('website', e.target.value)}
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
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={editForm.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
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
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={editForm.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
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
      </div>

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
                onChange={(e) => handleInputChange('complianceStatement', e.target.value)}
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
    </div>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface LenderProfileData {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  privacyPolicyUrl: string;
  termsConditionsUrl: string;
  userPolicyUrl: string;
  supportEmail: string;
  supportPhone: string;
  companyAddress: string;
  website: string;
  description: string;
}

export const LenderProfileTab = () => {
  const [profileData, setProfileData] = useState<LenderProfileData>({
    companyName: 'First National Bank',
    logo: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    privacyPolicyUrl: 'https://example.com/privacy',
    termsConditionsUrl: 'https://example.com/terms',
    userPolicyUrl: 'https://example.com/user-policy',
    supportEmail: 'support@firstnational.com',
    supportPhone: '(555) 123-4567',
    companyAddress: '123 Banking St, Financial District, NY 10001',
    website: 'https://firstnational.com',
    description: 'Leading SBA lender committed to helping small businesses grow and succeed.'
  });

  const handleInputChange = (field: keyof LenderProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success('Lender profile updated successfully');
    console.log('Saving lender profile:', profileData);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to storage and get URL
      const mockUrl = `https://example.com/logos/${file.name}`;
      setProfileData(prev => ({ ...prev, logo: mockUrl }));
      toast.success('Logo uploaded successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lender Profile</h2>
          <p className="text-muted-foreground">
            Configure your white-label branding and company information
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={profileData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={profileData.supportEmail}
                  onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={profileData.supportPhone}
                  onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={profileData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={profileData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {profileData.logo ? (
                  <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded flex items-center justify-center">
                      <Eye className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Logo uploaded</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="text-sm text-muted-foreground">Upload logo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={profileData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-20"
                />
                <Input
                  value={profileData.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  placeholder="#2563eb"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={profileData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="w-20"
                />
                <Input
                  value={profileData.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  placeholder="#64748b"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Legal & Policy Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="privacyPolicyUrl">Privacy Policy URL</Label>
                <Input
                  id="privacyPolicyUrl"
                  value={profileData.privacyPolicyUrl}
                  onChange={(e) => handleInputChange('privacyPolicyUrl', e.target.value)}
                  placeholder="https://example.com/privacy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termsConditionsUrl">Terms & Conditions URL</Label>
                <Input
                  id="termsConditionsUrl"
                  value={profileData.termsConditionsUrl}
                  onChange={(e) => handleInputChange('termsConditionsUrl', e.target.value)}
                  placeholder="https://example.com/terms"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userPolicyUrl">User Policy URL</Label>
                <Input
                  id="userPolicyUrl"
                  value={profileData.userPolicyUrl}
                  onChange={(e) => handleInputChange('userPolicyUrl', e.target.value)}
                  placeholder="https://example.com/user-policy"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

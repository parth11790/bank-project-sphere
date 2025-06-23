import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, MapPin, Phone, Mail, Globe, Calendar, Edit, Save, X, Users } from 'lucide-react';
import { Business } from '@/types/business';
import { toast } from 'sonner';

interface EditableBusinessInfoSectionProps {
  business: Business;
}

const participantTypes = [
  "Primary Borrower",
  "Co-Borrower", 
  "Guarantor",
  "Owner",
  "Seller",
  "Affiliated Business",
  "Partner"
];

const EditableBusinessInfoSection: React.FC<EditableBusinessInfoSectionProps> = ({
  business
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState<Business & { participant_type?: string }>({
    ...business,
    participant_type: business.participant_type || 'Primary Borrower'
  });
  const handleSave = () => {
    toast.success('Business information updated successfully');
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedBusiness({
      ...business,
      participant_type: business.participant_type || 'Primary Borrower'
    });
    setIsEditing(false);
  };
  const updateField = (field: string, value: any) => {
    setEditedBusiness(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Not specified';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };
  const formatEIN = (ein: string | undefined) => {
    if (!ein) return 'Not specified';
    // Format EIN as XX-XXXXXXX
    return ein.replace(/(\d{2})(\d{7})/, '$1-$2');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Business Information</CardTitle>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
        <CardDescription className="text-xs">Core business details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Name</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.name} 
                  onChange={(e) => updateField('name', e.target.value)} 
                  className="mt-1" 
                />
              ) : (
                <p className="text-sm font-medium">{business.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Entity Type</label>
              {isEditing ? (
                <Select 
                  value={editedBusiness.entity_type} 
                  onValueChange={(value) => updateField('entity_type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="outline" className="mt-1">{business.entity_type}</Badge>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Participant Type</label>
              {isEditing ? (
                <Select 
                  value={editedBusiness.participant_type} 
                  onValueChange={(value) => updateField('participant_type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {participantTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-1 mt-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary">{editedBusiness.participant_type || 'Primary Borrower'}</Badge>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">EIN</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.ein || ''} 
                  onChange={(e) => updateField('ein', e.target.value)} 
                  placeholder="XX-XXXXXXX" 
                  className="mt-1" 
                />
              ) : (
                <p className="text-sm">{formatEIN(business.ein)}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Industry</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.industry || ''} 
                  onChange={(e) => updateField('industry', e.target.value)} 
                  className="mt-1" 
                />
              ) : (
                <p className="text-sm">{business.industry || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Founded</label>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{formatDate(business.founded_date)}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              {business.address ? (
                <div className="flex items-start gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p>{business.address.street}</p>
                    <p>{business.address.city}, {business.address.state} {business.address.zip_code}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No address provided</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.phone || ''} 
                  onChange={(e) => updateField('phone', e.target.value)} 
                  className="mt-1" 
                />
              ) : business.phone ? (
                <div className="flex items-center gap-1 mt-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{business.phone}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No phone provided</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.email || ''} 
                  onChange={(e) => updateField('email', e.target.value)} 
                  className="mt-1" 
                />
              ) : business.email ? (
                <div className="flex items-center gap-1 mt-1">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{business.email}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No email provided</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Website</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.website || ''} 
                  onChange={(e) => updateField('website', e.target.value)} 
                  className="mt-1" 
                />
              ) : business.website ? (
                <div className="flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{business.website}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">No website provided</p>
              )}
            </div>
          </div>
        </div>

        {business.description && (
          <div className="">
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            {isEditing ? (
              <Textarea 
                value={editedBusiness.description || ''} 
                onChange={(e) => updateField('description', e.target.value)} 
                className="mt-1" 
                rows={3} 
              />
            ) : (
              <p className="text-sm mt-1">{business.description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableBusinessInfoSection;

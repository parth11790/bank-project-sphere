
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Building, Edit, Save, X } from 'lucide-react';
import { Business } from '@/types/business';
import { toast } from 'sonner';
import EditableBusinessInfoBasicFields from './EditableBusinessInfoBasicFields';
import EditableBusinessInfoContactFields from './EditableBusinessInfoContactFields';

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
        <EditableBusinessInfoBasicFields 
          business={business}
          editedBusiness={editedBusiness}
          isEditing={isEditing}
          updateField={updateField}
          formatDate={formatDate}
          formatEIN={formatEIN}
          participantTypes={participantTypes}
        />

        <EditableBusinessInfoContactFields 
          business={business}
          editedBusiness={editedBusiness}
          isEditing={isEditing}
          updateField={updateField}
        />

        {business.description && (
          <div className="mt-4">
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

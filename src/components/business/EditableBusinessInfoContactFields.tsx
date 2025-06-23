
import React from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Business } from '@/types/business';

interface EditableBusinessInfoContactFieldsProps {
  business: Business;
  editedBusiness: Business;
  isEditing: boolean;
  updateField: (field: string, value: any) => void;
}

const EditableBusinessInfoContactFields: React.FC<EditableBusinessInfoContactFieldsProps> = ({
  business,
  editedBusiness,
  isEditing,
  updateField
}) => {
  return (
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
  );
};

export default EditableBusinessInfoContactFields;

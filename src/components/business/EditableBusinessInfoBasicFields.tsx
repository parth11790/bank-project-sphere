
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users } from 'lucide-react';
import { Business } from '@/types/business';

interface EditableBusinessInfoBasicFieldsProps {
  business: Business;
  editedBusiness: Business & { participant_type?: string };
  isEditing: boolean;
  updateField: (field: string, value: any) => void;
  formatDate: (date: string | Date | undefined) => string;
  formatEIN: (ein: string | undefined) => string;
  participantTypes: string[];
}

const EditableBusinessInfoBasicFields: React.FC<EditableBusinessInfoBasicFieldsProps> = ({
  business,
  editedBusiness,
  isEditing,
  updateField,
  formatDate,
  formatEIN,
  participantTypes
}) => {
  return (
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

      {/* Right Column - Contact Information */}
      <div className="space-y-4">
        {/* Address, Phone, Email, Website fields will be moved to a separate component */}
      </div>
    </div>
  );
};

export default EditableBusinessInfoBasicFields;

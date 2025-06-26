
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useLender } from '@/contexts/LenderContext';
import { ProfileHeader } from './sections/ProfileHeader';
import { BasicInformationSection } from './sections/BasicInformationSection';
import { BrandingSection } from './sections/BrandingSection';
import { ComplianceSection } from './sections/ComplianceSection';

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
      <ProfileHeader
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BasicInformationSection
          lenderInfo={lenderInfo}
          editForm={editForm}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />

        <BrandingSection
          lenderInfo={lenderInfo}
          editForm={editForm}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
      </div>

      <ComplianceSection
        lenderInfo={lenderInfo}
        editForm={editForm}
        isEditing={isEditing}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { DocumentGatheringTemplate, OwnershipRange } from '@/types/documentTemplate';
import { TemplateConfigurationCard } from '@/components/documentTemplates/TemplateConfigurationCard';
import { ParticipantAssignmentCard } from '@/components/documentTemplates/ParticipantAssignmentCard';
import { ParticipantFormsSection } from '@/components/documentTemplates/ParticipantFormsSection';
import { TemplateSidebar } from '@/components/documentTemplates/TemplateSidebar';

// Participant options in the specified hierarchy
const participantOptions = [{
  value: 'borrowing_business' as const,
  label: 'Borrowing Business',
  hasOwnership: false
}, {
  value: 'owners' as const,
  label: 'Owners',
  hasOwnership: true
}, {
  value: 'affiliated_business' as const,
  label: 'Affiliated Business',
  hasOwnership: true
}, {
  value: 'sellers' as const,
  label: 'Sellers',
  hasOwnership: true
}, {
  value: 'acquisition_business' as const,
  label: 'Acquisition Business',
  hasOwnership: false
}];

const TemplateDetails = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { templates, updateTemplate } = useDocumentTemplates();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    templateName: '',
    loanType: '',
    amountMin: 0,
    amountMax: 0,
    isActive: true,
    assignedParticipants: [] as string[],
    participantForms: {
      borrowing_business: [] as string[],
      affiliated_business: [] as string[],
      owners: [] as string[],
      sellers: [] as string[],
      acquisition_business: [] as string[]
    },
    ownershipRanges: {
      affiliated_business: [] as OwnershipRange[],
      owners: [] as OwnershipRange[],
      sellers: [] as OwnershipRange[]
    }
  });

  const template = templates.find(t => t.id === templateId);

  if (!template) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <Button onClick={() => navigate('/lender-settings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getTotalFormsCount = () => {
    let total = Object.values(template.participantForms).reduce((total, forms) => total + forms.length, 0);
    
    // Add forms from ownership ranges
    if (template.ownershipRanges) {
      Object.values(template.ownershipRanges).forEach(ranges => {
        ranges.forEach(range => {
          total += range.forms.length;
        });
      });
    }
    
    return total;
  };

  const getAssignedParticipants = () => {
    return participantOptions
      .filter(p => 
        Object.keys(template.participantForms).includes(p.value) && 
        template.participantForms[p.value as keyof typeof template.participantForms]?.length > 0
      )
      .map(p => p.value);
  };

  const handleEdit = () => {
    setEditFormData({
      templateName: template.templateName,
      loanType: template.loanType,
      amountMin: template.amountMin,
      amountMax: template.amountMax,
      isActive: template.isActive,
      assignedParticipants: getAssignedParticipants(),
      participantForms: {
        ...template.participantForms,
        acquisition_business: template.participantForms.acquisition_business || []
      },
      ownershipRanges: template.ownershipRanges || {
        affiliated_business: [],
        owners: [],
        sellers: []
      }
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Clean up participant forms - only keep forms for assigned participants
    const cleanedParticipantForms = { ...editFormData.participantForms };
    
    participantOptions.forEach(participant => {
      if (!editFormData.assignedParticipants.includes(participant.value)) {
        cleanedParticipantForms[participant.value] = [];
      }
    });

    const updates: Partial<DocumentGatheringTemplate> = {
      templateName: editFormData.templateName,
      loanType: editFormData.loanType,
      amountMin: editFormData.amountMin,
      amountMax: editFormData.amountMax,
      participantForms: cleanedParticipantForms,
      ownershipRanges: editFormData.ownershipRanges,
      isActive: editFormData.isActive
    };

    updateTemplate(template.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleParticipantToggle = (participantValue: string, checked: boolean) => {
    setEditFormData(prev => ({
      ...prev,
      assignedParticipants: checked 
        ? [...prev.assignedParticipants, participantValue] 
        : prev.assignedParticipants.filter(p => p !== participantValue)
    }));
  };

  const updateParticipantForms = (participant: keyof typeof editFormData.participantForms, forms: string[]) => {
    setEditFormData(prev => ({
      ...prev,
      participantForms: {
        ...prev.participantForms,
        [participant]: forms
      }
    }));
  };

  const updateOwnershipRanges = (participant: keyof typeof editFormData.ownershipRanges, ranges: OwnershipRange[]) => {
    setEditFormData(prev => ({
      ...prev,
      ownershipRanges: {
        ...prev.ownershipRanges,
        [participant]: ranges
      }
    }));
  };

  const displayAssignedParticipants = getAssignedParticipants();

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/lender-settings')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Template Details</h1>
              <p className="text-muted-foreground">
                View and modify document gathering template configuration
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
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
                Edit Template
              </Button>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <TemplateConfigurationCard
              template={template}
              isEditing={isEditing}
              editFormData={editFormData}
              setEditFormData={setEditFormData}
            />

            {/* Participant Assignment */}
            {isEditing && (
              <ParticipantAssignmentCard
                editFormData={editFormData}
                handleParticipantToggle={handleParticipantToggle}
              />
            )}

            {/* Participant Forms Sections */}
            <ParticipantFormsSection
              template={template}
              isEditing={isEditing}
              editFormData={editFormData}
              displayAssignedParticipants={displayAssignedParticipants}
              updateParticipantForms={updateParticipantForms}
              updateOwnershipRanges={updateOwnershipRanges}
            />
          </div>

          <div className="space-y-6">
            <TemplateSidebar
              template={template}
              displayAssignedParticipants={displayAssignedParticipants}
              getTotalFormsCount={getTotalFormsCount}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetails;

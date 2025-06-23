
import React, { useState, useEffect } from 'react';
import { DocumentGatheringTemplate, OwnershipRange } from '@/types/documentTemplate';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BasicFormSection } from './edit/BasicFormSection';
import { ParticipantFormsEditSection } from './edit/ParticipantFormsEditSection';

interface EditTemplateDialogProps {
  template: DocumentGatheringTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updates: Partial<DocumentGatheringTemplate>) => void;
}

export const EditTemplateDialog = ({ template, open, onOpenChange, onUpdate }: EditTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    templateName: '',
    loanType: '',
    amountMin: 0,
    amountMax: 1000000,
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
    },
    isActive: true
  });

  useEffect(() => {
    if (template) {
      setFormData({
        templateName: template.templateName,
        loanType: template.loanType,
        amountMin: template.amountMin,
        amountMax: template.amountMax,
        participantForms: {
          ...template.participantForms,
          acquisition_business: template.participantForms.acquisition_business || []
        },
        ownershipRanges: template.ownershipRanges || {
          affiliated_business: [],
          owners: [],
          sellers: []
        },
        isActive: template.isActive
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.templateName || !formData.loanType) {
      return;
    }

    onUpdate({
      templateName: formData.templateName,
      loanType: formData.loanType,
      amountMin: formData.amountMin,
      amountMax: formData.amountMax,
      participantForms: formData.participantForms,
      ownershipRanges: formData.ownershipRanges,
      isActive: formData.isActive
    });
  };

  const updateParticipantForms = (participantType: keyof typeof formData.participantForms, forms: string[]) => {
    setFormData(prev => ({
      ...prev,
      participantForms: {
        ...prev.participantForms,
        [participantType]: forms
      }
    }));
  };

  const updateOwnershipRanges = (participantType: keyof typeof formData.ownershipRanges, ranges: OwnershipRange[]) => {
    setFormData(prev => ({
      ...prev,
      ownershipRanges: {
        ...prev.ownershipRanges,
        [participantType]: ranges
      }
    }));
  };

  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Document Gathering Template</DialogTitle>
          <DialogDescription>
            Update the template configuration for document collection.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicFormSection formData={formData} setFormData={setFormData} />

          <ParticipantFormsEditSection
            formData={formData}
            updateParticipantForms={updateParticipantForms}
            updateOwnershipRanges={updateOwnershipRanges}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

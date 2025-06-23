
import React, { useState, useEffect } from 'react';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiSelectFormField } from './MultiSelectFormField';
import { loanTypes } from '@/lib/mockData/lenderSettings';
import { getFormsByEntityType } from '@/lib/utils/formCategorization';

interface EditTemplateDialogProps {
  template: DocumentGatheringTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updates: Partial<DocumentGatheringTemplate>) => void;
}

const participantOptions = [
  { value: 'borrowing_business' as const, label: 'Borrowing Business' },
  { value: 'affiliated_business' as const, label: 'Affiliated Business' },
  { value: 'owners' as const, label: 'Owners' },
  { value: 'sellers' as const, label: 'Sellers' },
];

// Get all available forms (both business and individual)
const availableForms = getFormsByEntityType('All');

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
      sellers: [] as string[]
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
        participantForms: template.participantForms,
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

  // Determine entity type filter based on participant
  const getEntityTypeForParticipant = (participantType: string): 'Business' | 'Individual' | 'All' => {
    switch (participantType) {
      case 'borrowing_business':
      case 'affiliated_business':
        return 'Business';
      case 'owners':
      case 'sellers':
        return 'All'; // Owners and sellers can have both business and individual forms
      default:
        return 'All';
    }
  };

  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Document Gathering Template</DialogTitle>
          <DialogDescription>
            Update the template configuration for document collection.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input
                id="templateName"
                value={formData.templateName}
                onChange={(e) => setFormData(prev => ({ ...prev, templateName: e.target.value }))}
                placeholder="e.g., SBA 7(a) Standard - Small Loan"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              <Select value={formData.loanType} onValueChange={(value) => setFormData(prev => ({ ...prev, loanType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  {loanTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                  <SelectItem value="All Types">All Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountMin">Minimum Amount ($)</Label>
              <Input
                id="amountMin"
                type="number"
                value={formData.amountMin}
                onChange={(e) => setFormData(prev => ({ ...prev, amountMin: Number(e.target.value) }))}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountMax">Maximum Amount ($)</Label>
              <Input
                id="amountMax"
                type="number"
                value={formData.amountMax}
                onChange={(e) => setFormData(prev => ({ ...prev, amountMax: Number(e.target.value) }))}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Forms by Participant Type</h3>
            {participantOptions.map((participant) => (
              <div key={participant.value} className="space-y-2">
                <Label>{participant.label}</Label>
                <MultiSelectFormField
                  value={formData.participantForms[participant.value]}
                  onChange={(forms) => updateParticipantForms(participant.value, forms)}
                  options={availableForms}
                  placeholder={`Select forms for ${participant.label.toLowerCase()}...`}
                  entityTypeFilter={getEntityTypeForParticipant(participant.value)}
                  showEntityTypeFilter={true}
                />
              </div>
            ))}
          </div>

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

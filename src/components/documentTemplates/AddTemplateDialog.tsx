
import React, { useState } from 'react';
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

interface AddTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (template: Omit<DocumentGatheringTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const participantOptions = [
  { value: 'borrowing_business' as const, label: 'Borrowing Business' },
  { value: 'affiliated_business' as const, label: 'Affiliated Business' },
  { value: 'owners' as const, label: 'Owners' },
  { value: 'sellers' as const, label: 'Sellers' },
];

const availableForms = [
  'Personal Financial Statement',
  'Business Financial Statement',
  'Tax Returns',
  'Business Plan',
  'Personal Guarantee',
  'Background Check Authorization',
  'Business Sale Agreement',
  'Asset Listing',
  'Credit Report Authorization',
  'Bank Statements',
  'Profit & Loss Statement',
  'Balance Sheet',
  'Cash Flow Projection',
  'Lease Agreement',
  'Insurance Documentation'
];

export const AddTemplateDialog = ({ open, onOpenChange, onAdd }: AddTemplateDialogProps) => {
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
    createdBy: 'Current User',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.templateName || !formData.loanType) {
      return;
    }

    onAdd({
      templateName: formData.templateName,
      loanType: formData.loanType,
      amountMin: formData.amountMin,
      amountMax: formData.amountMax,
      participantForms: formData.participantForms,
      createdBy: formData.createdBy,
      isActive: formData.isActive
    });
    
    // Reset form
    setFormData({
      templateName: '',
      loanType: '',
      amountMin: 0,
      amountMax: 1000000,
      participantForms: {
        borrowing_business: [],
        affiliated_business: [],
        owners: [],
        sellers: []
      },
      createdBy: 'Current User',
      isActive: true
    });
    
    onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Document Gathering Template</DialogTitle>
          <DialogDescription>
            Create a new template for document collection based on loan type and participants.
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
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

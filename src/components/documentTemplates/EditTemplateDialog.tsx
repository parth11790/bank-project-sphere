
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

export const EditTemplateDialog = ({ template, open, onOpenChange, onUpdate }: EditTemplateDialogProps) => {
  const [formData, setFormData] = useState({
    templateName: '',
    loanType: '',
    amountMin: 0,
    amountMax: 1000000,
    participant: '' as DocumentGatheringTemplate['participant'] | '',
    forms: [] as string[],
    isActive: true
  });

  useEffect(() => {
    if (template) {
      setFormData({
        templateName: template.templateName,
        loanType: template.loanType,
        amountMin: template.amountMin,
        amountMax: template.amountMax,
        participant: template.participant,
        forms: template.forms,
        isActive: template.isActive
      });
    }
  }, [template]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.templateName || !formData.loanType || !formData.participant) {
      return;
    }

    onUpdate({
      templateName: formData.templateName,
      loanType: formData.loanType,
      amountMin: formData.amountMin,
      amountMax: formData.amountMax,
      participant: formData.participant as DocumentGatheringTemplate['participant'],
      forms: formData.forms,
      isActive: formData.isActive
    });
  };

  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Document Gathering Template</DialogTitle>
          <DialogDescription>
            Update the template configuration for document collection.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <Label htmlFor="participant">Participant</Label>
              <Select value={formData.participant} onValueChange={(value) => setFormData(prev => ({ ...prev, participant: value as DocumentGatheringTemplate['participant'] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select participant" />
                </SelectTrigger>
                <SelectContent>
                  {participantOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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

          <div className="space-y-2">
            <Label>Required Forms</Label>
            <MultiSelectFormField
              value={formData.forms}
              onChange={(forms) => setFormData(prev => ({ ...prev, forms }))}
              options={availableForms}
              placeholder="Select required forms..."
            />
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

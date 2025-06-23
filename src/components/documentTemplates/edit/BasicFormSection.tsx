
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loanTypes } from '@/lib/mockData/lenderSettings';

interface BasicFormSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const BasicFormSection = ({ formData, setFormData }: BasicFormSectionProps) => {
  return (
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
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import { loanTypes } from '@/lib/mockData/lenderSettings';

interface TemplateConfigurationCardProps {
  template: DocumentGatheringTemplate;
  isEditing: boolean;
  editFormData: any;
  setEditFormData: (data: any) => void;
}

export const TemplateConfigurationCard = ({ 
  template, 
  isEditing, 
  editFormData, 
  setEditFormData 
}: TemplateConfigurationCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Template Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="templateName">Template Name</Label>
              <Input 
                id="templateName" 
                value={editFormData.templateName} 
                onChange={e => setEditFormData(prev => ({
                  ...prev,
                  templateName: e.target.value
                }))} 
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select 
                  value={editFormData.loanType} 
                  onValueChange={value => setEditFormData(prev => ({
                    ...prev,
                    loanType: value
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                <Label>Status</Label>
                <Select 
                  value={editFormData.isActive ? 'active' : 'inactive'} 
                  onValueChange={value => setEditFormData(prev => ({
                    ...prev,
                    isActive: value === 'active'
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Minimum Amount ($)</Label>
                <Input 
                  type="number" 
                  value={editFormData.amountMin} 
                  onChange={e => setEditFormData(prev => ({
                    ...prev,
                    amountMin: Number(e.target.value)
                  }))} 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Maximum Amount ($)</Label>
                <Input 
                  type="number" 
                  value={editFormData.amountMax} 
                  onChange={e => setEditFormData(prev => ({
                    ...prev,
                    amountMax: Number(e.target.value)
                  }))} 
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <Label className="text-sm font-medium">Template Name</Label>
              <p className="text-lg font-semibold">{template.templateName}</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">Loan Type</Label>
                <div className="mt-1">
                  <Badge variant="outline">{template.loanType}</Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="mt-1">
                  <Badge variant={template.isActive ? 'default' : 'secondary'} className={template.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Minimum Amount</Label>
                <p className="text-sm">{formatCurrency(template.amountMin)}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Maximum Amount</Label>
                <p className="text-sm">{formatCurrency(template.amountMax)}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

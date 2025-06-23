
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { MultiSelectFormField } from '@/components/documentTemplates/MultiSelectFormField';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { loanTypes } from '@/lib/mockData/lenderSettings';

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
  'Insurance Documentation',
  'Articles of Incorporation',
  'Operating Agreement',
  'Partnership Agreement',
  'Real Estate Purchase Agreement',
  'Environmental Assessment'
];

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
    participantForms: {
      borrowing_business: [] as string[],
      affiliated_business: [] as string[],
      owners: [] as string[],
      sellers: [] as string[]
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalFormsCount = () => {
    return Object.values(template.participantForms).reduce((total, forms) => total + forms.length, 0);
  };

  const handleEdit = () => {
    setEditFormData({
      templateName: template.templateName,
      loanType: template.loanType,
      amountMin: template.amountMin,
      amountMax: template.amountMax,
      isActive: template.isActive,
      participantForms: { ...template.participantForms }
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    const updates: Partial<DocumentGatheringTemplate> = {
      templateName: editFormData.templateName,
      loanType: editFormData.loanType,
      amountMin: editFormData.amountMin,
      amountMax: editFormData.amountMax,
      participantForms: editFormData.participantForms,
      isActive: editFormData.isActive
    };
    
    updateTemplate(template.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
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

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/lender-settings')}
            >
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                        onChange={(e) => setEditFormData(prev => ({ ...prev, templateName: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Loan Type</Label>
                        <Select value={editFormData.loanType} onValueChange={(value) => setEditFormData(prev => ({ ...prev, loanType: value }))}>
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
                        <Select value={editFormData.isActive ? 'active' : 'inactive'} onValueChange={(value) => setEditFormData(prev => ({ ...prev, isActive: value === 'active' }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Minimum Amount ($)</Label>
                        <Input
                          type="number"
                          value={editFormData.amountMin}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, amountMin: Number(e.target.value) }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Maximum Amount ($)</Label>
                        <Input
                          type="number"
                          value={editFormData.amountMax}
                          onChange={(e) => setEditFormData(prev => ({ ...prev, amountMax: Number(e.target.value) }))}
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Loan Type</Label>
                        <div className="mt-1">
                          <Badge variant="outline">{template.loanType}</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">
                          <Badge variant={template.isActive ? 'default' : 'secondary'} 
                                 className={template.isActive ? 'bg-green-500' : 'bg-gray-500'}>
                            {template.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Amount Range</Label>
                      <p className="text-lg">{formatCurrency(template.amountMin)} - {formatCurrency(template.amountMax)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Participant Forms Sections */}
            <Card>
              <CardHeader>
                <CardTitle>Forms by Participant Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {participantOptions.map((participant) => (
                  <div key={participant.value} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{participant.label}</h3>
                      <Badge variant="outline" className="text-xs">
                        {isEditing 
                          ? editFormData.participantForms[participant.value].length
                          : template.participantForms[participant.value].length
                        } forms
                      </Badge>
                    </div>
                    
                    {isEditing ? (
                      <MultiSelectFormField
                        value={editFormData.participantForms[participant.value]}
                        onChange={(forms) => updateParticipantForms(participant.value, forms)}
                        options={availableForms}
                        placeholder={`Select forms for ${participant.label.toLowerCase()}...`}
                      />
                    ) : (
                      <div className="space-y-2">
                        {template.participantForms[participant.value].length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {template.participantForms[participant.value].map((form, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                                <Badge variant="outline" className="text-xs">
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{form}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No forms assigned for {participant.label.toLowerCase()}.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Created By</Label>
                  <p className="text-sm text-muted-foreground">{template.createdBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(template.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Forms</Label>
                  <p className="text-sm text-muted-foreground">{getTotalFormsCount()} forms</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetails;

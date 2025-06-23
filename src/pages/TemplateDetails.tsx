import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Edit, Save, X } from 'lucide-react';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { MultiSelectFormField } from '@/components/documentTemplates/MultiSelectFormField';
import { OwnershipRangeManager } from '@/components/documentTemplates/OwnershipRangeManager';
import { DocumentGatheringTemplate, OwnershipRange } from '@/types/documentTemplate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loanTypes } from '@/lib/mockData/lenderSettings';
import { getFormsByEntityType } from '@/lib/utils/formCategorization';

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

// Get all available forms (both business and individual)
const availableForms = getFormsByEntityType('All');

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  const getOwnershipRangesSummary = (participantType: string) => {
    const ranges = template.ownershipRanges?.[participantType as keyof typeof template.ownershipRanges] || [];
    if (ranges.length === 0) return 'No ranges defined';
    return `${ranges.length} range${ranges.length === 1 ? '' : 's'}`;
  };

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

            {/* Participant Assignment */}
            {isEditing && (
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {participantOptions.map(participant => (
                      <div key={participant.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={participant.value}
                          checked={editFormData.assignedParticipants.includes(participant.value)}
                          onCheckedChange={(checked) => handleParticipantToggle(participant.value, checked as boolean)}
                        />
                        <Label htmlFor={participant.value} className="text-sm font-medium">
                          {participant.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participant Forms Sections - Changed to vertical layout */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Forms by Participant Type</h2>
              {participantOptions.map(participant => {
                const isAssigned = isEditing 
                  ? editFormData.assignedParticipants.includes(participant.value) 
                  : displayAssignedParticipants.includes(participant.value);
                
                if (!isAssigned) return null;

                return (
                  <div key={participant.value} className="space-y-4">
                    {/* Basic Forms Section */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{participant.label} - Basic Forms</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {isEditing 
                              ? editFormData.participantForms[participant.value].length 
                              : (template.participantForms[participant.value as keyof typeof template.participantForms]?.length || 0)
                            } forms
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {isEditing ? (
                          <MultiSelectFormField
                            value={editFormData.participantForms[participant.value]}
                            onChange={(forms) => updateParticipantForms(participant.value, forms)}
                            options={availableForms}
                            placeholder={`Select basic forms for ${participant.label.toLowerCase()}...`}
                            participantType={participant.value}
                            showEntityTypeFilter={true}
                          />
                        ) : (
                          <div className="space-y-2">
                            {(template.participantForms[participant.value as keyof typeof template.participantForms]?.length || 0) > 0 ? (
                              <div className="space-y-2">
                                {(template.participantForms[participant.value as keyof typeof template.participantForms] || []).map((form, index) => (
                                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                                    <Badge variant="outline" className="text-xs min-w-8 h-6 flex items-center justify-center">
                                      {index + 1}
                                    </Badge>
                                    <span className="text-sm font-medium">{form}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No basic forms assigned for {participant.label.toLowerCase()}.
                              </p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Ownership Ranges Section */}
                    {participant.hasOwnership && (
                      isEditing ? (
                        <OwnershipRangeManager
                          participantType={participant.value}
                          participantLabel={participant.label}
                          ranges={editFormData.ownershipRanges[participant.value as keyof typeof editFormData.ownershipRanges]}
                          onChange={(ranges) => updateOwnershipRanges(participant.value as keyof typeof editFormData.ownershipRanges, ranges)}
                        />
                      ) : (
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{participant.label} - Ownership-Based Forms</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {getOwnershipRangesSummary(participant.value)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {template.ownershipRanges?.[participant.value as keyof typeof template.ownershipRanges]?.length > 0 ? (
                              <div className="space-y-3">
                                {template.ownershipRanges[participant.value as keyof typeof template.ownershipRanges].map((range, index) => (
                                  <div key={range.id} className="border rounded-lg p-3 bg-muted/30">
                                    <div className="flex items-center justify-between mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {range.min}% - {range.max}% ownership
                                      </Badge>
                                      <Badge variant="secondary" className="text-xs">
                                        {range.forms.length} form(s)
                                      </Badge>
                                    </div>
                                    {range.forms.length > 0 ? (
                                      <div className="space-y-1">
                                        {range.forms.map((form, formIndex) => (
                                          <div key={formIndex} className="text-sm text-muted-foreground">
                                            • {form}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-muted-foreground">No forms assigned to this range</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No ownership ranges defined for {participant.label.toLowerCase()}.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>
                );
              })}
              
              {!isEditing && displayAssignedParticipants.length === 0 && (
                <Card>
                  <CardContent className="py-8">
                    <p className="text-sm text-muted-foreground text-center">
                      No participants assigned to this template.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
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
                <div>
                  <Label className="text-sm font-medium">Participants</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {displayAssignedParticipants.length > 0 ? displayAssignedParticipants.map(participantValue => {
                      const participant = participantOptions.find(p => p.value === participantValue);
                      return (
                        <Badge key={participantValue} variant="outline" className="text-xs">
                          {participant?.label}
                        </Badge>
                      );
                    }) : (
                      <p className="text-xs text-muted-foreground">None assigned</p>
                    )}
                  </div>
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

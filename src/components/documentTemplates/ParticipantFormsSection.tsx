
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DocumentGatheringTemplate, OwnershipRange } from '@/types/documentTemplate';
import { MultiSelectFormField } from './MultiSelectFormField';
import { OwnershipRangeManager } from './OwnershipRangeManager';
import { getFormsByEntityType } from '@/lib/utils/formCategorization';

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

const availableForms = getFormsByEntityType('All');

interface ParticipantFormsSectionProps {
  template: DocumentGatheringTemplate;
  isEditing: boolean;
  editFormData: any;
  displayAssignedParticipants: string[];
  updateParticipantForms: (participant: string, forms: string[]) => void;
  updateOwnershipRanges: (participant: string, ranges: OwnershipRange[]) => void;
}

export const ParticipantFormsSection = ({
  template,
  isEditing,
  editFormData,
  displayAssignedParticipants,
  updateParticipantForms,
  updateOwnershipRanges
}: ParticipantFormsSectionProps) => {
  const getOwnershipRangesSummary = (participantType: string) => {
    const ranges = template.ownershipRanges?.[participantType as keyof typeof template.ownershipRanges] || [];
    if (ranges.length === 0) return 'No ranges defined';
    return `${ranges.length} range${ranges.length === 1 ? '' : 's'}`;
  };

  return (
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
  );
};

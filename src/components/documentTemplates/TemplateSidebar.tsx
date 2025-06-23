
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';

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

interface TemplateSidebarProps {
  template: DocumentGatheringTemplate;
  displayAssignedParticipants: string[];
  getTotalFormsCount: () => number;
}

export const TemplateSidebar = ({ 
  template, 
  displayAssignedParticipants, 
  getTotalFormsCount 
}: TemplateSidebarProps) => {
  return (
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
  );
};

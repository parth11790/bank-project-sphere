
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Wand2 } from 'lucide-react';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { FormTemplate } from '@/types/form';
import { toast } from 'sonner';

interface TemplateSelectorProps {
  participantRole?: string;
  onAssignForms: (forms: FormTemplate[]) => void;
  availableForms: FormTemplate[];
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  participantRole,
  onAssignForms,
  availableForms
}) => {
  const { templates } = useDocumentTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

  const getParticipantType = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'buyer':
        return 'borrowing_business';
      case 'seller':
        return 'sellers';
      case 'owner':
        return 'owners';
      default:
        return 'borrowing_business';
    }
  };

  const handleApplyTemplate = () => {
    if (!selectedTemplateId) {
      toast.error('Please select a template first');
      return;
    }

    const template = templates.find(t => t.id === selectedTemplateId);
    if (!template) {
      toast.error('Template not found');
      return;
    }

    const participantType = getParticipantType(participantRole || '');
    const templateForms = template.participantForms[participantType as keyof typeof template.participantForms] || [];

    // Convert template form names to FormTemplate objects by matching with available forms
    const formsToAssign: FormTemplate[] = [];
    
    templateForms.forEach(formName => {
      const matchingForm = availableForms.find(form => 
        form.name.toLowerCase().includes(formName.toLowerCase()) ||
        formName.toLowerCase().includes(form.name.toLowerCase())
      );
      
      if (matchingForm) {
        formsToAssign.push(matchingForm);
      }
    });

    if (formsToAssign.length === 0) {
      toast.warning(`No matching forms found for ${participantType} in the selected template`);
      return;
    }

    onAssignForms(formsToAssign);
    toast.success(`Applied template "${template.templateName}" - assigned ${formsToAssign.length} forms`);
    setSelectedTemplateId('');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Apply Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Select Document Gathering Template
            </label>
            <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template to auto-assign forms..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{template.templateName}</span>
                      <Badge variant="outline" className="ml-2">
                        {template.loanType}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleApplyTemplate}
            disabled={!selectedTemplateId}
            className="flex items-center gap-2"
          >
            <Wand2 className="h-4 w-4" />
            Apply Template
          </Button>
        </div>
        
        {participantRole && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Forms will be assigned based on participant role: 
              <Badge variant="outline" className="ml-1">
                {participantRole}
              </Badge>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

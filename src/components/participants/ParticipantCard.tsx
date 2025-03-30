
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  FileText, 
  ClipboardCheck, 
  ArrowRight, 
  Building2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Participant as ParticipantType } from '@/types/participant';

export interface Form {
  form_id: string;
  name: string;
}

export interface Document {
  document_id: string;
  name: string;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  title?: string;
  ownership_percentage?: number;
  documents: Document[];
  forms: Form[];
}

export interface Participant extends ParticipantType {}

interface ParticipantCardProps {
  participant: Participant;
  onDelete: () => void;
  onAssignDocuments: () => void;
  onAssignForms: () => void;
  onAssignBusinessDocuments?: () => void;
  onAssignBusinessForms?: () => void;
  onAddBusiness: () => void;
  formTemplates: {
    individual: Form[];
    business: Form[];
  };
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onAssignDocuments,
  onAssignForms,
  onAssignBusinessDocuments,
  onAssignBusinessForms,
  onAddBusiness,
  formTemplates
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const navigate = useNavigate();
  
  const handleFormClick = (formId: string, formName: string) => {
    navigate(`/form/${formId}?name=${encodeURIComponent(formName)}&participant=${encodeURIComponent(participant.name)}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${participant.name}`} alt={participant.name} />
              <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{participant.name}</CardTitle>
              <CardDescription>{participant.email}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {participant.role.replace('_', ' ')}
            </Badge>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Individual Requirements Section - Always Expanded */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-medium">Individual Requirements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Required Documents</h3>
                <Button variant="outline" size="sm" onClick={onAssignDocuments}>
                  <Plus className="h-3 w-3 mr-1" />
                  Assign
                </Button>
              </div>
              {participant.documents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents assigned</p>
              ) : (
                <div className="grid gap-2">
                  {participant.documents.map(doc => (
                    <div key={doc.document_id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Required Forms</h3>
                <Button variant="outline" size="sm" onClick={onAssignForms}>
                  <Plus className="h-3 w-3 mr-1" />
                  Assign
                </Button>
              </div>
              {participant.forms.length === 0 ? (
                <p className="text-sm text-muted-foreground">No forms assigned</p>
              ) : (
                <div className="grid gap-2">
                  {participant.forms.map(form => (
                    <div 
                      key={form.form_id} 
                      className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
                      onClick={() => handleFormClick(form.form_id, form.name)}
                    >
                      <div className="flex items-center">
                        <ClipboardCheck className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{form.name}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Business Section - Always Expanded if business exists */}
        {participant.business && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium">Business: {participant.business.name}</h3>
              <Badge variant="outline">{participant.business.entity_type}</Badge>
            </div>
            
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2 p-2 bg-muted/30 rounded-md">
                <div>
                  <p className="text-sm text-muted-foreground">Title:</p>
                  <p className="font-medium">{participant.business.title || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ownership:</p>
                  <p className="font-medium">{participant.business.ownership_percentage || '0'}%</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Required Documents</h3>
                  <Button variant="outline" size="sm" onClick={onAssignBusinessDocuments}>
                    <Plus className="h-3 w-3 mr-1" />
                    Assign
                  </Button>
                </div>
                {participant.business.documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No documents assigned</p>
                ) : (
                  <div className="grid gap-2">
                    {participant.business.documents.map(doc => (
                      <div key={doc.document_id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span className="text-sm">{doc.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Required Forms</h3>
                  <Button variant="outline" size="sm" onClick={onAssignBusinessForms}>
                    <Plus className="h-3 w-3 mr-1" />
                    Assign
                  </Button>
                </div>
                {participant.business.forms.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No forms assigned</p>
                ) : (
                  <div className="grid gap-2">
                    {participant.business.forms.map(form => (
                      <div 
                        key={form.form_id} 
                        className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
                        onClick={() => handleFormClick(form.form_id, form.name)}
                      >
                        <div className="flex items-center">
                          <ClipboardCheck className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span className="text-sm">{form.name}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="h-7 px-2">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {!participant.business && participant.role !== 'bank_officer' && participant.role !== 'loan_specialist' && participant.role !== 'bank_manager' && (
          <div className="flex justify-center pt-2">
            <Button variant="outline" size="sm" className="w-full" onClick={onAddBusiness}>
              <Building2 className="h-4 w-4 mr-2" />
              Add Business
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;

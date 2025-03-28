
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, ClipboardCheck, ArrowRight, Building2, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ParticipantDialog from '@/components/ParticipantDialog';
import AssignmentDialog from '@/components/AssignmentDialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { 
  getProjectById, 
  getProjectParticipants, 
  getBusinessesByOwnerId, 
  getFormTemplates, 
  getDocuments,
  getAssignedForms,
  getAssignedDocuments
} from '@/services/supabaseService';
import { Skeleton } from '@/components/ui/skeleton';

interface Form {
  form_id: string;
  name: string;
}

interface Document {
  document_id: string;
  name: string;
}

interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  documents: Document[];
  forms: Form[];
}

interface Participant {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  documents: Document[];
  forms: Form[];
  business?: Business;
}

const ProjectParticipants: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [assignmentType, setAssignmentType] = useState<'documents' | 'forms'>('documents');
  const [entityType, setEntityType] = useState<'individual' | 'business'>('individual');
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  // Get project details
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  // Get project participants
  const { data: participantsData, isLoading: participantsLoading, refetch: refetchParticipants } = useQuery({
    queryKey: ['participants', projectId],
    queryFn: () => getProjectParticipants(projectId || ''),
    enabled: !!projectId,
  });

  // Load individual forms and documents
  const { data: individualForms } = useQuery({
    queryKey: ['forms', 'individual'],
    queryFn: () => getFormTemplates('individual'),
  });

  const { data: individualDocuments } = useQuery({
    queryKey: ['documents', 'individual'],
    queryFn: () => getDocuments('individual'),
  });

  // Load business forms and documents
  const { data: businessForms } = useQuery({
    queryKey: ['forms', 'business'],
    queryFn: () => getFormTemplates('business'),
  });

  const { data: businessDocuments } = useQuery({
    queryKey: ['documents', 'business'],
    queryFn: () => getDocuments('business'),
  });

  // Transform participants data to include forms, documents, and businesses
  useEffect(() => {
    const loadParticipantData = async () => {
      if (!participantsData || participantsLoading) return;
      
      const transformedParticipants: Participant[] = [];
      
      for (const participant of participantsData) {
        // Get assigned documents and forms for the individual
        const assignedDocs = await getAssignedDocuments(participant.participant_id);
        const assignedForms = await getAssignedForms(participant.participant_id);
        
        // Format documents and forms for individual
        const documents = assignedDocs.map(doc => ({
          document_id: doc.document.document_id,
          name: doc.document.name
        }));
        
        const forms = assignedForms.map(form => ({
          form_id: form.form.form_id,
          name: form.form.name
        }));
        
        // Get businesses owned by this participant
        const businesses = await getBusinessesByOwnerId(participant.user_id);
        let business: Business | undefined;
        
        if (businesses.length > 0) {
          const businessData = businesses[0]; // Just get the first business for now
          
          // Get assigned documents and forms for the business
          const businessDocs = await getAssignedDocuments(participant.participant_id, businessData.business_id);
          const businessForms = await getAssignedForms(participant.participant_id, businessData.business_id);
          
          business = {
            business_id: businessData.business_id,
            name: businessData.name,
            entity_type: businessData.entity_type,
            documents: businessDocs.map(doc => ({
              document_id: doc.document.document_id,
              name: doc.document.name
            })),
            forms: businessForms.map(form => ({
              form_id: form.form.form_id,
              name: form.form.name
            }))
          };
        }

        transformedParticipants.push({
          participant_id: participant.participant_id,
          user_id: participant.user_id,
          name: participant.user.name,
          email: participant.user.email,
          role: participant.user.role,
          documents,
          forms,
          business
        });
      }
      
      setParticipants(transformedParticipants);
    };
    
    loadParticipantData();
  }, [participantsData, participantsLoading]);

  const handleAddParticipant = (participant: Omit<Participant, 'participant_id' | 'documents' | 'forms' | 'user_id'>) => {
    // In a real app, this would call an API to add the participant
    toast(`${participant.role === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
    // Refetch participants to update the list
    refetchParticipants();
  };

  const handleRemoveParticipant = (id: string) => {
    // In a real app, this would call an API to remove the participant
    toast('Participant removed');
    // Refetch participants to update the list
    refetchParticipants();
  };

  const handleAssignDocument = (items: { name: string }[]) => {
    if (!currentParticipant) return;
    
    toast(`${assignmentType === 'documents' ? 'Documents' : 'Forms'} assigned to ${currentParticipant.name} successfully`);
    setIsAssignmentDialogOpen(false);
    // Refetch participants to update the list
    refetchParticipants();
  };

  const openAssignDialog = (participant: Participant, type: 'documents' | 'forms', entity: 'individual' | 'business' = 'individual') => {
    setCurrentParticipant(participant);
    setAssignmentType(type);
    setEntityType(entity);
    setIsAssignmentDialogOpen(true);
  };

  const buyers = participants.filter(p => p.role === 'buyer');
  const sellers = participants.filter(p => p.role === 'seller');
  const bankUsers = participants.filter(p => p.role !== 'buyer' && p.role !== 'seller');

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (projectLoading || participantsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 px-4 md:px-6 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            
            <Tabs defaultValue="buyers">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="buyers">Buyers</TabsTrigger>
                <TabsTrigger value="sellers">Sellers</TabsTrigger>
                <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buyers" className="mt-6">
                <Skeleton className="h-72 w-full" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Project</span>
                </Button>
              </div>
              <h1 className="text-3xl font-bold mt-4">Project Participants</h1>
              <p className="text-muted-foreground">{project?.project_name}</p>
            </div>
            <Button 
              onClick={() => navigate(`/project/dashboard/${projectId}`)}
            >
              View Project Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="buyers">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="bank">Bank Personnel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyers" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Buyers</h2>
                <Button 
                  onClick={() => {
                    setIsParticipantDialogOpen(true);
                    // Pre-select buyer type
                    setCurrentParticipant({ participant_id: '', user_id: '', name: '', email: '', role: 'buyer', documents: [], forms: [] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Buyer
                </Button>
              </div>
              
              {buyers.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground mb-4">No buyers added yet</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsParticipantDialogOpen(true);
                        setCurrentParticipant({ participant_id: '', user_id: '', name: '', email: '', role: 'buyer', documents: [], forms: [] });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Buyer
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {buyers.map(buyer => (
                    <ParticipantCard 
                      key={buyer.participant_id}
                      participant={buyer}
                      onDelete={() => handleRemoveParticipant(buyer.participant_id)}
                      onAssignDocuments={() => openAssignDialog(buyer, 'documents')}
                      onAssignForms={() => openAssignDialog(buyer, 'forms')}
                      onAssignBusinessDocuments={buyer.business ? 
                        () => openAssignDialog(buyer, 'documents', 'business') : undefined}
                      onAssignBusinessForms={buyer.business ? 
                        () => openAssignDialog(buyer, 'forms', 'business') : undefined}
                      onAddBusiness={() => toast('Add business functionality would be implemented here')}
                      formTemplates={{ individual: individualForms || [], business: businessForms || [] }}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="sellers" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Sellers</h2>
                <Button 
                  onClick={() => {
                    setIsParticipantDialogOpen(true);
                    // Pre-select seller type
                    setCurrentParticipant({ participant_id: '', user_id: '', name: '', email: '', role: 'seller', documents: [], forms: [] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Seller
                </Button>
              </div>
              
              {sellers.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground mb-4">No sellers added yet</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsParticipantDialogOpen(true);
                        setCurrentParticipant({ participant_id: '', user_id: '', name: '', email: '', role: 'seller', documents: [], forms: [] });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Seller
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {sellers.map(seller => (
                    <ParticipantCard 
                      key={seller.participant_id}
                      participant={seller}
                      onDelete={() => handleRemoveParticipant(seller.participant_id)}
                      onAssignDocuments={() => openAssignDialog(seller, 'documents')}
                      onAssignForms={() => openAssignDialog(seller, 'forms')}
                      onAssignBusinessDocuments={seller.business ? 
                        () => openAssignDialog(seller, 'documents', 'business') : undefined}
                      onAssignBusinessForms={seller.business ? 
                        () => openAssignDialog(seller, 'forms', 'business') : undefined}
                      onAddBusiness={() => toast('Add business functionality would be implemented here')}
                      formTemplates={{ individual: individualForms || [], business: businessForms || [] }}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bank" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bank Personnel</h2>
              </div>
              
              {bankUsers.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground mb-4">No bank personnel assigned to this project</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bankUsers.map(user => (
                    <Card key={user.participant_id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{user.name}</CardTitle>
                              <CardDescription>{user.email}</CardDescription>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="outline" className="capitalize">
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <ParticipantDialog 
        open={isParticipantDialogOpen}
        onOpenChange={setIsParticipantDialogOpen}
        onSave={handleAddParticipant}
        defaultType={currentParticipant?.role}
      />

      <AssignmentDialog
        open={isAssignmentDialogOpen}
        onOpenChange={setIsAssignmentDialogOpen}
        onSave={handleAssignDocument}
        type={assignmentType}
        participantName={currentParticipant?.name || ''}
      />
    </div>
  );
};

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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="individual">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span>Individual Requirements</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
            </AccordionContent>
          </AccordionItem>
          
          {participant.business && (
            <AccordionItem value="business">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>Business: {participant.business.name}</span>
                  <Badge variant="outline" className="ml-2">{participant.business.entity_type}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
        
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

export default ProjectParticipants;

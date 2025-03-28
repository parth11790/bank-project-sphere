
import React, { useState } from 'react';
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
import { 
  projects, 
  getUserById, 
  getBusinessByOwnerId, 
  individualEntityForms, 
  businessEntityForms 
} from '@/lib/mockData';

interface Form {
  id: string;
  name: string;
}

interface Document {
  id: string;
  name: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'seller';
  role: string;
  documents: Document[];
  forms: Form[];
  business?: {
    name: string;
    entity_type: string;
    documents: Document[];
    forms: Form[];
  };
}

const ProjectParticipants: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [assignmentType, setAssignmentType] = useState<'documents' | 'forms'>('documents');
  const [entityType, setEntityType] = useState<'individual' | 'business'>('individual');
  
  // Get project from mock data
  const project = projects.find(p => p.project_id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 px-4 md:px-6 max-w-6xl">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested project could not be found.</p>
            <Button onClick={() => navigate('/projects')}>
              View All Projects
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  // Transform project participants data into the format we need
  const transformParticipants = (): Participant[] => {
    if (!project.participants) return [];
    
    return project.participants.map(p => {
      const user = getUserById(p.userId);
      if (!user) return null;
      
      const business = user.business ? {
        name: user.business,
        entity_type: getBusinessByOwnerId(user.user_id)?.entity_type || 'Unknown',
        documents: [
          { id: 'd1', name: 'Tax Returns' },
          { id: 'd2', name: 'Balance Sheet' }
        ],
        forms: businessEntityForms.slice(0, 3).map(form => ({ id: form.id, name: form.name }))
      } : undefined;
      
      return {
        id: user.user_id,
        name: user.name,
        email: user.email,
        type: (user.role === 'buyer' || user.role === 'seller') ? user.role as 'buyer' | 'seller' : 'buyer',
        role: user.role,
        documents: [
          { id: 'd1', name: 'Proof of Identity' },
          { id: 'd2', name: 'Proof of Address' }
        ],
        forms: individualEntityForms.slice(0, 3).map(form => ({ id: form.id, name: form.name })),
        business
      };
    }).filter(Boolean) as Participant[];
  };
  
  const participants = transformParticipants();
  
  const handleAddParticipant = (participant: Omit<Participant, 'id' | 'documents' | 'forms' | 'role'>) => {
    // In a real app, this would call an API to add the participant
    toast(`${participant.type === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
  };

  const handleRemoveParticipant = (id: string) => {
    // In a real app, this would call an API to remove the participant
    toast('Participant removed');
  };

  const handleAssignDocument = (items: { name: string }[]) => {
    if (!currentParticipant) return;
    
    toast(`${assignmentType === 'documents' ? 'Documents' : 'Forms'} assigned to ${currentParticipant.name} successfully`);
    setIsAssignmentDialogOpen(false);
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

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
                  onClick={() => navigate(`/project/dashboard/${projectId}`)}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Project</span>
                </Button>
              </div>
              <h1 className="text-3xl font-bold mt-4">Project Participants</h1>
              <p className="text-muted-foreground">{project.project_name}</p>
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
                    setCurrentParticipant({ id: '', name: '', email: '', type: 'buyer', role: 'buyer', documents: [], forms: [] });
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
                        setCurrentParticipant({ id: '', name: '', email: '', type: 'buyer', role: 'buyer', documents: [], forms: [] });
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
                      key={buyer.id}
                      participant={buyer}
                      onDelete={() => handleRemoveParticipant(buyer.id)}
                      onAssignDocuments={() => openAssignDialog(buyer, 'documents')}
                      onAssignForms={() => openAssignDialog(buyer, 'forms')}
                      onAssignBusinessDocuments={buyer.business ? 
                        () => openAssignDialog(buyer, 'documents', 'business') : undefined}
                      onAssignBusinessForms={buyer.business ? 
                        () => openAssignDialog(buyer, 'forms', 'business') : undefined}
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
                    setCurrentParticipant({ id: '', name: '', email: '', type: 'seller', role: 'seller', documents: [], forms: [] });
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
                        setCurrentParticipant({ id: '', name: '', email: '', type: 'seller', role: 'seller', documents: [], forms: [] });
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
                      key={seller.id}
                      participant={seller}
                      onDelete={() => handleRemoveParticipant(seller.id)}
                      onAssignDocuments={() => openAssignDialog(seller, 'documents')}
                      onAssignForms={() => openAssignDialog(seller, 'forms')}
                      onAssignBusinessDocuments={seller.business ? 
                        () => openAssignDialog(seller, 'documents', 'business') : undefined}
                      onAssignBusinessForms={seller.business ? 
                        () => openAssignDialog(seller, 'forms', 'business') : undefined}
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
                    <Card key={user.id}>
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
        defaultType={currentParticipant?.type}
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
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onAssignDocuments,
  onAssignForms,
  onAssignBusinessDocuments,
  onAssignBusinessForms
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
                        <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
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
                          key={form.id} 
                          className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
                          onClick={() => handleFormClick(form.id, form.name)}
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
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
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
                            key={form.id} 
                            className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
                            onClick={() => handleFormClick(form.id, form.name)}
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
            <Button variant="outline" size="sm" className="w-full">
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


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, ClipboardCheck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParticipantDialog from '@/components/ParticipantDialog';
import AssignmentDialog from '@/components/AssignmentDialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Participant {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'seller';
  documents: { id: string; name: string }[];
  forms: { id: string; name: string }[];
}

const ProjectParticipants: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isParticipantDialogOpen, setIsParticipantDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [assignmentType, setAssignmentType] = useState<'documents' | 'forms'>('documents');
  
  // Mock data - in a real app this would come from an API
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'buyer',
      documents: [{ id: 'd1', name: 'Proof of Income' }],
      forms: [{ id: 'f1', name: 'Personal Information' }]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      type: 'seller',
      documents: [{ id: 'd2', name: 'Property Deed' }],
      forms: []
    }
  ]);

  const handleAddParticipant = (participant: Omit<Participant, 'id' | 'documents' | 'forms'>) => {
    const newParticipant: Participant = {
      ...participant,
      id: `p-${Date.now()}`,
      documents: [],
      forms: []
    };
    
    setParticipants([...participants, newParticipant]);
    toast(`${participant.type === 'buyer' ? 'Buyer' : 'Seller'} added successfully`);
    setIsParticipantDialogOpen(false);
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
    toast('Participant removed');
  };

  const handleAssignDocument = (items: { name: string }[]) => {
    if (!currentParticipant) return;
    
    setParticipants(participants.map(p => {
      if (p.id === currentParticipant.id) {
        return {
          ...p,
          [assignmentType]: [
            ...p[assignmentType],
            ...items.map(item => ({ id: `${assignmentType.charAt(0)}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, name: item.name }))
          ]
        };
      }
      return p;
    }));

    setIsAssignmentDialogOpen(false);
    toast(`${assignmentType === 'documents' ? 'Documents' : 'Forms'} assigned successfully`);
  };

  const openAssignDialog = (participant: Participant, type: 'documents' | 'forms') => {
    setCurrentParticipant(participant);
    setAssignmentType(type);
    setIsAssignmentDialogOpen(true);
  };

  const buyers = participants.filter(p => p.type === 'buyer');
  const sellers = participants.filter(p => p.type === 'seller');

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
              <h1 className="text-3xl font-bold mb-1">Project Participants</h1>
              <p className="text-muted-foreground">Project ID: {projectId}</p>
            </div>
            <Button 
              className="w-full sm:w-auto"
              onClick={() => navigate(`/project/dashboard/${projectId}`)}
            >
              View Project Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="buyers">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyers" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Buyers</h2>
                <Button 
                  onClick={() => {
                    setIsParticipantDialogOpen(true);
                    // Pre-select buyer type
                    setCurrentParticipant({ id: '', name: '', email: '', type: 'buyer', documents: [], forms: [] });
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
                        setCurrentParticipant({ id: '', name: '', email: '', type: 'buyer', documents: [], forms: [] });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Buyer
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {buyers.map(buyer => (
                    <ParticipantCard 
                      key={buyer.id}
                      participant={buyer}
                      onDelete={() => handleRemoveParticipant(buyer.id)}
                      onAssignDocuments={() => openAssignDialog(buyer, 'documents')}
                      onAssignForms={() => openAssignDialog(buyer, 'forms')}
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
                    setCurrentParticipant({ id: '', name: '', email: '', type: 'seller', documents: [], forms: [] });
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
                        setCurrentParticipant({ id: '', name: '', email: '', type: 'seller', documents: [], forms: [] });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Seller
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {sellers.map(seller => (
                    <ParticipantCard 
                      key={seller.id}
                      participant={seller}
                      onDelete={() => handleRemoveParticipant(seller.id)}
                      onAssignDocuments={() => openAssignDialog(seller, 'documents')}
                      onAssignForms={() => openAssignDialog(seller, 'forms')}
                    />
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
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
  onDelete,
  onAssignDocuments,
  onAssignForms
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{participant.name}</CardTitle>
            <CardDescription>{participant.email}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
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
              <div className="flex flex-wrap gap-2">
                {participant.documents.map(doc => (
                  <Badge key={doc.id} variant="secondary" className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {doc.name}
                  </Badge>
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
              <div className="flex flex-wrap gap-2">
                {participant.forms.map(form => (
                  <Badge key={form.id} variant="secondary" className="flex items-center">
                    <ClipboardCheck className="h-3 w-3 mr-1" />
                    {form.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectParticipants;

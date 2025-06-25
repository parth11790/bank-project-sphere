
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, User, FileText, Users, Building } from 'lucide-react';
import { getProjectById } from '@/services';
import { useParticipantClassification } from '@/hooks/useParticipantClassification';
import { getParticipantSections } from '@/types/participantSections';
import EditableBusinessInfoSection from '@/components/business/EditableBusinessInfoSection';
import EditableBusinessFormsSection from '@/components/business/EditableBusinessFormsSection';
import EditableBusinessOwnershipSection from '@/components/business/EditableBusinessOwnershipSection';
import AffiliatedBusinessOwnershipSection from '@/components/business/AffiliatedBusinessOwnershipSection';
import PersonalInformationForm from '@/components/participants/forms/PersonalInformationForm';

interface ParticipantPageManagerProps {
  participantId: string;
  projectId: string;
}

const ParticipantPageManager: React.FC<ParticipantPageManagerProps> = ({
  participantId,
  projectId
}) => {
  const [activeTab, setActiveTab] = useState('info');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId
  });

  const { allParticipants } = useParticipantClassification(project || {} as any);
  
  const participant = allParticipants.find(p => p.participant_id === participantId);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!participant || !project) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">Participant Not Found</h2>
          <p className="text-muted-foreground">The requested participant could not be found.</p>
        </div>
      </Layout>
    );
  }

  // Get participant type configuration
  const participantTypeKey = `${participant.category}${participant.entity_type === 'individual' ? '_individual' : '_business'}`;
  const sectionConfig = getParticipantSections(participantTypeKey);

  // Build available tabs based on configuration
  const availableTabs = [];
  
  if (sectionConfig.business_information && participant.entity_type === 'business') {
    availableTabs.push({ 
      id: 'business_info', 
      label: 'Business Information', 
      icon: Building2 
    });
  }
  
  if (!sectionConfig.business_information && participant.entity_type === 'individual') {
    availableTabs.push({ 
      id: 'personal_info', 
      label: 'Personal Information', 
      icon: User 
    });
  }
  
  if (sectionConfig.forms) {
    availableTabs.push({ 
      id: 'forms', 
      label: 'Forms & Documents', 
      icon: FileText 
    });
  }
  
  if (sectionConfig.ownership) {
    availableTabs.push({ 
      id: 'ownership', 
      label: 'Ownership', 
      icon: Users 
    });
  }
  
  if (sectionConfig.affiliated_business_ownership) {
    availableTabs.push({ 
      id: 'affiliated', 
      label: 'Affiliated Businesses', 
      icon: Building 
    });
  }

  // Set default active tab to first available
  React.useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.find(t => t.id === activeTab)) {
      setActiveTab(availableTabs[0].id);
    }
  }, [availableTabs, activeTab]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {participant.name}
          </h1>
          <p className="text-muted-foreground">
            {participant.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} - {participant.entity_type.charAt(0).toUpperCase() + participant.entity_type.slice(1)}
          </p>
        </div>

        {/* Tab Navigation */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
              {availableTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 flex-1"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'business_info' && participant.entity_type === 'business' && (
            <EditableBusinessInfoSection
              business={participant.metadata}
            />
          )}
          
          {activeTab === 'personal_info' && participant.entity_type === 'individual' && (
            <PersonalInformationForm />
          )}
          
          {activeTab === 'forms' && (
            participant.entity_type === 'business' ? (
              <EditableBusinessFormsSection
                business={participant.metadata}
              />
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Individual forms section - to be implemented</p>
              </div>
            )
          )}
          
          {activeTab === 'ownership' && (
            <EditableBusinessOwnershipSection
              projectId={projectId}
              owners={project.owners || []}
            />
          )}
          
          {activeTab === 'affiliated' && (
            <AffiliatedBusinessOwnershipSection
              projectId={projectId}
              owners={project.owners || []}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ParticipantPageManager;

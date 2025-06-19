import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { personalInformationSchema, PersonalInformationFormValues } from './schemas/personalInformationSchema';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import BusinessOwnershipSection from './components/BusinessOwnershipSection';
import { MilitarySection } from './components/MilitarySection';
import { BackgroundSection } from './components/BackgroundSection';
import { CertificationSection } from './components/CertificationSection';
import { FormsAssignmentSection } from './components/FormsAssignmentSection';
import { NetWorthSection } from './components/NetWorthSection';
import { ArrowLeft, Save } from 'lucide-react';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { getOwnerPersonalInformation } from '@/lib/mockDataServices/ownerService';
import { Participant } from '@/types/participant';
import { ReferencesSection } from './components/ReferencesSection';

const PersonalInformationForm: React.FC = () => {
  const {
    projectId,
    participantId
  } = useParams<{
    projectId: string;
    participantId: string;
  }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      education: [{
        school_name: '',
        degree_certification: '',
        area_of_study: '',
        start_date: new Date()
      }],
      employment_history: [{
        employer_name: '',
        position_title: '',
        start_date: new Date(),
        responsibilities: '',
        reason_for_leaving: ''
      }],
      professional_references: [{
        reference_name: '',
        relationship: '',
        phone_number: '',
        email_address: ''
      }, {
        reference_name: '',
        relationship: '',
        phone_number: '',
        email_address: ''
      }, {
        reference_name: '',
        relationship: '',
        phone_number: '',
        email_address: ''
      }],
      primary_phone_type: 'cell',
      marital_status: 'unmarried',
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',
      military_service: 'no',
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    }
  });
  useEffect(() => {
    const fetchParticipant = async () => {
      if (projectId && participantId) {
        try {
          setIsLoading(true);
          console.log('PersonalInfoForm: Fetching participant with ID:', participantId, 'for project:', projectId);
          const participants = await getParticipantsWithDetailsData(projectId);
          console.log('PersonalInfoForm: Available participants:', participants.map(p => ({
            id: p.participant_id,
            name: p.name
          })));
          let foundParticipant = null;

          // If this is an owner ID, we need to find the corresponding participant
          if (participantId.startsWith('owner_')) {
            console.log('PersonalInfoForm: Handling owner ID:', participantId);

            // For owner_5_1, we need to find the participant from project 5
            // Extract project number from owner ID (owner_5_1 -> project 5)
            const ownerIdMatch = participantId.match(/owner_(\d+)_(\d+)/);
            if (ownerIdMatch) {
              const ownerProjectNum = ownerIdMatch[1];
              const ownerIndex = ownerIdMatch[2];
              console.log('PersonalInfoForm: Owner project:', ownerProjectNum, 'Owner index:', ownerIndex);

              // Find any participant from this project since we're just using it for display
              // The actual data comes from the owner service
              foundParticipant = participants.length > 0 ? participants[0] : null;
              if (foundParticipant) {
                // Create a mock participant for the owner
                foundParticipant = {
                  ...foundParticipant,
                  participant_id: participantId,
                  name: `Owner ${ownerIndex}` // Temporary name, will be overridden by form data
                };
              }
            }
          } else {
            // Regular participant ID lookup
            foundParticipant = participants.find(p => p.participant_id === participantId);
          }
          console.log('PersonalInfoForm: Found participant:', foundParticipant);
          if (foundParticipant) {
            setParticipant(foundParticipant);
            setError(null);

            // Load mock data for owner if this is an owner ID
            if (participantId.startsWith('owner_')) {
              console.log('PersonalInfoForm: Loading owner mock data for:', participantId);
              const ownerData = getOwnerPersonalInformation(participantId);
              form.reset(ownerData);
              console.log('PersonalInfoForm: Loaded owner data:', ownerData);

              // Update participant name with the actual owner name
              setParticipant(prev => prev ? {
                ...prev,
                name: ownerData.first_name + ' ' + ownerData.last_name
              } : null);
            }
          } else {
            console.error('PersonalInfoForm: Participant not found with ID:', participantId);
            setError(`Participant with ID "${participantId}" not found`);
            toast.error('Participant not found');
          }
        } catch (error) {
          console.error('PersonalInfoForm: Error fetching participant:', error);
          setError('Failed to load participant information');
          toast.error('Failed to load participant information');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchParticipant();
  }, [projectId, participantId, form]);
  const onSubmit = (data: PersonalInformationFormValues) => {
    console.log('Personal Information Form Data:', data);
    toast.success('Personal information saved successfully');
    // In a real app, this would save to the backend
  };
  const handleBack = () => {
    navigate(`/project/participants/${projectId}`);
  };
  const tabs = [{
    id: 'personal',
    label: 'Personal Info',
    component: PersonalInfoSection
  }, {
    id: 'military',
    label: 'Military Service',
    component: MilitarySection
  }, {
    id: 'background',
    label: 'Background',
    component: BackgroundSection
  }, {
    id: 'certification',
    label: 'Certification',
    component: CertificationSection
  }, {
    id: 'networth',
    label: 'Net Worth',
    component: NetWorthSection
  }];
  if (isLoading) {
    return <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading participant information...</p>
          </div>
        </div>
      </div>;
  }
  if (error) {
    return <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <p className="text-destructive mb-4">{error}</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Debug info:</p>
              <p>Project ID: {projectId}</p>
              <p>Participant ID: {participantId}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Participants
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>;
  }
  if (!participant) {
    return <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="mb-4">Participant not found</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
          </div>
        </div>
      </div>;
  }
  return <div className="w-[90%] mx-auto p-4 space-y-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Personal Information Form</h1>
              <p className="text-muted-foreground">Complete personal information for {participant?.name}</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Personal Information - {participant?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 w-full">
                    {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                        {tab.label}
                      </TabsTrigger>)}
                  </TabsList>

                  {tabs.map(tab => {
                  const Component = tab.component;
                  return <TabsContent key={tab.id} value={tab.id} className="mt-4">
                        <Component form={form} participant={participant} />
                      </TabsContent>;
                })}
                </Tabs>

                <div className="flex justify-end space-x-2 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Information
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>;
};

export default PersonalInformationForm;

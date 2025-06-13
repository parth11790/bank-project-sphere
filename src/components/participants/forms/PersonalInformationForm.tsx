
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
import { EducationSection } from './components/EducationSection';
import { EmploymentSection } from './components/EmploymentSection';
import { ReferencesSection } from './components/ReferencesSection';
import { BusinessOwnershipSection } from './components/BusinessOwnershipSection';
import { MilitarySection } from './components/MilitarySection';
import { BackgroundSection } from './components/BackgroundSection';
import { CertificationSection } from './components/CertificationSection';
import { ArrowLeft, Save } from 'lucide-react';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Participant } from '@/types/participant';

const PersonalInformationForm: React.FC = () => {
  const { projectId, participantId } = useParams<{ projectId: string; participantId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [participant, setParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    const fetchParticipant = async () => {
      if (projectId && participantId) {
        try {
          const participants = await getParticipantsWithDetailsData(projectId);
          const foundParticipant = participants.find(p => p.participant_id === participantId);
          if (foundParticipant) {
            setParticipant(foundParticipant);
          }
        } catch (error) {
          console.error('Error fetching participant:', error);
        }
      }
    };

    fetchParticipant();
  }, [projectId, participantId]);

  const form = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      education: [{ school_name: '', degree_certification: '', area_of_study: '', start_date: new Date() }],
      employment_history: [{ employer_name: '', position_title: '', start_date: new Date(), responsibilities: '', reason_for_leaving: '' }],
      professional_references: [
        { reference_name: '', relationship: '', phone_number: '', email_address: '' },
        { reference_name: '', relationship: '', phone_number: '', email_address: '' },
        { reference_name: '', relationship: '', phone_number: '', email_address: '' }
      ],
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
      pledged_property: 'no',
    },
  });

  const onSubmit = (data: PersonalInformationFormValues) => {
    console.log('Personal Information Form Data:', data);
    toast.success('Personal information saved successfully');
    // In a real app, this would save to the backend
  };

  const handleBack = () => {
    navigate(`/project/participants/${projectId}`);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoSection },
    { id: 'education', label: 'Education', component: EducationSection },
    { id: 'employment', label: 'Employment', component: EmploymentSection },
    { id: 'references', label: 'References', component: ReferencesSection },
    { id: 'business', label: 'Businesses & Ownership', component: BusinessOwnershipSection },
    { id: 'military', label: 'Military Service', component: MilitarySection },
    { id: 'background', label: 'Background', component: BackgroundSection },
    { id: 'certification', label: 'Certification', component: CertificationSection },
  ];

  if (!participant) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <p>Loading participant information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Personal Information Form</h1>
              <p className="text-muted-foreground">Complete personal information for {participant.name}</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information & Resume - {participant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
                    {tabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {tabs.map((tab) => {
                    const Component = tab.component;
                    return (
                      <TabsContent key={tab.id} value={tab.id} className="mt-6">
                        <Component form={form} participant={participant} />
                      </TabsContent>
                    );
                  })}
                </Tabs>

                <Separator />

                <div className="flex justify-end space-x-4">
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
    </div>
  );
};

export default PersonalInformationForm;


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { netWorthSchema, NetWorthFormValues } from './schemas/netWorthSchema';
import { NetWorthSection } from './components/NetWorthSection';
import { ArrowLeft, Save } from 'lucide-react';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { getOwnerPersonalInformation } from '@/lib/mockDataServices/ownerService';
import { Participant } from '@/types/participant';

const NetWorthForm: React.FC = () => {
  const { projectId, participantId } = useParams<{ projectId: string; participantId: string }>();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<NetWorthFormValues>({
    resolver: zodResolver(netWorthSchema),
    defaultValues: {
      participant_id: participantId || '',
      participant_name: '',
      // Initialize with empty strings for all net worth fields
      credit_individual_name: '',
      credit_individual_score: '',
      credit_individual_source: '',
      credit_individual_date: '',
      credit_spouse_name: '',
      credit_spouse_score: '',
      credit_spouse_source: '',
      credit_spouse_date: '',
      // Assets
      networth_cash_on_hand: '0',
      networth_savings_accounts: '0',
      networth_ira_retirement: '0',
      networth_accounts_notes_receivable: '0',
      networth_csvli_cash_value: '0',
      networth_stocks_bonds: '0',
      networth_real_estate_residence: '0',
      networth_real_estate_commercial: '0',
      networth_real_estate_investment: '0',
      networth_real_estate_rental: '0',
      networth_automobiles: '0',
      networth_other_personal_property: '0',
      networth_other_assets: '0',
      // Liabilities
      networth_accounts_payable: '0',
      networth_notes_payable_banks: '0',
      networth_auto_loans: '0',
      networth_other_installment: '0',
      networth_loan_life_insurance: '0',
      networth_education_loans: '0',
      networth_mortgage_sfr: '0',
      networth_mortgage_commercial: '0',
      networth_mortgage_investment: '0',
      networth_mortgage_rental: '0',
      networth_unpaid_taxes: '0',
      networth_margin_accounts: '0',
      networth_other_liabilities: '0',
    },
  });

  useEffect(() => {
    const fetchParticipant = async () => {
      if (projectId && participantId) {
        try {
          setIsLoading(true);
          console.log('NetWorthForm: Fetching participant with ID:', participantId, 'for project:', projectId);
          
          const participants = await getParticipantsWithDetailsData(projectId);
          console.log('NetWorthForm: Available participants:', participants.map(p => ({ id: p.participant_id, name: p.name })));
          
          let foundParticipant = null;
          
          // If this is an owner ID, we need to find the corresponding participant
          if (participantId.startsWith('owner_')) {
            console.log('NetWorthForm: Handling owner ID:', participantId);
            
            const ownerIdMatch = participantId.match(/owner_(\d+)_(\d+)/);
            if (ownerIdMatch) {
              const ownerProjectNum = ownerIdMatch[1];
              const ownerIndex = ownerIdMatch[2];
              
              foundParticipant = participants.length > 0 ? participants[0] : null;
              
              if (foundParticipant) {
                foundParticipant = {
                  ...foundParticipant,
                  participant_id: participantId,
                  name: `Owner ${ownerIndex}`,
                };
              }
            }
          } else {
            foundParticipant = participants.find(p => p.participant_id === participantId);
          }
          
          if (foundParticipant) {
            setParticipant(foundParticipant);
            setError(null);
            
            // Load mock data for owner if this is an owner ID
            if (participantId.startsWith('owner_')) {
              const ownerData = getOwnerPersonalInformation(participantId);
              const participantName = `${ownerData.first_name} ${ownerData.last_name}`;
              
              // Set form values with owner data if available
              form.setValue('participant_name', participantName);
              form.setValue('participant_id', participantId);
              
              // Set some mock net worth data for demonstration
              if (ownerData.networth_cash_on_hand) form.setValue('networth_cash_on_hand', ownerData.networth_cash_on_hand);
              if (ownerData.networth_savings_accounts) form.setValue('networth_savings_accounts', ownerData.networth_savings_accounts);
              if (ownerData.credit_individual_name) form.setValue('credit_individual_name', ownerData.credit_individual_name);
              if (ownerData.credit_individual_score) form.setValue('credit_individual_score', ownerData.credit_individual_score);
              
              setParticipant(prev => prev ? { ...prev, name: participantName } : null);
            } else {
              form.setValue('participant_name', foundParticipant.name);
            }
          } else {
            console.error('NetWorthForm: Participant not found with ID:', participantId);
            setError(`Participant with ID "${participantId}" not found`);
            toast.error('Participant not found');
          }
        } catch (error) {
          console.error('NetWorthForm: Error fetching participant:', error);
          setError('Failed to load participant information');
          toast.error('Failed to load participant information');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchParticipant();
  }, [projectId, participantId, form]);

  const onSubmit = (data: NetWorthFormValues) => {
    console.log('Net Worth Form Data:', data);
    toast.success('Net worth information saved successfully');
    // In a real app, this would save to the backend
  };

  const handleBack = () => {
    navigate(`/project/participants/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading participant information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-4">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="mb-4">Participant not found</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto p-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Participants
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Net Worth Assessment</h1>
              <p className="text-muted-foreground">Financial evaluation for {participant.name}</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Net Worth Statement - {participant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <NetWorthSection form={form} participant={participant} />

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Net Worth Statement
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

export default NetWorthForm;

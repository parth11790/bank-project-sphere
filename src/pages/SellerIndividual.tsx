
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSection } from '@/components/participants/forms/components/PersonalInfoSection';
import { PersonalDetailsSection } from '@/components/participants/forms/components/PersonalDetailsSection';
import { FormsAssignmentSection } from '@/components/participants/forms/components/FormsAssignmentSection';
import { personalInformationSchema, PersonalInformationFormValues } from '@/components/participants/forms/schemas/personalInformationSchema';

const SellerIndividual = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const form = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      suffix: '',
      title: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      date_of_birth: undefined,
      ssn: '',
      marital_status: '',
      us_citizen: '',
      liable_for_alimony: '',
      delinquent_child_support: '',
      us_government_employee: '',
      assets_in_trust: '',
      military_service: ''
    }
  });

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/project/${projectId}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Seller - Individual</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <PersonalInfoSection form={form} />
          <PersonalDetailsSection form={form} />
          <FormsAssignmentSection />
        </div>
      </div>
    </Layout>
  );
};

export default SellerIndividual;

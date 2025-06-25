
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
      first_name: 'John',
      last_name: 'Seller',
      middle_name: 'Michael',
      primary_phone_number: '(555) 123-4567',
      email: 'john.seller@email.com',
      address: '789 Seller Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
      date_of_birth: new Date('1975-06-15'),
      ssn: '123-45-6789',
      marital_status: 'married',
      us_citizen: 'yes',
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      assets_in_trust: 'no',
      military_service: 'no'
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

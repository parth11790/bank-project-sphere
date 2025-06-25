
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { PersonalInfoSection } from '@/components/participants/forms/components/PersonalInfoSection';
import { PersonalDetailsSection } from '@/components/participants/forms/components/PersonalDetailsSection';
import { FormsAssignmentSection } from '@/components/participants/forms/components/FormsAssignmentSection';

const SellerIndividual = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

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
          <PersonalInfoSection />
          <PersonalDetailsSection />
          <FormsAssignmentSection />
        </div>
      </div>
    </Layout>
  );
};

export default SellerIndividual;


import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { BusinessInfoSection } from '@/components/business/BusinessInfoSection';
import { BusinessOwnershipSection } from '@/components/business/BusinessOwnershipSection';
import { BusinessFormsSection } from '@/components/business/BusinessFormsSection';

const SellerBusiness = () => {
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
              <Building2 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Seller - Business</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BusinessInfoSection />
          <BusinessFormsSection />
          <BusinessOwnershipSection />
        </div>
      </div>
    </Layout>
  );
};

export default SellerBusiness;


import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import BusinessInfoSection from '@/components/business/BusinessInfoSection';
import BusinessFormsSection from '@/components/business/BusinessFormsSection';
import BusinessOwnershipSection from '@/components/business/BusinessOwnershipSection';
import AffiliatedBusinessOwnershipSection from '@/components/business/AffiliatedBusinessOwnershipSection';

const AcquisitionBusiness = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock business data matching the correct Business interface
  const mockBusiness = {
    business_id: 'acquisition-business-1',
    name: 'Target Acquisition Corp',
    entity_type: 'Corporation',
    owner_id: 'user_1',
    ein: '12-3456789',
    dateEstablished: '2020-01-15',
    industryNaicsCode: '541511',
    description: 'Technology consulting and software development services',
    address: {
      street: '789 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94105'
    },
    phone: '(415) 555-0199',
    email: 'info@targetacquisition.com',
    website: 'www.targetacquisition.com',
    financial_data: {}
  };

  // Mock owners data for acquisition business
  const mockOwners = [
    {
      id: 'acquisition-owner-1',
      name: 'Sarah Mitchell',
      entityType: 'Individual' as const,
      ownershipPercentage: 60.0,
      title: 'Founder & CEO',
      email: 'sarah.mitchell@targetacquisition.com'
    },
    {
      id: 'acquisition-owner-2',
      name: 'Tech Ventures Fund',
      entityType: 'Business' as const,
      ownershipPercentage: 40.0,
      title: 'Investment Partner',
      email: 'contact@techventuresfund.com'
    }
  ];

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
              <h1 className="text-2xl font-bold">Acquisition Business</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BusinessInfoSection business={mockBusiness} />
          <BusinessFormsSection business={mockBusiness} />
          <BusinessOwnershipSection projectId={projectId || ''} owners={mockOwners} />
          <AffiliatedBusinessOwnershipSection projectId={projectId || ''} owners={mockOwners} />
        </div>
      </div>
    </Layout>
  );
};

export default AcquisitionBusiness;

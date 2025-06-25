
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import BusinessInfoSection from '@/components/business/BusinessInfoSection';
import BusinessOwnershipSection from '@/components/business/BusinessOwnershipSection';
import BusinessFormsSection from '@/components/business/BusinessFormsSection';

const OwnerBusiness = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock business data matching the correct Business interface
  const mockBusiness = {
    business_id: 'owner-business-1',
    name: 'Owner Holdings LLC',
    entity_type: 'LLC',
    owner_id: 'user_2',
    ein: '98-7654321',
    dateEstablished: '2018-03-10',
    industryNaicsCode: '531120',
    description: 'Real estate investment and property management',
    address: {
      street: '456 Business Park Drive',
      city: 'Los Angeles',
      state: 'CA',
      zip_code: '90210'
    },
    phone: '(310) 555-0188',
    email: 'contact@ownerholdings.com',
    website: 'www.ownerholdings.com',
    financial_data: {
      '2022': {
        revenue: 850000,
        wages: 320000,
        cogs: 370000,
        gross_profit: 480000,
        other_expenses: 110000,
        total_noi: 120000,
        nom_percentage: 14.1
      }
    }
  };

  // Mock owners data
  const mockOwners = [
    {
      id: 'owner-1',
      name: 'Michael Thompson',
      entityType: 'Individual' as const,
      ownershipPercentage: 65.0,
      title: 'Managing Member',
      email: 'michael.thompson@ownerholdings.com'
    },
    {
      id: 'owner-2',
      name: 'Sarah Williams',
      entityType: 'Individual' as const,
      ownershipPercentage: 35.0,
      title: 'Member',
      email: 'sarah.williams@ownerholdings.com'
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
              <h1 className="text-2xl font-bold">Owner - Business</h1>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <BusinessInfoSection business={mockBusiness} />
          <BusinessFormsSection business={mockBusiness} />
          <BusinessOwnershipSection projectId={projectId || ''} owners={mockOwners} />
        </div>
      </div>
    </Layout>
  );
};

export default OwnerBusiness;

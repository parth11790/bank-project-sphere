
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import BusinessInfoSection from '@/components/business/BusinessInfoSection';
import BusinessOwnershipSection from '@/components/business/BusinessOwnershipSection';
import BusinessFormsSection from '@/components/business/BusinessFormsSection';

const SellerBusiness = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock business data matching the correct Business interface
  const mockBusiness = {
    business_id: 'seller-business-1',
    name: 'Seller Enterprises Inc',
    entity_type: 'Corporation',
    owner_id: 'user_3',
    ein: '11-2233445',
    dateEstablished: '2015-07-20',
    industryNaicsCode: '423450',
    description: 'Medical equipment and supplies distribution',
    address: {
      street: '123 Commerce Street',
      city: 'San Diego',
      state: 'CA',
      zip_code: '92101'
    },
    phone: '(619) 555-0177',
    email: 'info@sellerenterprises.com',
    website: 'www.sellerenterprises.com',
    financial_data: {
      '2023': {
        revenue: 1200000,
        wages: 480000,
        cogs: 520000,
        gross_profit: 680000,
        other_expenses: 180000,
        total_noi: 220000,
        nom_percentage: 18.3
      }
    }
  };

  // Mock owners data
  const mockOwners = [
    {
      id: 'seller-owner-1',
      name: 'Robert Davis',
      entityType: 'Individual' as const,
      ownershipPercentage: 55.0,
      title: 'CEO & President',
      email: 'robert.davis@sellerenterprises.com'
    },
    {
      id: 'seller-owner-2',
      name: 'Jennifer Martinez',
      entityType: 'Individual' as const,
      ownershipPercentage: 45.0,
      title: 'COO & Vice President',
      email: 'jennifer.martinez@sellerenterprises.com'
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
              <h1 className="text-2xl font-bold">Seller - Business</h1>
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

export default SellerBusiness;

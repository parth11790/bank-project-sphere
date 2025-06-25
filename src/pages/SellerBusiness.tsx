
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

  // Mock business data
  const mockBusiness = {
    id: 'seller-business-1',
    name: 'Seller Enterprises Inc',
    entityType: 'Corporation',
    ein: '11-2233445',
    dateEstablished: '2015-07-20',
    industryNaicsCode: '423450',
    description: 'Medical equipment and supplies distribution',
    address: '123 Commerce Street',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    phone: '(619) 555-0177',
    email: 'info@sellerenterprises.com',
    website: 'www.sellerenterprises.com'
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

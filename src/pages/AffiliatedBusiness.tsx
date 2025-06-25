
import React from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import BusinessInfoSection from '@/components/business/BusinessInfoSection';
import BusinessOwnershipSection from '@/components/business/BusinessOwnershipSection';
import BusinessFormsSection from '@/components/business/BusinessFormsSection';
import AffiliatedBusinessOwnershipSection from '@/components/business/AffiliatedBusinessOwnershipSection';

const AffiliatedBusiness = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Mock business data
  const mockBusiness = {
    id: 'affiliated-business-1',
    name: 'Affiliated Ventures LLC',
    entityType: 'LLC',
    ein: '55-6677889',
    dateEstablished: '2019-11-05',
    industryNaicsCode: '541990',
    description: 'Business consulting and advisory services',
    address: '321 Partnership Avenue',
    city: 'Sacramento',
    state: 'CA',
    zipCode: '95814',
    phone: '(916) 555-0166',
    email: 'info@affiliatedventures.com',
    website: 'www.affiliatedventures.com'
  };

  // Mock owners data
  const mockOwners = [
    {
      id: 'affiliated-owner-1',
      name: 'David Chen',
      entityType: 'Individual' as const,
      ownershipPercentage: 40.0,
      title: 'Managing Partner',
      email: 'david.chen@affiliatedventures.com'
    },
    {
      id: 'affiliated-owner-2',
      name: 'Lisa Rodriguez',
      entityType: 'Individual' as const,
      ownershipPercentage: 35.0,
      title: 'Senior Partner',
      email: 'lisa.rodriguez@affiliatedventures.com'
    },
    {
      id: 'affiliated-owner-3',
      name: 'Investment Group Alpha',
      entityType: 'Business' as const,
      ownershipPercentage: 25.0,
      title: 'Limited Partner',
      email: 'contact@investmentgroupalpha.com'
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
              <h1 className="text-2xl font-bold">Affiliated Business</h1>
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

export default AffiliatedBusiness;

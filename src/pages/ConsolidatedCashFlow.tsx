
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, Settings } from 'lucide-react';
import ConsolidatedCashFlowTable from '@/components/consolidated-cash-flow/ConsolidatedCashFlowTable';
import BusinessSelectionSettings from '@/components/consolidated-cash-flow/BusinessSelectionSettings';

const ConsolidatedCashFlow = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>(['business_1', 'business_2']);

  // Mock business data
  const availableBusinesses = [
    { id: 'business_1', name: 'Main Operating Business LLC', type: 'Main Business' },
    { id: 'business_2', name: 'Real Estate Holdings LLC', type: 'Owner Business' },
    { id: 'business_3', name: 'Tech Consulting Solutions LLC', type: 'Affiliated Business' },
    { id: 'business_4', name: 'Marketing Services Inc', type: 'Affiliated Business' },
    { id: 'seller_1', name: 'Seller Enterprises Inc', type: 'Seller Business' }
  ];

  const handleBusinessSelectionChange = (businessIds: string[]) => {
    setSelectedBusinesses(businessIds);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
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
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Consolidated Cash Flow Analysis</h1>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Business Settings
          </Button>
        </div>

        {showSettings && (
          <BusinessSelectionSettings
            availableBusinesses={availableBusinesses}
            selectedBusinesses={selectedBusinesses}
            onSelectionChange={handleBusinessSelectionChange}
            onClose={() => setShowSettings(false)}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Consolidated Cash Flow Summary</CardTitle>
            <CardDescription>
              Combined financial analysis across {selectedBusinesses.length} selected businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConsolidatedCashFlowTable 
              projectId={projectId || ''}
              selectedBusinesses={selectedBusinesses}
              availableBusinesses={availableBusinesses}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ConsolidatedCashFlow;

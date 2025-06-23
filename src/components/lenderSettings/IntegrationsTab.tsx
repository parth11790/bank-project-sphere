
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Integration {
  id: string;
  name: string;
  description: string;
  module: string;
  status: 'active' | 'inactive' | 'pending';
  provider: string;
  logoUrl?: string;
  features: string[];
  lastSync?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: 'plaid-financial',
    name: 'Plaid Financial Data',
    description: 'Automated bank account verification and financial data gathering',
    module: 'Financial Information',
    status: 'active',
    provider: 'Plaid',
    features: ['Bank Account Verification', 'Transaction History', 'Balance Verification', 'Cash Flow Analysis'],
    lastSync: '2024-01-15 14:30:00'
  },
  {
    id: 'plaid-identity',
    name: 'Plaid Identity Verification',
    description: 'Document verification and identity validation services',
    module: 'Identity Verification',
    status: 'inactive',
    provider: 'Plaid',
    features: ['ID Document Verification', 'Address Verification', 'Phone Verification']
  },
  {
    id: 'finicity',
    name: 'Finicity Open Banking',
    description: 'Comprehensive financial data aggregation and verification',
    module: 'Financial Information',
    status: 'pending',
    provider: 'Finicity',
    features: ['Bank Statements', 'Credit Reports', 'Income Verification', 'Asset Verification']
  },
  {
    id: 'compliancey',
    name: 'Compliancey Risk Assessment',
    description: 'Automated compliance checks and risk assessment tools',
    module: 'Compliance & Risk',
    status: 'active',
    provider: 'Compliancey',
    features: ['AML Screening', 'OFAC Checks', 'Credit Bureau Integration', 'Risk Scoring'],
    lastSync: '2024-01-15 12:15:00'
  }
];

export const IntegrationsTab = () => {
  const navigate = useNavigate();
  const [integrations] = useState<Integration[]>(mockIntegrations);

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Settings className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusVariant = (status: Integration['status']) => {
    switch (status) {
      case 'active':
        return 'default' as const;
      case 'inactive':
        return 'secondary' as const;
      case 'pending':
        return 'outline' as const;
    }
  };

  const handleConfigureIntegration = (integrationId: string) => {
    navigate(`/lender-settings/integrations/${integrationId}`);
  };

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    const module = integration.module;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(integration);
    return acc;
  }, {} as Record<string, Integration[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Third-Party Integrations</h2>
          <p className="text-muted-foreground">
            Manage your data gathering and verification service integrations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {Object.entries(groupedIntegrations).map(([module, moduleIntegrations]) => (
        <Card key={module}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{module}</span>
              <Badge variant="outline">{moduleIntegrations.length} integrations</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moduleIntegrations.map((integration) => (
                <Card key={integration.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {integration.provider.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{integration.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(integration.status)}
                        <Badge variant={getStatusVariant(integration.status)} className="text-xs">
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{integration.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground">
                        Last sync: {new Date(integration.lastSync).toLocaleString()}
                      </p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleConfigureIntegration(integration.id)}
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="ghost" className="px-2">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

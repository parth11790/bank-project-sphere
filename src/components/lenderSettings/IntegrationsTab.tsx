
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Link, Shield, DollarSign, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Integration {
  id: string;
  name: string;
  provider: string;
  module: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Pending';
  icon: React.ComponentType<{ className?: string }>;
  configuredAt?: string;
  lastSync?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: 'plaid-financial',
    name: 'Plaid Financial',
    provider: 'Plaid',
    module: 'Financial Information',
    description: 'Gather and verify financial information from bank accounts',
    status: 'Active',
    icon: DollarSign,
    configuredAt: '2024-01-15',
    lastSync: '2024-06-23'
  },
  {
    id: 'plaid-identity',
    name: 'Plaid Identity',
    provider: 'Plaid',
    module: 'Identity Verification',
    description: 'Verify identity documents uploaded by users',
    status: 'Active',
    icon: Shield,
    configuredAt: '2024-01-15',
    lastSync: '2024-06-23'
  },
  {
    id: 'finicity',
    name: 'Finicity',
    provider: 'Mastercard',
    module: 'Financial Information',
    description: 'Alternative financial information gathering and verification',
    status: 'Inactive',
    icon: FileCheck
  },
  {
    id: 'compliancey',
    name: 'Compliancey',
    provider: 'Compliancey',
    module: 'Compliance & Verification',
    description: 'Comprehensive compliance and document verification',
    status: 'Pending',
    icon: Shield
  }
];

export const IntegrationsTab: React.FC = () => {
  const navigate = useNavigate();
  const [integrations] = useState<Integration[]>(mockIntegrations);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfigureIntegration = (integrationId: string) => {
    navigate(`/lender-settings/integration/${integrationId}`);
  };

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.module]) {
      acc[integration.module] = [];
    }
    acc[integration.module].push(integration);
    return acc;
  }, {} as Record<string, Integration[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Third-Party Integrations</h2>
            <p className="text-muted-foreground">
              Configure API connections for data gathering and verification services
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedIntegrations).map(([module, moduleIntegrations]) => (
          <Card key={module}>
            <CardHeader>
              <CardTitle className="text-lg">{module}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {moduleIntegrations.map((integration) => {
                  const IconComponent = integration.icon;
                  return (
                    <div key={integration.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">{integration.provider}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600">{integration.description}</p>

                      {integration.status === 'Active' && (
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>Configured: {integration.configuredAt}</p>
                          <p>Last Sync: {integration.lastSync}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConfigureIntegration(integration.id)}
                          className="flex-1"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          {integration.status === 'Active' ? 'Configure' : 'Setup'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, TestTube, Key, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface IntegrationConfig {
  id: string;
  name: string;
  provider: string;
  apiAccountId: string;
  clientId: string;
  clientSecret: string;
  webhookUrl: string;
  environment: 'sandbox' | 'production';
  isActive: boolean;
  lastTested?: string;
  endpoints: {
    name: string;
    url: string;
    enabled: boolean;
  }[];
}

const IntegrationDetails = () => {
  const { integrationId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in real app, this would be fetched based on integrationId
  const [config, setConfig] = useState<IntegrationConfig>({
    id: integrationId || '',
    name: 'Plaid Financial',
    provider: 'Plaid',
    apiAccountId: 'plaid_account_12345',
    clientId: 'client_id_67890',
    clientSecret: '••••••••••••••••',
    webhookUrl: 'https://api.communityfirstbank.com/webhooks/plaid',
    environment: 'sandbox',
    isActive: true,
    lastTested: '2024-06-23T10:30:00Z',
    endpoints: [
      { name: 'Accounts', url: '/accounts/get', enabled: true },
      { name: 'Transactions', url: '/transactions/get', enabled: true },
      { name: 'Identity', url: '/identity/get', enabled: false },
      { name: 'Assets', url: '/assets/report/get', enabled: true }
    ]
  });

  const [editForm, setEditForm] = useState<IntegrationConfig>(config);

  const handleSave = () => {
    setConfig(editForm);
    setIsEditing(false);
    toast.success('Integration configuration saved successfully');
    console.log('[AUDIT] Integration config updated:', integrationId, 'by Current User at', new Date().toISOString());
  };

  const handleTestConnection = () => {
    toast.success('Connection test successful');
    setConfig(prev => ({ ...prev, lastTested: new Date().toISOString() }));
    console.log('[AUDIT] Integration connection tested:', integrationId, 'by Current User at', new Date().toISOString());
  };

  const updateField = (field: keyof IntegrationConfig, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateEndpoint = (index: number, enabled: boolean) => {
    setEditForm(prev => ({
      ...prev,
      endpoints: prev.endpoints.map((endpoint, i) => 
        i === index ? { ...endpoint, enabled } : endpoint
      )
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/lender-settings')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{config.name} Configuration</h1>
              <p className="text-muted-foreground">
                Configure API settings and endpoints for {config.provider}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleTestConnection}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button onClick={() => setIsEditing(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Configuration
                </Button>
              </>
            )}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiAccountId">API Account ID</Label>
                    {isEditing ? (
                      <Input
                        id="apiAccountId"
                        value={editForm.apiAccountId}
                        onChange={(e) => updateField('apiAccountId', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                        {config.apiAccountId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    {isEditing ? (
                      <Input
                        id="clientId"
                        value={editForm.clientId}
                        onChange={(e) => updateField('clientId', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                        {config.clientId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientSecret">Client Secret</Label>
                  {isEditing ? (
                    <Input
                      id="clientSecret"
                      type="password"
                      value={editForm.clientSecret}
                      onChange={(e) => updateField('clientSecret', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                      {config.clientSecret}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  {isEditing ? (
                    <Input
                      id="webhookUrl"
                      value={editForm.webhookUrl}
                      onChange={(e) => updateField('webhookUrl', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                      {config.webhookUrl}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Environment</Label>
                    <div className="flex gap-2">
                      <Badge variant={config.environment === 'sandbox' ? 'default' : 'outline'}>
                        Sandbox
                      </Badge>
                      <Badge variant={config.environment === 'production' ? 'default' : 'outline'}>
                        Production
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={isEditing ? editForm.isActive : config.isActive}
                      onCheckedChange={(checked) => updateField('isActive', checked)}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(isEditing ? editForm.endpoints : config.endpoints).map((endpoint, index) => (
                    <div key={endpoint.name} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{endpoint.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {endpoint.url}
                        </p>
                      </div>
                      <Switch
                        checked={endpoint.enabled}
                        onCheckedChange={(checked) => updateEndpoint(index, checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Connection Status</Label>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      Connected
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Last Tested</Label>
                  <p className="text-sm text-muted-foreground">
                    {config.lastTested ? new Date(config.lastTested).toLocaleString() : 'Never'}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Environment</Label>
                  <p className="text-sm text-muted-foreground capitalize">
                    {config.environment}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Provider</Label>
                  <p className="text-sm text-muted-foreground">
                    {config.provider}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">API Calls Today</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Limit</span>
                  <span className="text-sm font-medium">50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="text-sm font-medium">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Response Time</span>
                  <span className="text-sm font-medium">245ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntegrationDetails;

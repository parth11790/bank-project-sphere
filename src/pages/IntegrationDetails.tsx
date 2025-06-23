
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, TestTube, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface IntegrationConfig {
  apiAccountId: string;
  apiKey: string;
  webhookUrl: string;
  environment: 'sandbox' | 'production';
  isEnabled: boolean;
  rateLimitPerMinute: number;
  timeoutSeconds: number;
  retryAttempts: number;
  description: string;
}

const mockIntegrationDetails = {
  'plaid-financial': {
    name: 'Plaid Financial Data',
    provider: 'Plaid',
    description: 'Automated bank account verification and financial data gathering',
    module: 'Financial Information',
    status: 'active' as const,
    features: ['Bank Account Verification', 'Transaction History', 'Balance Verification', 'Cash Flow Analysis'],
    apiDocs: 'https://plaid.com/docs/api/',
    supportEmail: 'support@plaid.com'
  },
  'plaid-identity': {
    name: 'Plaid Identity Verification',
    provider: 'Plaid',
    description: 'Document verification and identity validation services',
    module: 'Identity Verification',
    status: 'inactive' as const,
    features: ['ID Document Verification', 'Address Verification', 'Phone Verification'],
    apiDocs: 'https://plaid.com/docs/identity/',
    supportEmail: 'support@plaid.com'
  }
};

export default function IntegrationDetails() {
  const { integrationId } = useParams();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState<IntegrationConfig>({
    apiAccountId: 'acc_12345678901234567890',
    apiKey: '••••••••••••••••••••••••••••••••',
    webhookUrl: 'https://your-domain.com/webhooks/plaid',
    environment: 'sandbox',
    isEnabled: true,
    rateLimitPerMinute: 300,
    timeoutSeconds: 30,
    retryAttempts: 3,
    description: 'Production integration for customer financial data verification'
  });

  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const integration = integrationId ? mockIntegrationDetails[integrationId as keyof typeof mockIntegrationDetails] : null;

  if (!integration) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Integration Not Found</h1>
            <Button onClick={() => navigate('/lender-settings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSave = () => {
    toast.success('Integration configuration saved successfully');
    console.log('Saving integration config:', config);
  };

  const handleTest = async () => {
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult(Math.random() > 0.3 ? 'success' : 'error');
      toast.success('Connection test completed');
    } catch (error) {
      setTestResult('error');
      toast.error('Connection test failed');
    }
  };

  const updateConfig = (field: keyof IntegrationConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
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
              <h1 className="text-2xl font-bold">{integration.name}</h1>
              <p className="text-muted-foreground">
                Configure your {integration.provider} integration settings
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleTest}>
              <TestTube className="h-4 w-4 mr-2" />
              Test Connection
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* API Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiAccountId">API Account ID</Label>
                    <Input
                      id="apiAccountId"
                      value={config.apiAccountId}
                      onChange={(e) => updateConfig('apiAccountId', e.target.value)}
                      placeholder="Enter your account ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="environment">Environment</Label>
                    <select
                      id="environment"
                      value={config.environment}
                      onChange={(e) => updateConfig('environment', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="sandbox">Sandbox</option>
                      <option value="production">Production</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={config.apiKey}
                    onChange={(e) => updateConfig('apiKey', e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={config.webhookUrl}
                    onChange={(e) => updateConfig('webhookUrl', e.target.value)}
                    placeholder="https://your-domain.com/webhooks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={config.description}
                    onChange={(e) => updateConfig('description', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="isEnabled">Enable Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Turn this integration on or off
                    </p>
                  </div>
                  <Switch
                    id="isEnabled"
                    checked={config.isEnabled}
                    onCheckedChange={(checked) => updateConfig('isEnabled', checked)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimitPerMinute">Rate Limit (per minute)</Label>
                    <Input
                      id="rateLimitPerMinute"
                      type="number"
                      value={config.rateLimitPerMinute}
                      onChange={(e) => updateConfig('rateLimitPerMinute', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeoutSeconds">Timeout (seconds)</Label>
                    <Input
                      id="timeoutSeconds"
                      type="number"
                      value={config.timeoutSeconds}
                      onChange={(e) => updateConfig('timeoutSeconds', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input
                      id="retryAttempts"
                      type="number"
                      value={config.retryAttempts}
                      onChange={(e) => updateConfig('retryAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Integration Info */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Provider</Label>
                  <p className="text-sm">{integration.provider}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Module</Label>
                  <p className="text-sm">{integration.module}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                    {integration.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Features</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Test Result */}
            {testResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {testResult === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    Connection Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${testResult === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {testResult === 'success' 
                      ? 'Connection successful! Integration is working properly.'
                      : 'Connection failed. Please check your configuration and try again.'
                    }
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">API Documentation</Label>
                  <a 
                    href={integration.apiDocs} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    {integration.apiDocs}
                  </a>
                </div>
                <div>
                  <Label className="text-sm font-medium">Support Email</Label>
                  <a 
                    href={`mailto:${integration.supportEmail}`}
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    {integration.supportEmail}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

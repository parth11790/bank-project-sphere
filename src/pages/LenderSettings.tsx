
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentGatheringTemplatesList } from '@/components/documentTemplates/DocumentGatheringTemplatesList';
import { AddTemplateDialog } from '@/components/documentTemplates/AddTemplateDialog';
import { LenderDropdownManager } from '@/components/lenderSettings/LenderDropdownManager';
import { LenderProfileTab } from '@/components/lenderSettings/LenderProfileTab';
import { IntegrationsTab } from '@/components/lenderSettings/IntegrationsTab';
import { UsersTab } from '@/components/lenderSettings/UsersTab';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';

const LenderSettings = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('lender-profile');
  const {
    templates,
    addTemplate,
    deleteTemplate,
    updateTemplate
  } = useDocumentTemplates();

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Lender Settings</h1>
              <p className="text-muted-foreground">
                Configure your lending institution's settings and preferences
              </p>
            </div>
          </div>
          {activeTab === 'document-templates' && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          )}
        </div>
        
        <Separator className="my-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lender-profile">Lender Profile</TabsTrigger>
            <TabsTrigger value="document-templates">Document Templates</TabsTrigger>
            <TabsTrigger value="dropdown-values">Dropdown Values</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="lender-profile">
            <LenderProfileTab />
          </TabsContent>

          <TabsContent value="document-templates">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentGatheringTemplatesList
                  templates={templates}
                  onDelete={deleteTemplate}
                  onUpdate={updateTemplate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dropdown-values">
            <LenderDropdownManager />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
        </Tabs>

        <AddTemplateDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={addTemplate}
        />
      </div>
    </Layout>
  );
};

export default LenderSettings;

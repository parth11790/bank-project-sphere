
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
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { LenderProfileTab } from '@/components/lenderSettings/LenderProfileTab';
import { IntegrationsTab } from '@/components/lenderSettings/IntegrationsTab';
import { UsersTab } from '@/components/lenderSettings/UsersTab';
import { LenderDropdownManager } from '@/components/lenderSettings/LenderDropdownManager';

const LenderSettings = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
                Manage your lender configuration, integrations, and users
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />

        <Tabs defaultValue="lender" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lender">Lender</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="dropdowns">Dropdown Values</TabsTrigger>
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="lender">
            <LenderProfileTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="dropdowns">
            <LenderDropdownManager />
          </TabsContent>

          <TabsContent value="templates">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Document Gathering Templates</h2>
                <p className="text-muted-foreground">
                  Manage document collection templates for different loan types and participants
                </p>
              </div>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>

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

            <AddTemplateDialog
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              onAdd={addTemplate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LenderSettings;

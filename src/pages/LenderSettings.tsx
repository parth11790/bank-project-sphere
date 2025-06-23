
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentGatheringTemplatesList } from '@/components/documentTemplates/DocumentGatheringTemplatesList';
import { AddTemplateDialog } from '@/components/documentTemplates/AddTemplateDialog';
import { useDocumentTemplates } from '@/hooks/useDocumentTemplates';

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
              <h1 className="text-2xl font-bold">Document Gathering Templates</h1>
              <p className="text-muted-foreground">
                Manage document collection templates for different loan types and participants
              </p>
            </div>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Template
          </Button>
        </div>
        
        <Separator className="my-6" />

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
      </div>
    </Layout>
  );
};

export default LenderSettings;

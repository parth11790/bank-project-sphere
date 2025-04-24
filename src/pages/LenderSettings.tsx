
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import LoanSettingsForm from '@/components/lenderSettings/LoanSettingsForm';
import LoanSettingsList from '@/components/lenderSettings/LoanSettingsList';
import DocumentRequirementsForm from '@/components/lenderSettings/DocumentRequirementsForm';
import DocumentRequirementsList from '@/components/lenderSettings/DocumentRequirementsList';
import ApprovalWorkflows from '@/components/lenderSettings/ApprovalWorkflows';
import { loanTypes } from '@/lib/mockData/lenderSettings';
import { useLenderSettings } from '@/hooks/useLenderSettings';

const LenderSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loan-settings");
  const {
    loanSettings,
    documentRequirements,
    newSetting,
    newFormRequirement,
    handleSettingChange,
    handleFormChange,
    handleAddSetting,
    handleAddFormRequirement,
    handleDeleteSetting,
    handleDeleteRequirement
  } = useLenderSettings();

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
            <h1 className="text-2xl font-bold">Lender Settings</h1>
          </div>
        </div>
        
        <Separator className="my-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-xl">
            <TabsTrigger value="loan-settings">Loan Settings</TabsTrigger>
            <TabsTrigger value="document-requirements">Document Requirements</TabsTrigger>
            <TabsTrigger value="approval-workflows">Approval Workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="loan-settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Settings Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LoanSettingsForm
                    newSetting={newSetting}
                    loanTypes={loanTypes}
                    onSettingChange={handleSettingChange}
                    onAddSetting={handleAddSetting}
                  />
                  <LoanSettingsList
                    settings={loanSettings}
                    onDeleteSetting={handleDeleteSetting}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="document-requirements" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DocumentRequirementsForm
                    newFormRequirement={newFormRequirement}
                    loanTypes={loanTypes}
                    onFormChange={handleFormChange}
                    onAddForm={handleAddFormRequirement}
                  />
                  <DocumentRequirementsList
                    requirements={documentRequirements}
                    onDeleteRequirement={handleDeleteRequirement}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approval-workflows" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflow Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <ApprovalWorkflows />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LenderSettings;

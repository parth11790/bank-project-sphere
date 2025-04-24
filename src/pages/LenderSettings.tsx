
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoanSettingsForm from '@/components/lenderSettings/LoanSettingsForm';
import LoanSettingsList from '@/components/lenderSettings/LoanSettingsList';
import DocumentRequirementsForm from '@/components/lenderSettings/DocumentRequirementsForm';
import DocumentRequirementsList from '@/components/lenderSettings/DocumentRequirementsList';
import ApprovalWorkflows from '@/components/lenderSettings/ApprovalWorkflows';

// Mock data for loan types
const loanTypes = [
  "SBA 7(a)",
  "SBA 504",
  "Commercial Real Estate",
  "Business Acquisition",
  "Equipment Financing",
  "Working Capital",
  "Line of Credit"
];

// Mock data for loan settings and required forms
const initialLoanSettings = [
  {
    id: "1",
    loanType: "SBA 7(a)",
    amountMin: 50000,
    amountMax: 500000,
    interestRate: 7.5,
    term: 10,
    amortization: 120,
    softCostPercentage: 3.5
  },
  {
    id: "2",
    loanType: "SBA 7(a)",
    amountMin: 500001,
    amountMax: 5000000,
    interestRate: 6.75,
    term: 25,
    amortization: 300,
    softCostPercentage: 3.0
  },
  {
    id: "3",
    loanType: "SBA 504",
    amountMin: 125000,
    amountMax: 5000000,
    interestRate: 5.25,
    term: 20,
    amortization: 240,
    softCostPercentage: 2.75
  }
];

const initialRequiredForms = [
  {
    id: "1",
    loanType: "SBA 7(a)",
    amountMin: 0,
    amountMax: 5000000,
    participantType: "Borrower",
    formName: "Personal Financial Statement"
  },
  {
    id: "2",
    loanType: "SBA 7(a)",
    amountMin: 0,
    amountMax: 5000000,
    participantType: "Borrower",
    formName: "Business Financial Statement"
  },
  {
    id: "3",
    loanType: "SBA 504",
    amountMin: 0,
    amountMax: 5000000,
    participantType: "Seller",
    formName: "Business Sale Agreement"
  }
];

const LenderSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("loan-settings");
  const [loanSettings, setLoanSettings] = useState(initialLoanSettings);
  const [requiredForms, setRequiredForms] = useState(initialRequiredForms);
  
  // New setting form state
  const [newSetting, setNewSetting] = useState({
    loanType: loanTypes[0],
    amountMin: 0,
    amountMax: 1000000,
    interestRate: 6.0,
    term: 10,
    amortization: 120,
    softCostPercentage: 3.0
  });

  // New form requirement state
  const [newFormRequirement, setNewFormRequirement] = useState({
    loanType: loanTypes[0],
    amountMin: 0,
    amountMax: 1000000,
    participantType: "Borrower",
    formName: ""
  });

  const handleAddLoanSetting = () => {
    setLoanSettings([...loanSettings, { 
      id: Date.now().toString(), 
      ...newSetting 
    }]);
    
    setNewSetting({
      loanType: loanTypes[0],
      amountMin: 0,
      amountMax: 1000000,
      interestRate: 6.0,
      term: 10,
      amortization: 120,
      softCostPercentage: 3.0
    });
  };

  const handleAddFormRequirement = () => {
    setRequiredForms([...requiredForms, { 
      id: Date.now().toString(),
      ...newFormRequirement 
    }]);
    
    setNewFormRequirement({
      loanType: loanTypes[0],
      amountMin: 0,
      amountMax: 1000000,
      participantType: "Borrower",
      formName: ""
    });
  };

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
                    onSettingChange={setNewSetting}
                    onAddSetting={handleAddLoanSetting}
                  />
                  <LoanSettingsList
                    settings={loanSettings}
                    onDeleteSetting={(id) => setLoanSettings(loanSettings.filter(s => s.id !== id))}
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
                    onFormChange={setNewFormRequirement}
                    onAddForm={handleAddFormRequirement}
                  />
                  <DocumentRequirementsList
                    requirements={requiredForms}
                    onDeleteRequirement={(id) => setRequiredForms(requiredForms.filter(f => f.id !== id))}
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

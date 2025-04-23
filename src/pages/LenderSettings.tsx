
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell,
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

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

// Mock data for loan settings
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

// Mock data for required forms
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
    
    // Reset form
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
    
    // Reset form
    setNewFormRequirement({
      loanType: loanTypes[0],
      amountMin: 0,
      amountMax: 1000000,
      participantType: "Borrower",
      formName: ""
    });
  };

  const handleDeleteLoanSetting = (id: string) => {
    setLoanSettings(loanSettings.filter(setting => setting.id !== id));
  };

  const handleDeleteFormRequirement = (id: string) => {
    setRequiredForms(requiredForms.filter(form => form.id !== id));
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

          {/* Loan Settings Tab */}
          <TabsContent value="loan-settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Settings Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Add New Loan Setting</h3>
                      <p className="text-sm text-muted-foreground mb-4">Configure interest rates, terms, and fees for different loan types and amount ranges.</p>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="loanType">Loan Type</Label>
                          <Select
                            value={newSetting.loanType}
                            onValueChange={(value) => setNewSetting({...newSetting, loanType: value})}
                          >
                            <SelectTrigger id="loanType">
                              <SelectValue placeholder="Select Loan Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {loanTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="amountMin">Min Amount ($)</Label>
                            <Input 
                              id="amountMin"
                              type="number"
                              value={newSetting.amountMin}
                              onChange={(e) => setNewSetting({...newSetting, amountMin: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="amountMax">Max Amount ($)</Label>
                            <Input 
                              id="amountMax"
                              type="number"
                              value={newSetting.amountMax}
                              onChange={(e) => setNewSetting({...newSetting, amountMax: Number(e.target.value)})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="interestRate">Interest Rate (%)</Label>
                          <Input 
                            id="interestRate"
                            type="number"
                            step="0.01"
                            value={newSetting.interestRate}
                            onChange={(e) => setNewSetting({...newSetting, interestRate: Number(e.target.value)})}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="term">Term (years)</Label>
                            <Input 
                              id="term"
                              type="number"
                              value={newSetting.term}
                              onChange={(e) => setNewSetting({...newSetting, term: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="amortization">Amortization (months)</Label>
                            <Input 
                              id="amortization"
                              type="number"
                              value={newSetting.amortization}
                              onChange={(e) => setNewSetting({...newSetting, amortization: Number(e.target.value)})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="softCostPercentage">Soft Costs (%)</Label>
                          <Input 
                            id="softCostPercentage"
                            type="number"
                            step="0.01"
                            value={newSetting.softCostPercentage}
                            onChange={(e) => setNewSetting({...newSetting, softCostPercentage: Number(e.target.value)})}
                          />
                        </div>

                        <Button onClick={handleAddLoanSetting} className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Add Setting
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Current Loan Settings</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Loan Type</TableHead>
                            <TableHead>Amount Range</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead>Term</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loanSettings.map((setting) => (
                            <TableRow key={setting.id}>
                              <TableCell>{setting.loanType}</TableCell>
                              <TableCell>${setting.amountMin.toLocaleString()} - ${setting.amountMax.toLocaleString()}</TableCell>
                              <TableCell>{setting.interestRate}%</TableCell>
                              <TableCell>{setting.term} years</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteLoanSetting(setting.id)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Requirements Tab */}
          <TabsContent value="document-requirements" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Add Required Document</h3>
                      <p className="text-sm text-muted-foreground mb-4">Specify which forms are required for different participants based on loan type and amount.</p>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reqLoanType">Loan Type</Label>
                          <Select
                            value={newFormRequirement.loanType}
                            onValueChange={(value) => setNewFormRequirement({...newFormRequirement, loanType: value})}
                          >
                            <SelectTrigger id="reqLoanType">
                              <SelectValue placeholder="Select Loan Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {loanTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="reqAmountMin">Min Amount ($)</Label>
                            <Input 
                              id="reqAmountMin"
                              type="number"
                              value={newFormRequirement.amountMin}
                              onChange={(e) => setNewFormRequirement({...newFormRequirement, amountMin: Number(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reqAmountMax">Max Amount ($)</Label>
                            <Input 
                              id="reqAmountMax"
                              type="number"
                              value={newFormRequirement.amountMax}
                              onChange={(e) => setNewFormRequirement({...newFormRequirement, amountMax: Number(e.target.value)})}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="participantType">Participant Type</Label>
                          <Select
                            value={newFormRequirement.participantType}
                            onValueChange={(value) => setNewFormRequirement({...newFormRequirement, participantType: value})}
                          >
                            <SelectTrigger id="participantType">
                              <SelectValue placeholder="Select Participant Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Borrower">Borrower</SelectItem>
                              <SelectItem value="Buyer">Buyer</SelectItem>
                              <SelectItem value="Seller">Seller</SelectItem>
                              <SelectItem value="Guarantor">Guarantor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="formName">Form Name</Label>
                          <Input 
                            id="formName"
                            value={newFormRequirement.formName}
                            onChange={(e) => setNewFormRequirement({...newFormRequirement, formName: e.target.value})}
                            placeholder="e.g. Personal Financial Statement"
                          />
                        </div>

                        <Button onClick={handleAddFormRequirement} className="mt-2">
                          <Plus className="mr-2 h-4 w-4" /> Add Requirement
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Current Document Requirements</h3>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Loan Type</TableHead>
                            <TableHead>Participant</TableHead>
                            <TableHead>Form</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {requiredForms.map((form) => (
                            <TableRow key={form.id}>
                              <TableCell>{form.loanType}</TableCell>
                              <TableCell>{form.participantType}</TableCell>
                              <TableCell>{form.formName}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteFormRequirement(form.id)}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approval Workflows Tab */}
          <TabsContent value="approval-workflows" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflow Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <h3 className="text-lg font-medium mb-2">SBA 7(a) Loan Approval Workflow</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Application Review by Loan Officer</li>
                      <li>Credit Underwriting</li>
                      <li>Compliance Review</li>
                      <li>Manager Approval for loans > $250,000</li>
                      <li>Final Documentation Generation</li>
                    </ol>
                    <Button className="mt-4" variant="outline">Edit Workflow</Button>
                  </div>
                  
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <h3 className="text-lg font-medium mb-2">SBA 504 Loan Approval Workflow</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Initial Eligibility Check</li>
                      <li>CDC Review and Approval</li>
                      <li>SBA Review</li>
                      <li>Interim Funding Approval</li>
                      <li>Documentation and Closing</li>
                    </ol>
                    <Button className="mt-4" variant="outline">Edit Workflow</Button>
                  </div>
                  
                  <div className="bg-muted/50 p-6 rounded-lg border">
                    <h3 className="text-lg font-medium mb-2">Commercial Real Estate Loan Workflow</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Property Valuation</li>
                      <li>Business Cash Flow Analysis</li>
                      <li>Market Approval</li>
                      <li>Legal Documentation</li>
                      <li>Closing Coordination</li>
                    </ol>
                    <Button className="mt-4" variant="outline">Edit Workflow</Button>
                  </div>
                  
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New Workflow
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LenderSettings;

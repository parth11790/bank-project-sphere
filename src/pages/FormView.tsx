import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Upload, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';

const FormView: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const formName = searchParams.get('name') || 'Form';
  const participantName = searchParams.get('participant') || 'User';
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast(`File "${e.target.files[0].name}" uploaded successfully`);
    }
  };
  
  const handleSubmit = () => {
    toast("Form submitted successfully");
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">{formName}</h1>
            <p className="text-muted-foreground">Participant: {participantName}</p>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>Upload related documents for this form</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload Document</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop files here or click to browse
              </p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </label>
              </Button>
              {file && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Selected file: {file.name}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="form">
          <TabsList className="w-full">
            <TabsTrigger value="form" className="flex-1">Form Questions</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Information</CardTitle>
                <CardDescription>Please fill out all required fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Enter your full name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter your address" />
                  </div>
                  
                  {formName === 'Personal Financial Statement' && (
                    <>
                      <div>
                        <Label htmlFor="assets">Total Assets ($)</Label>
                        <Input id="assets" type="number" placeholder="Enter total assets" />
                      </div>
                      
                      <div>
                        <Label htmlFor="liabilities">Total Liabilities ($)</Label>
                        <Input id="liabilities" type="number" placeholder="Enter total liabilities" />
                      </div>
                      
                      <div>
                        <Label htmlFor="annual-income">Annual Income ($)</Label>
                        <Input id="annual-income" type="number" placeholder="Enter annual income" />
                      </div>
                    </>
                  )}
                  
                  {formName === 'Tax Returns' && (
                    <>
                      <div>
                        <Label htmlFor="tax-year">Tax Year</Label>
                        <Input id="tax-year" placeholder="Enter tax year" />
                      </div>
                      
                      <div>
                        <Label htmlFor="adjusted-gross-income">Adjusted Gross Income ($)</Label>
                        <Input id="adjusted-gross-income" type="number" placeholder="Enter AGI" />
                      </div>
                      
                      <div>
                        <Label htmlFor="total-tax">Total Tax ($)</Label>
                        <Input id="total-tax" type="number" placeholder="Enter total tax" />
                      </div>
                    </>
                  )}
                  
                  {formName === 'Balance Sheet' && (
                    <>
                      <div>
                        <Label htmlFor="current-assets">Current Assets ($)</Label>
                        <Input id="current-assets" type="number" placeholder="Enter current assets" />
                      </div>
                      
                      <div>
                        <Label htmlFor="fixed-assets">Fixed Assets ($)</Label>
                        <Input id="fixed-assets" type="number" placeholder="Enter fixed assets" />
                      </div>
                      
                      <div>
                        <Label htmlFor="current-liabilities">Current Liabilities ($)</Label>
                        <Input id="current-liabilities" type="number" placeholder="Enter current liabilities" />
                      </div>
                      
                      <div>
                        <Label htmlFor="long-term-liabilities">Long Term Liabilities ($)</Label>
                        <Input id="long-term-liabilities" type="number" placeholder="Enter long term liabilities" />
                      </div>
                      
                      <div>
                        <Label htmlFor="equity">Owner's Equity ($)</Label>
                        <Input id="equity" type="number" placeholder="Enter owner's equity" />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Enter any additional information" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Form
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Analysis</CardTitle>
                <CardDescription>Automated analysis based on the provided information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formName === 'Personal Financial Statement' && (
                  <>
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Net Worth Analysis</h3>
                      <p className="text-muted-foreground">
                        Based on the provided information, the net worth (assets minus liabilities) is within acceptable parameters for loan qualification.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Debt-to-Income Ratio</h3>
                      <p className="text-muted-foreground">
                        The calculated debt-to-income ratio is approximately 32%, which is below the 43% threshold typically required for loan approval.
                      </p>
                    </div>
                  </>
                )}
                
                {formName === 'Tax Returns' && (
                  <>
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Income Stability</h3>
                      <p className="text-muted-foreground">
                        The tax returns show consistent income over the past three years, demonstrating financial stability.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Tax Efficiency</h3>
                      <p className="text-muted-foreground">
                        The effective tax rate is within normal range for the reported income level.
                      </p>
                    </div>
                  </>
                )}
                
                {formName === 'Balance Sheet' && (
                  <>
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Current Ratio</h3>
                      <p className="text-muted-foreground">
                        The current ratio (current assets / current liabilities) is 1.8, indicating good short-term financial health.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Debt-to-Equity Ratio</h3>
                      <p className="text-muted-foreground">
                        The debt-to-equity ratio is 0.65, which indicates a moderate level of financial leverage.
                      </p>
                    </div>
                  </>
                )}
                
                {!['Personal Financial Statement', 'Tax Returns', 'Balance Sheet'].includes(formName) && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Form Review</h3>
                    <p className="text-muted-foreground">
                      Once this form is completed, an automated analysis will be generated based on the provided information.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default FormView;

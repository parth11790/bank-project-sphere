import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Upload, Save, FileText, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const FormView: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const formName = searchParams.get('name') || 'Form';
  const participantName = searchParams.get('participant') || 'User';
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [calculatedValues, setCalculatedValues] = useState<{
    grossCashFlow: number;
    netCashFlow: number;
  }>({ grossCashFlow: 0, netCashFlow: 0 });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast(`File "${e.target.files[0].name}" uploaded successfully`);
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    const numValue = value === '' ? '0' : value;
    setFormValues(prev => ({
      ...prev,
      [field]: numValue
    }));
  };
  
  useEffect(() => {
    if (formName === 'Tax Returns') {
      const incomeFields = [
        'wages', 'interest', 'alimony', 'ira', 'pensions',
        'socialSecurity', 'businessIncome', 'rentalIncome', 
        'farmIncome', 'partnershipDistributions', 'capitalContributions',
        'otherIncome'
      ];
      
      const expenseFields = ['taxes', 'otherExpenses', 'livingExpenses'];
      
      const income = incomeFields.reduce((sum, field) => {
        const value = parseFloat(formValues[field] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const expenses = expenseFields.reduce((sum, field) => {
        const value = parseFloat(formValues[field] || '0');
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
      
      const grossCashFlow = income;
      const netCashFlow = income - expenses;
      
      setCalculatedValues({ grossCashFlow, netCashFlow });
    }
  }, [formValues, formName]);
  
  const handleSubmit = () => {
    toast("Form submitted successfully");
  };

  const getContributionIndicator = (fieldType: 'income' | 'expense') => {
    if (fieldType === 'income') {
      return <Plus className="inline h-4 w-4 text-green-500" />;
    } else {
      return <Minus className="inline h-4 w-4 text-red-500" />;
    }
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
              <CardContent>
              {formName === 'Tax Returns' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <Label htmlFor="householdMembers" className="w-1/3">
                      Number of Household Members
                    </Label>
                    <Input 
                      id="householdMembers" 
                      type="number" 
                      placeholder="0"
                      className="flex-1"
                      value={formValues.householdMembers || ''}
                      onChange={(e) => handleInputChange('householdMembers', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="wages" className="w-1/3">
                      {getContributionIndicator('income')} Wages, Salaries ($)
                    </Label>
                    <Input 
                      id="wages" 
                      type="number" 
                      placeholder="0.00" 
                      className="flex-1"
                      value={formValues.wages || ''} 
                      onChange={(e) => handleInputChange('wages', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="interest" className="w-1/3">
                      {getContributionIndicator('income')} Interest & Dividend Income ($)
                    </Label>
                    <Input 
                      id="interest" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.interest || ''}
                      onChange={(e) => handleInputChange('interest', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="alimony" className="w-1/3">
                      {getContributionIndicator('income')} Alimony Received ($)
                    </Label>
                    <Input 
                      id="alimony" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.alimony || ''}
                      onChange={(e) => handleInputChange('alimony', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="ira" className="w-1/3">
                      {getContributionIndicator('income')} IRA Distributions ($)
                    </Label>
                    <Input 
                      id="ira" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.ira || ''}
                      onChange={(e) => handleInputChange('ira', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="pensions" className="w-1/3">
                      {getContributionIndicator('income')} Pensions / Annuities ($)
                    </Label>
                    <Input 
                      id="pensions" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.pensions || ''}
                      onChange={(e) => handleInputChange('pensions', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="socialSecurity" className="w-1/3">
                      {getContributionIndicator('income')} Social Security Benefits ($)
                    </Label>
                    <Input 
                      id="socialSecurity" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.socialSecurity || ''}
                      onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="businessIncome" className="w-1/3">
                      {getContributionIndicator('income')} Schedule C - Business Income / Loss ($)
                    </Label>
                    <Input 
                      id="businessIncome" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.businessIncome || ''}
                      onChange={(e) => handleInputChange('businessIncome', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="businessDepreciation" className="w-1/3">
                      {getContributionIndicator('income')} Schedule C - Business Depreciation / Amortization ($)
                    </Label>
                    <Input 
                      id="businessDepreciation" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.businessDepreciation || ''}
                      onChange={(e) => handleInputChange('businessDepreciation', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="businessInterest" className="w-1/3">
                      {getContributionIndicator('income')} Schedule C - Business Interest ($)
                    </Label>
                    <Input 
                      id="businessInterest" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.businessInterest || ''}
                      onChange={(e) => handleInputChange('businessInterest', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="rentalIncome" className="w-1/3">
                      {getContributionIndicator('income')} Schedule E - Rental Real Estate Income / Loss ($)
                    </Label>
                    <Input 
                      id="rentalIncome" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.rentalIncome || ''}
                      onChange={(e) => handleInputChange('rentalIncome', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="rentalInterest" className="w-1/3">
                      {getContributionIndicator('income')} Schedule E - Rental Real Estate Interest ($)
                    </Label>
                    <Input 
                      id="rentalInterest" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.rentalInterest || ''}
                      onChange={(e) => handleInputChange('rentalInterest', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="rentalDepreciation" className="w-1/3">
                      {getContributionIndicator('income')} Schedule E - Rental Real Estate Depreciation / Amortization ($)
                    </Label>
                    <Input 
                      id="rentalDepreciation" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.rentalDepreciation || ''}
                      onChange={(e) => handleInputChange('rentalDepreciation', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="farmIncome" className="w-1/3">
                      {getContributionIndicator('income')} Schedule F - Farm Income / Loss ($)
                    </Label>
                    <Input 
                      id="farmIncome" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.farmIncome || ''}
                      onChange={(e) => handleInputChange('farmIncome', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="farmInterest" className="w-1/3">
                      {getContributionIndicator('income')} Schedule F - Farm Interest ($)
                    </Label>
                    <Input 
                      id="farmInterest" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.farmInterest || ''}
                      onChange={(e) => handleInputChange('farmInterest', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="farmDepreciation" className="w-1/3">
                      {getContributionIndicator('income')} Schedule F - Farm Depreciation / Amortization ($)
                    </Label>
                    <Input 
                      id="farmDepreciation" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.farmDepreciation || ''}
                      onChange={(e) => handleInputChange('farmDepreciation', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="partnershipDistributions" className="w-1/3">
                      {getContributionIndicator('income')} Partnership / S-Corp Distributions ($)
                    </Label>
                    <Input 
                      id="partnershipDistributions" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.partnershipDistributions || ''}
                      onChange={(e) => handleInputChange('partnershipDistributions', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="capitalContributions" className="w-1/3">
                      {getContributionIndicator('income')} Capital Contributions ($)
                    </Label>
                    <Input 
                      id="capitalContributions" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.capitalContributions || ''}
                      onChange={(e) => handleInputChange('capitalContributions', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="otherIncome" className="w-1/3">
                      {getContributionIndicator('income')} Other Cash Income ($)
                    </Label>
                    <Input 
                      id="otherIncome" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.otherIncome || ''}
                      onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                    />
                  </div>

                  <div className="col-span-full bg-muted p-4 rounded-md flex items-center space-x-4">
                    <Label htmlFor="grossCashFlow" className="w-1/3 font-semibold">
                      {getContributionIndicator('income')} Gross Cash Flow ($)
                    </Label>
                    <Input 
                      id="grossCashFlow" 
                      type="number" 
                      value={calculatedValues.grossCashFlow.toFixed(2)} 
                      readOnly
                      className="flex-1 bg-muted-foreground/10"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="taxes" className="w-1/3">
                      {getContributionIndicator('expense')} Federal & State Taxes ($)
                    </Label>
                    <Input 
                      id="taxes" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.taxes || ''}
                      onChange={(e) => handleInputChange('taxes', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="otherExpenses" className="w-1/3">
                      {getContributionIndicator('expense')} Other Expenses ($)
                    </Label>
                    <Input 
                      id="otherExpenses" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.otherExpenses || ''}
                      onChange={(e) => handleInputChange('otherExpenses', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Label htmlFor="livingExpenses" className="w-1/3">
                      {getContributionIndicator('expense')} Living Expenses ($)
                    </Label>
                    <Input 
                      id="livingExpenses" 
                      type="number" 
                      placeholder="0.00"
                      className="flex-1"
                      value={formValues.livingExpenses || ''}
                      onChange={(e) => handleInputChange('livingExpenses', e.target.value)}
                    />
                  </div>

                  <div className="col-span-full bg-muted p-4 rounded-md flex items-center space-x-4">
                    <Label htmlFor="netCashFlow" className="w-1/3 font-semibold">
                      Net Cash Flow ($)
                    </Label>
                    <Input 
                      id="netCashFlow" 
                      type="number" 
                      value={calculatedValues.netCashFlow.toFixed(2)} 
                      readOnly
                      className="flex-1 bg-muted-foreground/10"
                    />
                  </div>
                </div>
              )}
              
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
                  
                  {formName !== 'Tax Returns' && formName !== 'Personal Financial Statement' && formName !== 'Balance Sheet' && (
                    <>
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
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Enter any additional information" />
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
      </motion.div>
    </Layout>
  );
};

export default FormView;

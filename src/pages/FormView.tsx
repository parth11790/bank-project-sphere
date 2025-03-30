
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

// Import custom components
import FormHeader from '@/components/form/FormHeader';
import DocumentUploadCard from '@/components/form/DocumentUploadCard';
import TaxReturnsForm from '@/components/form/TaxReturnsForm';
import PersonalFinancialStatementForm from '@/components/form/PersonalFinancialStatementForm';
import BalanceSheetForm from '@/components/form/BalanceSheetForm';
import GenericForm from '@/components/form/GenericForm';
import FormAnalysis from '@/components/form/FormAnalysis';

// Import custom hooks
import { useTaxReturnCalculations } from '@/hooks/useTaxReturnCalculations';

const FormView: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const formName = searchParams.get('name') || 'Form';
  const participantName = searchParams.get('participant') || 'User';

  const [file, setFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  
  const calculatedValues = useTaxReturnCalculations(formValues, formName);
  
  const handleInputChange = (field: string, value: string) => {
    const numValue = value === '' ? '0' : value;
    setFormValues(prev => ({
      ...prev,
      [field]: numValue
    }));
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
        <FormHeader 
          formName={formName}
          participantName={participantName}
          onSubmit={handleSubmit}
        />

        <DocumentUploadCard file={file} setFile={setFile} />

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
                  <TaxReturnsForm 
                    formValues={formValues}
                    calculatedValues={calculatedValues}
                    onInputChange={handleInputChange}
                  />
                )}
                
                {formName === 'Personal Financial Statement' && (
                  <PersonalFinancialStatementForm />
                )}
                
                {formName === 'Balance Sheet' && (
                  <BalanceSheetForm />
                )}
                
                {formName !== 'Tax Returns' && formName !== 'Personal Financial Statement' && formName !== 'Balance Sheet' && (
                  <GenericForm />
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
            <FormAnalysis formName={formName} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default FormView;

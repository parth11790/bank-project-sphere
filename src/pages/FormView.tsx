
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
import { logAuditEvent } from '@/services/auditService';

// Import custom components
import FormHeader from '@/components/form/FormHeader';
import TaxReturnsForm from '@/components/form/TaxReturnsForm';
import BusinessTaxReturnsForm from '@/components/form/BusinessTaxReturnsForm';
import PersonalFinancialStatementForm from '@/components/form/PersonalFinancialStatementForm';
import BalanceSheetForm from '@/components/form/BalanceSheetForm';
import BusinessBalanceSheetForm from '@/components/form/BusinessBalanceSheetForm';
import GenericForm from '@/components/form/GenericForm';
import FormAnalysis from '@/components/form/FormAnalysis';
import DebtSummaryForm from '@/components/form/DebtSummaryForm';
import ProfessionalReferencesForm from '@/components/form/ProfessionalReferencesForm';
import ProfessionalResumeForm from '@/components/form/ProfessionalResumeForm';
import NetWorthForm from '@/components/participants/forms/NetWorthForm';

// Import custom hooks
import { useTaxReturnCalculations } from '@/hooks/useTaxReturnCalculations';
import { useBusinessTaxReturnCalculations } from '@/hooks/useBusinessTaxReturnCalculations';

const FormView: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const formName = searchParams.get('name') || 'Form';
  const participantName = searchParams.get('participant') || 'User';
  const projectId = searchParams.get('projectId');
  const participantId = searchParams.get('participantId');
  const entityType = searchParams.get('entityType') || 'individual';

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  
  const calculatedValues = useTaxReturnCalculations(formValues, formName);
  const businessCalculatedValues = useBusinessTaxReturnCalculations(formValues, formName);
  
  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Log field changes for audit
    logAuditEvent({
      userId: 'current_user', // Replace with actual user ID when auth is implemented
      userName: 'Current User',
      projectId: projectId || undefined,
      participantId: participantId || undefined,
      action: 'form_field_updated',
      category: 'form',
      details: {
        formName,
        fieldName: field,
        formId: formId
      }
    });
  };
  
  const handleSubmit = () => {
    // Log form submission
    logAuditEvent({
      userId: 'current_user',
      userName: 'Current User',
      projectId: projectId || undefined,
      participantId: participantId || undefined,
      action: 'form_submitted',
      category: 'form',
      details: {
        formName,
        formId,
        entityType,
        fieldCount: Object.keys(formValues).length
      }
    });

    toast("Form submitted successfully");
  };

  const renderFormContent = () => {
    if (formName === 'Tax Returns') {
      return (
        <TaxReturnsForm 
          formValues={formValues}
          calculatedValues={calculatedValues}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (formName === 'Business Tax Returns' || formName === 'Business Tax Returns (3 years)') {
      return (
        <BusinessTaxReturnsForm 
          formValues={formValues}
          calculatedValues={businessCalculatedValues}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (formName === 'Personal Debt Summary') {
      return (
        <DebtSummaryForm 
          formValues={formValues}
          onInputChange={handleInputChange}
        />
      );
    }
    
    if (formName === 'Personal Financial Statement') {
      return <PersonalFinancialStatementForm />;
    }
    
    if (formName === 'Balance Sheet' && entityType === 'business') {
      return <BusinessBalanceSheetForm />;
    }
    
    if (formName === 'Balance Sheet') {
      return <BalanceSheetForm />;
    }

    if (formName === 'Professional References Form') {
      return (
        <ProfessionalReferencesForm 
          formValues={formValues}
          onInputChange={handleInputChange}
        />
      );
    }

    if (formName === 'Professional Resume') {
      return (
        <ProfessionalResumeForm 
          formValues={formValues}
          onInputChange={handleInputChange}
        />
      );
    }

    if (formName === 'Net worth assessment') {
      return <NetWorthForm />;
    }
    
    return <GenericForm />;
  };

  const shouldShowNotes = ![
    'Professional References Form',
    'Professional Resume',
    'Net worth assessment',
    'Business Tax Returns'
  ].includes(formName);

  const shouldShowFooter = ![
    'Professional References Form',
    'Professional Resume',
    'Net worth assessment',
    'Business Tax Returns'
  ].includes(formName);

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

        <Tabs defaultValue="form">
          <TabsList className="w-full">
            <TabsTrigger value="form" className="flex-1">Form Questions</TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="mt-6 space-y-6">
            <Card>
              <CardContent className="max-h-[70vh] overflow-y-auto pb-8">
                {renderFormContent()}
                
                {shouldShowNotes && (
                  <div className="mt-6">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Enter any additional information" 
                      className="mt-2"
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              {shouldShowFooter && (
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmit}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Form
                  </Button>
                </CardFooter>
              )}
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

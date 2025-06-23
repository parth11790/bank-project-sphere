
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { logAuditEvent } from '@/services/auditService';

// Import custom components
import FormHeader from '@/components/form/FormHeader';
import FormContent from '@/components/form/FormContent';
import FormNotesSection from '@/components/form/FormNotesSection';
import FormFooter from '@/components/form/FormFooter';
import FormAnalysis from '@/components/form/FormAnalysis';

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
                <FormContent 
                  formName={formName}
                  entityType={entityType}
                  formValues={formValues}
                  calculatedValues={calculatedValues}
                  businessCalculatedValues={businessCalculatedValues}
                  onInputChange={handleInputChange}
                />
                
                <FormNotesSection 
                  shouldShow={shouldShowNotes}
                  onInputChange={handleInputChange}
                />
              </CardContent>
              <FormFooter 
                shouldShow={shouldShowFooter}
                onSubmit={handleSubmit}
              />
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

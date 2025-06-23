
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
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

        {/* Analysis Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Analysis</h2>
          <FormAnalysis formName={formName} />
        </div>

        {/* Form Questions Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Form Questions</h2>
          <Card>
            <CardContent className="pb-8">
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
        </div>
      </motion.div>
    </Layout>
  );
};

export default FormView;

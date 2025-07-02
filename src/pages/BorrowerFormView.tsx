import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

// Import form components
import FormHeader from '@/components/form/FormHeader';
import FormContent from '@/components/form/FormContent';
import FormNotesSection from '@/components/form/FormNotesSection';
import FormAnalysis from '@/components/form/FormAnalysis';

// Import custom hooks
import { useTaxReturnCalculations } from '@/hooks/useTaxReturnCalculations';
import { useBusinessTaxReturnCalculations } from '@/hooks/useBusinessTaxReturnCalculations';

const BorrowerFormView: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const formName = searchParams.get('name') || 'Form';
  const participantName = searchParams.get('participant') || 'User';
  const entityType = searchParams.get('entityType') || 'individual';
  const fromDashboard = searchParams.get('fromDashboard') === 'true';

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  const calculatedValues = useTaxReturnCalculations(formValues, formName);
  const businessCalculatedValues = useBusinessTaxReturnCalculations(formValues, formName);
  
  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save form data - in real app, this would be an API call
      localStorage.setItem(`borrower_form_${formId}`, JSON.stringify({
        formValues,
        status: 'in_progress',
        lastSaved: new Date().toISOString()
      }));
      
      toast.success('Form saved successfully');
    } catch (error) {
      toast.error('Failed to save form');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // Submit form data - in real app, this would be an API call
      localStorage.setItem(`borrower_form_${formId}`, JSON.stringify({
        formValues,
        status: 'completed',
        submittedAt: new Date().toISOString()
      }));

      toast.success('Form submitted successfully');
      
      if (fromDashboard) {
        navigate('/borrower/dashboard');
      }
    } catch (error) {
      toast.error('Failed to submit form');
    } finally {
      setIsSaving(false);
    }
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fromDashboard ? navigate('/borrower/dashboard') : navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="text-2xl font-bold text-primary">LendFlow</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Progress'}
            </Button>
            <span className="text-sm text-muted-foreground">
              {user?.user_metadata?.contact_name || user?.email}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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
            hideSubmitButton={true}
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

                {/* Custom footer for borrower forms */}
                <div className="flex justify-between items-center pt-6 border-t mt-6">
                  <Button
                    variant="outline"
                    onClick={() => fromDashboard ? navigate('/borrower/dashboard') : navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Progress
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Submitting...' : 'Submit Form'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BorrowerFormView;
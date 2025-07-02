import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useIntakeFormState } from '@/components/intake/hooks/useIntakeFormState';
import { formStepConfig } from '@/components/intake/config/formStepConfig';

const BorrowerIntake: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, updateFormData } = useIntakeFormState();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < formStepConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Store application data temporarily
    localStorage.setItem('borrower_application', JSON.stringify(formData));
    toast.success("Application completed! Please create your account to continue.");
    
    // Redirect to borrower registration
    navigate("/borrower/register");
  };

  const handleTabChange = (value: string) => {
    const stepIndex = formStepConfig.findIndex(step => step.id === value);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  const CurrentStepComponent = formStepConfig[currentStep].component;
  const progress = ((currentStep + 1) / formStepConfig.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">LendFlow</div>
          <Button variant="outline" onClick={() => navigate('/borrower')}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Business Loan Application</CardTitle>
            <CardDescription>
              Complete all sections to submit your loan application
            </CardDescription>
            <Progress value={progress} className="mt-2" />
            
            <Tabs
              defaultValue={formStepConfig[currentStep].id}
              value={formStepConfig[currentStep].id}
              onValueChange={handleTabChange}
              className="mt-4"
            >
              <TabsList className="grid grid-cols-4 w-full">
                {formStepConfig.map((step, index) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={index > currentStep}
                    className="text-xs md:text-sm"
                  >
                    {step.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent 
                formData={formData}
                updateFormData={updateFormData}
              />
            </motion.div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={currentStep === 0 ? () => navigate("/borrower") : handleBack}
              >
                {currentStep === 0 ? "Cancel" : "Back"}
              </Button>
              
              <Button onClick={handleNext}>
                {currentStep === formStepConfig.length - 1 ? "Complete Application" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowerIntake;
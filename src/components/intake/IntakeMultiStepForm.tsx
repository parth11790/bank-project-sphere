
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useIntakeFormState } from './hooks/useIntakeFormState';
import { formStepConfig } from './config/formStepConfig';

const IntakeMultiStepForm: React.FC = () => {
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
    // In a real app, this would connect to an API
    console.log('Submitting form data:', formData);
    toast.success("Project created successfully");
    
    // Redirect to manage participants page with mock project ID
    navigate("/project/participants/project-" + Date.now());
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">New Intake & Pre-Screening</CardTitle>
          <CardDescription>
            Create a new project and complete the intake process
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
              onClick={currentStep === 0 ? () => navigate("/projects") : handleBack}
            >
              {currentStep === 0 ? "Cancel" : "Back"}
            </Button>
            
            <Button onClick={handleNext}>
              {currentStep === formStepConfig.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntakeMultiStepForm;

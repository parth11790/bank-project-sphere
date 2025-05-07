
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

import NewLeadForm from './NewLeadForm';
import EligibilityQuestionnaire from './EligibilityQuestionnaire';
import OwnershipForm from './OwnershipForm';
import PreApprovalLetter from './PreApprovalLetter';

const FORM_STEPS = [
  { id: 'lead', title: 'New Lead', component: NewLeadForm },
  { id: 'eligibility', title: 'Eligibility', component: EligibilityQuestionnaire },
  { id: 'ownership', title: 'Ownership', component: OwnershipForm },
  { id: 'preapproval', title: 'Pre-Approval', component: PreApprovalLetter }
];

export interface IntakeFormData {
  // Basic lead information
  project_name: string;
  project_type: string;
  lead_source: string;
  date_entered: string;
  assigned_loan_officer: string;
  business_legal_name: string;
  business_dba_name: string;
  primary_contact_name: string;
  primary_contact_phone: string;
  primary_contact_email: string;
  requested_loan_amount: number;
  loan_purpose: string;
  lead_status: string;
  city: string;
  state: string;
  
  // Eligibility information
  is_operating_business: boolean | null;
  is_for_profit: boolean | null;
  is_us_location: boolean | null;
  ineligible_business_types: string[];
  principal_status: {
    is_incarcerated: boolean | null;
    is_on_parole: boolean | null;
    is_indicted: boolean | null;
  };
  has_prior_government_debt: boolean | null;
  has_robs_esop_involvement: boolean | null;
  pre_screening_status: string;
  eligibility_notes: string;
  
  // Ownership information
  current_owners: {
    name: string;
    tax_id: string;
    address: string;
    ownership_percentage: number;
    citizenship_status: string;
  }[];
  former_owners: {
    name: string;
    tax_id: string;
    address: string;
    former_ownership_percentage: number;
    citizenship_status: string;
    date_ownership_ceased: string;
    is_still_associate: boolean;
    is_still_employed: boolean;
  }[];
  
  // Pre-approval letter
  pre_approval_content: string;
  preliminary_conditions: string[];
  pre_approval_status: string;
}

const defaultFormData: IntakeFormData = {
  project_name: "",
  project_type: "",
  lead_source: "",
  date_entered: new Date().toISOString(),
  assigned_loan_officer: "",
  business_legal_name: "",
  business_dba_name: "",
  primary_contact_name: "",
  primary_contact_phone: "",
  primary_contact_email: "",
  requested_loan_amount: 0,
  loan_purpose: "",
  lead_status: "New Lead",
  city: "",
  state: "",
  
  is_operating_business: null,
  is_for_profit: null,
  is_us_location: null,
  ineligible_business_types: [],
  principal_status: {
    is_incarcerated: null,
    is_on_parole: null,
    is_indicted: null,
  },
  has_prior_government_debt: null,
  has_robs_esop_involvement: null,
  pre_screening_status: "",
  eligibility_notes: "",
  
  current_owners: [],
  former_owners: [],
  
  pre_approval_content: "",
  preliminary_conditions: [],
  pre_approval_status: "Draft"
};

const IntakeMultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IntakeFormData>(defaultFormData);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
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
    const stepIndex = FORM_STEPS.findIndex(step => step.id === value);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  const updateFormData = (stepData: Partial<IntakeFormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...stepData
    }));
  };

  const CurrentStepComponent = FORM_STEPS[currentStep].component;
  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

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
            defaultValue={FORM_STEPS[currentStep].id}
            value={FORM_STEPS[currentStep].id}
            onValueChange={handleTabChange}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-4 w-full">
              {FORM_STEPS.map((step, index) => (
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
              {currentStep === FORM_STEPS.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntakeMultiStepForm;

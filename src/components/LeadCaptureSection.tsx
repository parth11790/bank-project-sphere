
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ChevronRight, ChevronLeft, DollarSign, Target, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const fundPurposeOptions = [
  'Buy a business',
  'Purchase or Refinance Commercial Real Estate',
  'Constructions',
  'Renovate',
  'Working Capital',
  'Business Expansion',
  'Equipment Purchase',
  'Inventory',
  'Payroll',
  'Marketing / Sales',
  'Refinance Debt',
  'Buy Out a partner',
  'Open a Franchise',
  'Other'
];

const leadCaptureSchema = z.object({
  loan_amount: z.coerce.number().min(1000, "Minimum loan amount is $1,000"),
  funding_purposes: z.array(z.string()).min(1, "Please select at least one funding purpose"),
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
});

type LeadCaptureFormValues = z.infer<typeof leadCaptureSchema>;

const LeadCaptureSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const form = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      loan_amount: 0,
      funding_purposes: [],
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
    },
  });

  const steps = [
    {
      title: "Loan Amount",
      description: "How much are you looking to borrow?",
      icon: DollarSign,
      fields: ['loan_amount']
    },
    {
      title: "Funding Purpose", 
      description: "What are you seeking funding for?",
      icon: Target,
      fields: ['funding_purposes']
    },
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      icon: User,
      fields: ['first_name', 'last_name']
    },
    {
      title: "Contact Information",
      description: "How can we reach you?",
      icon: Phone,
      fields: ['phone', 'email']
    }
  ];

  const handleNext = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentFields as any);
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleFormSubmission();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmission = async () => {
    const values = form.getValues();
    console.log('Lead capture form submitted:', values);
    
    toast.success('Information captured! Redirecting to complete your profile...');
    setTimeout(() => {
      navigate('/personal-information');
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Your Loan Pre-Qualification
            </h2>
            <p className="text-lg text-gray-600">
              Take the first step towards securing your business funding
            </p>
          </motion.div>

          <Card className="shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <StepIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {currentStep === 0 && (
                    <FormField
                      control={form.control}
                      name="loan_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Loan Amount*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                className="pl-10 text-lg h-12"
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  field.onChange(value === '' ? 0 : parseFloat(value));
                                }}
                              />
                            </div>
                          </FormControl>
                          {field.value > 0 && (
                            <p className="text-sm text-blue-600 font-medium">
                              {formatCurrency(field.value)}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 1 && (
                    <FormField
                      control={form.control}
                      name="funding_purposes"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-lg mb-4 block">Funding Purpose* (Select all that apply)</FormLabel>
                          <div className="grid grid-cols-1 gap-4 mt-4">
                            {fundPurposeOptions.map((purpose) => (
                              <FormField
                                key={purpose}
                                control={form.control}
                                name="funding_purposes"
                                render={({ field }) => {
                                  const isChecked = field.value?.includes(purpose);
                                  return (
                                    <div
                                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        isChecked 
                                          ? 'border-blue-500 bg-blue-50' 
                                          : 'border-gray-200 hover:border-gray-300'
                                      }`}
                                      onClick={() => {
                                        const updatedValue = isChecked
                                          ? field.value?.filter((value) => value !== purpose)
                                          : [...(field.value || []), purpose];
                                        field.onChange(updatedValue);
                                      }}
                                    >
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? [...(field.value || []), purpose]
                                            : field.value?.filter((value) => value !== purpose);
                                          field.onChange(updatedValue);
                                        }}
                                      />
                                      <Label className="flex-1 font-medium cursor-pointer text-base">
                                        {purpose}
                                      </Label>
                                    </div>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">First Name*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter first name"
                                className="text-lg h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Last Name*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter last name"
                                className="text-lg h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Phone Number*</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                  type="tel"
                                  placeholder="(555) 555-5555"
                                  className="pl-10 text-lg h-12"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg">Email Address*</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="text-lg h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </motion.div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </Button>

                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center space-x-2"
                  >
                    <span>
                      {currentStep === steps.length - 1 ? 'Continue' : 'Next'}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;

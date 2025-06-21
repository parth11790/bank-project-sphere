
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { EmploymentSection } from './components/EmploymentSection';
import { EducationSection } from './components/EducationSection';
import { BusinessExperienceSection } from './components/BusinessExperienceSection';
import BusinessOwnershipSection from './components/BusinessOwnershipSection';
import { BackgroundSection } from './components/BackgroundSection';
import { ReferencesSection } from './components/ReferencesSection';
import { FormsAssignmentSection } from './components/FormsAssignmentSection';
import { Button } from '@/components/ui/button';

const personalInformationSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  middleName: z.string().optional(),
  ssn: z.string().optional(),
  dateOfBirth: z.date().optional(),
  citizenship: z.string().optional(),
  homeAddress: z.string().optional(),
  homeCity: z.string().optional(),
  homeState: z.string().optional(),
  homeZipCode: z.string().optional(),
  mailingAddress: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingState: z.string().optional(),
  mailingZipCode: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  cellPhone: z.string().optional(),
  // Employment Section
  employerName: z.string().optional(),
  employerAddress: z.string().optional(),
  employerCity: z.string().optional(),
  employerState: z.string().optional(),
  employerZipCode: z.string().optional(),
  jobTitle: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  // Education Section
  highestEducation: z.string().optional(),
  schoolName: z.string().optional(),
  graduationDate: z.date().optional(),
  degree: z.string().optional(),
  // Business Experience Section
  business_experience: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  industryExperience: z.string().optional(),
  // Business Ownership Section
  ownershipPercentage: z.number().optional(),
  businessName: z.string().optional(),
  // Background Section
  priorConvictions: z.boolean().optional(),
  bankruptcyHistory: z.boolean().optional(),
  pendingLawsuits: z.boolean().optional(),
  // References Section
  reference1Name: z.string().optional(),
  reference1Phone: z.string().optional(),
  reference1Email: z.string().optional(),
  reference2Name: z.string().optional(),
  reference2Phone: z.string().optional(),
  reference2Email: z.string().optional(),
  // Forms Assignment Section
  assignedForms: z.array(z.string()).optional(),
});

export type PersonalInformationFormValues = z.infer<typeof personalInformationSchema>;

interface PersonalInformationFormProps {
  participant?: any;
  onSave?: (values: PersonalInformationFormValues) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ 
  participant, 
  onSave = () => {}, 
  onCancel = () => {},
  isEditing = false 
}) => {
  const form = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: participant?.firstName || "",
      lastName: participant?.lastName || "",
      middleName: participant?.middleName || "",
      ssn: participant?.ssn || "",
      dateOfBirth: participant?.dateOfBirth ? new Date(participant.dateOfBirth) : undefined,
      citizenship: participant?.citizenship || "",
      homeAddress: participant?.homeAddress || "",
      homeCity: participant?.homeCity || "",
      homeState: participant?.homeState || "",
      homeZipCode: participant?.homeZipCode || "",
      mailingAddress: participant?.mailingAddress || "",
      mailingCity: participant?.mailingCity || "",
      mailingState: participant?.mailingState || "",
      mailingZipCode: participant?.mailingZipCode || "",
      email: participant?.email || "",
      phone: participant?.phone || "",
      cellPhone: participant?.cellPhone || "",
      employerName: participant?.employerName || "",
      employerAddress: participant?.employerAddress || "",
      employerCity: participant?.employerCity || "",
      employerState: participant?.employerState || "",
      employerZipCode: participant?.employerZipCode || "",
      jobTitle: participant?.jobTitle || "",
      startDate: participant?.startDate ? new Date(participant.startDate) : undefined,
      endDate: participant?.endDate ? new Date(participant.endDate) : undefined,
      highestEducation: participant?.highestEducation || "",
      schoolName: participant?.schoolName || "",
      graduationDate: participant?.graduationDate ? new Date(participant.graduationDate) : undefined,
      degree: participant?.degree || "",
      business_experience: participant?.business_experience || "",
      yearsOfExperience: participant?.yearsOfExperience || 0,
      industryExperience: participant?.industryExperience || "",
      ownershipPercentage: participant?.ownershipPercentage || 0,
      businessName: participant?.businessName || "",
      priorConvictions: participant?.priorConvictions || false,
      bankruptcyHistory: participant?.bankruptcyHistory || false,
      pendingLawsuits: participant?.pendingLawsuits || false,
      reference1Name: participant?.reference1Name || "",
      reference1Phone: participant?.reference1Phone || "",
      reference1Email: participant?.reference1Email || "",
      reference2Name: participant?.reference2Name || "",
      reference2Phone: participant?.reference2Phone || "",
      reference2Email: participant?.reference2Email || "",
      assignedForms: participant?.assignedForms || [],
    },
  });

  const onSubmit = (values: PersonalInformationFormValues) => {
    console.log("Form values:", values);
    onSave(values);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <PersonalInfoSection form={form} />
            <EmploymentSection form={form} />
            <EducationSection form={form} />
            <BusinessExperienceSection form={form} />
            <BusinessOwnershipSection form={form} />
            <BackgroundSection form={form} />
            <ReferencesSection form={form} />
            <FormsAssignmentSection />

            <div className="flex justify-between">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationForm;

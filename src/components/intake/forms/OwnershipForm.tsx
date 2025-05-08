
import React, { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FormComponentProps } from '../types/intakeTypes';
import { ownershipSchema, OwnershipFormValues } from './schemas/ownershipSchema';
import { CurrentOwnerForm } from './components/ownership/CurrentOwnerForm';
import { FormerOwnerForm } from './components/ownership/FormerOwnerForm';
import { OwnershipAlerts } from './components/ownership/OwnershipAlerts';
import { 
  createEmptyCurrentOwner, 
  createEmptyFormerOwner, 
  getCitizenshipOptions, 
  hasRiskyOwnership,
  calculateTotalOwnership
} from './components/ownership/OwnerFormUtils';
import { OwnershipHeader } from './components/ownership/OwnershipHeader';
import { CurrentOwnersSection } from './components/ownership/CurrentOwnersSection';
import { FormerOwnersSection } from './components/ownership/FormerOwnersSection';

const OwnershipForm: React.FC<FormComponentProps> = ({ formData, updateFormData }) => {
  // Get citizenship status options
  const citizenshipOptions = useMemo(() => getCitizenshipOptions(), []);
  
  const form = useForm<OwnershipFormValues>({
    resolver: zodResolver(ownershipSchema),
    defaultValues: {
      current_owners: formData.current_owners?.length > 0 
        ? formData.current_owners 
        : [createEmptyCurrentOwner()],
      former_owners: formData.former_owners || [],
    },
  });
  
  const { fields: currentOwnersFields, append: appendCurrentOwner, remove: removeCurrentOwner } = 
    useFieldArray({
      control: form.control,
      name: "current_owners",
    });
    
  const { fields: formerOwnersFields, append: appendFormerOwner, remove: removeFormerOwner } = 
    useFieldArray({
      control: form.control,
      name: "former_owners",
    });
  
  // Monitor for risky owners
  const currentOwners = form.watch('current_owners');
  const formerOwners = form.watch('former_owners');
  
  const hasRiskyOwner = useMemo(() => 
    hasRiskyOwnership(currentOwners || [], formerOwners || []), 
    [currentOwners, formerOwners]
  );
  
  const totalCurrentOwnership = useMemo(() => 
    calculateTotalOwnership(currentOwners || []), 
    [currentOwners]
  );
  
  // Update parent form data when this form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.current_owners || value.former_owners) {
        updateFormData({
          current_owners: value.current_owners as any,
          former_owners: value.former_owners as any,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);
  
  return (
    <div className="space-y-6">
      <OwnershipHeader />
      
      <OwnershipAlerts 
        hasRiskyOwner={hasRiskyOwner}
        totalCurrentOwnership={totalCurrentOwnership}
        currentOwnersExist={currentOwnersFields.length > 0} 
      />
      
      <Form {...form}>
        <form className="space-y-8">
          <CurrentOwnersSection 
            fields={currentOwnersFields} 
            onAdd={() => appendCurrentOwner(createEmptyCurrentOwner())}
            onRemove={removeCurrentOwner}
            control={form.control}
            citizenshipOptions={citizenshipOptions}
          />
          
          <FormerOwnersSection
            fields={formerOwnersFields}
            onAdd={() => appendFormerOwner(createEmptyFormerOwner())}
            onRemove={removeFormerOwner}
            control={form.control}
            citizenshipOptions={citizenshipOptions}
          />
        </form>
      </Form>
    </div>
  );
};

export default OwnershipForm;


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
      <div>
        <h3 className="text-lg font-medium">Ownership Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter details about current and former owners (within the last 6 months)
        </p>
      </div>
      
      <OwnershipAlerts 
        hasRiskyOwner={hasRiskyOwner}
        totalCurrentOwnership={totalCurrentOwnership}
        currentOwnersExist={currentOwnersFields.length > 0} 
      />
      
      <Form {...form}>
        <form className="space-y-8">
          {/* Current Owners Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium">Current Owners</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendCurrentOwner(createEmptyCurrentOwner())}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Owner
              </Button>
            </div>
            
            {currentOwnersFields.map((field, index) => (
              <CurrentOwnerForm
                key={field.id}
                index={index}
                control={form.control}
                citizenshipOptions={citizenshipOptions}
                onRemove={() => removeCurrentOwner(index)}
                canDelete={currentOwnersFields.length > 1}
              />
            ))}
          </div>
          
          {/* Former Owners Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium">Former Owners (Last 6 Months)</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendFormerOwner(createEmptyFormerOwner())}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Former Owner
              </Button>
            </div>
            
            {formerOwnersFields.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                No former owners entered. Add former owners only if ownership changed within the last 6 months.
              </div>
            )}
            
            {formerOwnersFields.map((field, index) => (
              <FormerOwnerForm
                key={field.id}
                index={index}
                control={form.control}
                citizenshipOptions={citizenshipOptions}
                onRemove={() => removeFormerOwner(index)}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OwnershipForm;

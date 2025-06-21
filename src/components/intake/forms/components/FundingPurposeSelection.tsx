
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  Home, 
  ShoppingCart, 
  Wrench, 
  RefreshCw, 
  Warehouse,
  PiggyBank,
  MoreHorizontal 
} from 'lucide-react';
import { IntakeFormData } from '../../../intake/types/intakeTypes';

interface FundingPurposeSelectionProps {
  form: UseFormReturn<any>;
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const fundingOptions = [
  { value: 'Working Capital', icon: PiggyBank, label: 'Working Capital' },
  { value: 'Real Estate Purchase', icon: Home, label: 'Real Estate Purchase' },
  { value: 'Business Acquisition', icon: ShoppingCart, label: 'Business Acquisition' },
  { value: 'Property Improvements', icon: Building2, label: 'Property Improvements' },
  { value: 'Equipment Purchase', icon: Wrench, label: 'Equipment Purchase' },
  { value: 'Refinance Debt', icon: RefreshCw, label: 'Refinance Debt' },
  { value: 'Refinance Real Estate', icon: Warehouse, label: 'Refinance Real Estate' },
  { value: 'Other', icon: MoreHorizontal, label: 'Other' },
];

export const FundingPurposeSelection: React.FC<FundingPurposeSelectionProps> = ({ 
  form, 
  formData, 
  updateFormData 
}) => {
  const handleSelectionChange = (value: string, checked: boolean) => {
    const currentSelections = formData.funding_purposes || [];
    
    if (checked) {
      const newSelections = [...currentSelections, value];
      updateFormData({ funding_purposes: newSelections });
    } else {
      const newSelections = currentSelections.filter(item => item !== value);
      updateFormData({ funding_purposes: newSelections });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">What are you seeking funding for?</h3>
        <p className="text-sm text-muted-foreground">Select all that apply</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fundingOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = (formData.funding_purposes || []).includes(option.value);
          
          return (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => handleSelectionChange(option.value, !isSelected)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Icon 
                    className={`h-8 w-8 ${
                      isSelected ? 'text-blue-600' : 'text-gray-500'
                    }`} 
                  />
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-blue-900' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {}} // handled by card click
                    className="pointer-events-none"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {(formData.funding_purposes || []).length === 0 && (
        <p className="text-sm text-red-500">Please select at least one funding purpose</p>
      )}
    </div>
  );
};

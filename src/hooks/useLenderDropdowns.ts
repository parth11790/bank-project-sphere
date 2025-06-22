
import { useState, useMemo } from 'react';
import { sbaDropdownFields, DropdownField } from '@/lib/mockData/dropdownFields';
import { toast } from 'sonner';

interface DropdownOverride {
  fieldId: string;
  fieldLabel: string;
  customValues: string[];
  dateModified: string;
  modifiedBy: string;
}

export const useLenderDropdowns = () => {
  // State to store lender-specific dropdown overrides
  const [dropdownOverrides, setDropdownOverrides] = useState<DropdownOverride[]>([]);

  // Get only customizable dropdown fields
  const customizableDropdowns = useMemo(() => {
    return sbaDropdownFields.filter(field => field.customizationLevel === 'Lender Customizable');
  }, []);

  // Check if a dropdown has an override
  const hasOverride = (fieldId: string): boolean => {
    return dropdownOverrides.some(override => override.fieldId === fieldId);
  };

  // Get current values for a dropdown (override if exists, otherwise default)
  const getDropdownValues = (fieldId: string): string[] => {
    const override = dropdownOverrides.find(override => override.fieldId === fieldId);
    if (override) {
      return override.customValues;
    }
    
    const defaultField = sbaDropdownFields.find(field => field.id === fieldId);
    return defaultField ? defaultField.initialValues : [];
  };

  // Set custom values for a dropdown
  const setDropdownValues = (fieldId: string, fieldLabel: string, values: string[]) => {
    const newOverride: DropdownOverride = {
      fieldId,
      fieldLabel,
      customValues: values,
      dateModified: new Date().toISOString(),
      modifiedBy: 'Current User' // In a real app, this would come from auth context
    };

    setDropdownOverrides(prev => {
      const existingIndex = prev.findIndex(override => override.fieldId === fieldId);
      if (existingIndex >= 0) {
        // Update existing override
        const updated = [...prev];
        updated[existingIndex] = newOverride;
        return updated;
      } else {
        // Add new override
        return [...prev, newOverride];
      }
    });

    toast.success(`Updated dropdown values for "${fieldLabel}"`);
    console.log(`[AUDIT] Dropdown values updated: ${fieldId} by Current User at ${new Date().toISOString()}`);
  };

  // Reset a dropdown to its default values
  const resetToDefault = (fieldId: string, fieldLabel: string) => {
    setDropdownOverrides(prev => prev.filter(override => override.fieldId !== fieldId));
    toast.success(`Reset "${fieldLabel}" to SBA default values`);
    console.log(`[AUDIT] Dropdown values reset to default: ${fieldId} by Current User at ${new Date().toISOString()}`);
  };

  // Get all overrides (for display purposes)
  const getAllOverrides = (): DropdownOverride[] => {
    return dropdownOverrides;
  };

  return {
    customizableDropdowns,
    hasOverride,
    getDropdownValues,
    setDropdownValues,
    resetToDefault,
    getAllOverrides
  };
};

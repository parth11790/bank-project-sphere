
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { sbaDropdownFields, DropdownField, CustomizationLevel } from '@/lib/mockData/dropdownFields';

export type LenderDropdownOverride = {
  id: string;
  fieldId: string;
  fieldLabel: string;
  values: string[];
  timestamp: number;
  user: string; // In a real app, this would be a user ID
};

export const useLenderDropdowns = () => {
  // In a real application, these would be loaded from the backend/database
  const [lenderOverrides, setLenderOverrides] = useState<LenderDropdownOverride[]>([]);
  
  // Mock loading effect
  useEffect(() => {
    // Simulate loading from localStorage or API
    const savedOverrides = localStorage.getItem('lenderDropdownOverrides');
    if (savedOverrides) {
      try {
        const parsed = JSON.parse(savedOverrides);
        setLenderOverrides(parsed);
      } catch (error) {
        console.error('Error loading lender dropdown overrides:', error);
      }
    }
  }, []);
  
  // Save overrides to localStorage when they change
  useEffect(() => {
    if (lenderOverrides.length > 0) {
      localStorage.setItem('lenderDropdownOverrides', JSON.stringify(lenderOverrides));
    }
  }, [lenderOverrides]);
  
  // Filter SBA dropdown fields for customizable fields
  const customizableDropdowns = useMemo(() => {
    return sbaDropdownFields.filter(
      dropdown => dropdown.customizationLevel === 'Lender Customizable' || 
                 dropdown.customizationLevel === 'SBA Influenced'
    );
  }, []);

  // Check if a field has been overridden
  const hasOverride = (fieldId: string) => {
    return lenderOverrides.some(override => override.fieldId === fieldId);
  };

  // Get override values for a specific field
  const getOverrideValues = (fieldId: string) => {
    const override = lenderOverrides.find(o => o.fieldId === fieldId);
    return override ? override.values : [];
  };

  // Get override metadata
  const getOverrideMetadata = (fieldId: string) => {
    const override = lenderOverrides.find(o => o.fieldId === fieldId);
    if (!override) return null;
    
    return {
      timestamp: override.timestamp,
      user: override.user,
      lastModified: new Date(override.timestamp).toLocaleDateString()
    };
  };

  // Get original or overridden values for display
  const getDropdownValues = (fieldId: string) => {
    if (hasOverride(fieldId)) {
      return getOverrideValues(fieldId);
    }
    
    const originalField = sbaDropdownFields.find(field => field.id === fieldId);
    return originalField ? originalField.initialValues : [];
  };

  // Create or update an override
  const setDropdownValues = (fieldId: string, fieldLabel: string, values: string[]) => {
    setLenderOverrides(prev => {
      const existingIndex = prev.findIndex(o => o.fieldId === fieldId);
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          values: values,
          timestamp: Date.now(),
          user: 'Current User' // In a real app, get from auth context
        };
        return updated;
      } else {
        return [...prev, {
          id: `override-${Date.now()}`,
          fieldId,
          fieldLabel,
          values,
          timestamp: Date.now(),
          user: 'Current User' // In a real app, get from auth context
        }];
      }
    });
    
    toast.success(`Dropdown values for "${fieldLabel}" saved successfully`);
  };

  // Reset an overridden dropdown to SBA default values
  const resetToDefault = (fieldId: string, fieldLabel: string) => {
    setLenderOverrides(prev => prev.filter(o => o.fieldId !== fieldId));
    toast.success(`Dropdown "${fieldLabel}" reset to SBA default values`);
  };

  return {
    customizableDropdowns,
    lenderOverrides,
    hasOverride,
    getOverrideValues,
    getOverrideMetadata,
    getDropdownValues,
    setDropdownValues,
    resetToDefault
  };
};

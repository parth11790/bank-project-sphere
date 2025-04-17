
import { useState } from 'react';

export interface ValidationErrors {
  [key: string]: string;
}

export const useUseOfProceedsValidation = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Validate column name
  const validateColumnName = (name: string): string | null => {
    if (!name.trim()) {
      return "Column name cannot be empty";
    }
    
    if (name.length > 30) {
      return "Column name must be 30 characters or less";
    }
    
    return null;
  };

  // Validate row category
  const validateRowCategory = (rowCategory: string, overallCategory: string): string | null => {
    if (!rowCategory.trim()) {
      return "Category name cannot be empty";
    }
    
    if (!overallCategory.trim()) {
      return "Overall category must be selected";
    }
    
    return null;
  };
  
  // Validate input value
  const validateValue = (value: string, rowName: string, columnName: string): string | null => {
    const key = `${rowName}-${columnName}`;
    
    // Check if value is a valid number
    if (value === '') {
      return null; // Empty is valid (will be converted to 0)
    }
    
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    
    if (numValue < 0) {
      return "Value cannot be negative";
    }
    
    return null; // No validation error
  };
  
  // Clear validation errors for a specific field
  const clearValidationError = (key: string) => {
    if (validationErrors[key]) {
      const newErrors = { ...validationErrors };
      delete newErrors[key];
      setValidationErrors(newErrors);
    }
  };
  
  // Validate all data before saving
  const validateAllData = (editedData: { [key: string]: number }): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;
    
    // Validate all edited data
    Object.entries(editedData).forEach(([key, value]) => {
      const [rowName, columnName] = key.split('-');
      const error = validateValue(String(value), rowName, columnName);
      
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });
    
    setValidationErrors(errors);
    return isValid;
  };

  return {
    validationErrors,
    setValidationErrors,
    validateColumnName,
    validateRowCategory,
    validateValue,
    clearValidationError,
    validateAllData
  };
};

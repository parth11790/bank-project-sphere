
import React from 'react';
import { Owner, FormerOwner } from '../../schemas/ownershipSchema';
import { sbaDropdownFields } from '@/lib/mockData/dropdownFields';

// Create default empty objects for owners
export const createEmptyCurrentOwner = (): Owner => ({
  name: '',
  tax_id: '',
  address: '',
  ownership_percentage: 0,
  citizenship_status: '',
});

export const createEmptyFormerOwner = (): FormerOwner => ({
  name: '',
  tax_id: '',
  address: '',
  ownership_percentage: 0, // Added required field
  citizenship_status: '',
  former_ownership_percentage: 0,
  date_ownership_ceased: new Date(),
  is_still_associate: false,
  is_still_employed: false,
});

// Get citizenship status options from SBA dropdown fields
export const getCitizenshipOptions = () => {
  const field = sbaDropdownFields.find(field => field.id === 'citizenshipStatus');
  return field?.initialValues || [];
};

// Calculate if there's a risky owner
export const hasRiskyOwnership = (currentOwners: Owner[], formerOwners: FormerOwner[]) => {
  const currentOwnerRisk = currentOwners.some(
    owner => owner.citizenship_status === 'Other/Ineligible Person'
  );
  
  const formerOwnerRisk = formerOwners.some(
    owner => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const ceaseDate = owner.date_ownership_ceased;
      const isWithinLookback = ceaseDate && new Date(ceaseDate) > sixMonthsAgo;
      
      return isWithinLookback && 
             owner.citizenship_status === 'Other/Ineligible Person' && 
             (owner.is_still_associate || owner.is_still_employed);
    }
  );
  
  return currentOwnerRisk || formerOwnerRisk;
};

// Calculate total ownership percentage
export const calculateTotalOwnership = (currentOwners: Owner[]) => {
  return currentOwners.reduce((sum, owner) => sum + (owner.ownership_percentage || 0), 0);
};

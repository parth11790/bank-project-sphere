import { 
  individualTaxReturnsData, 
  IndividualTaxReturnData, 
  getIndividualTaxDataById
} from '../mockData/individualTaxReturns';
import { 
  businessTaxReturnsData, 
  BusinessTaxReturnData,
  getBusinessTaxDataById 
} from '../mockData/businessTaxReturns';

export const getIndividualTaxReturnData = async (participantId: string): Promise<IndividualTaxReturnData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const data = individualTaxReturnsData.find(data => data.participant_id === participantId);
  return data || null;
};

export const getBusinessTaxReturnData = async (businessId: string): Promise<BusinessTaxReturnData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const data = businessTaxReturnsData.find(data => data.business_id === businessId);
  return data || null;
};

// Function to convert tax return data to form values format
export const convertIndividualTaxDataToFormValues = (
  taxData: IndividualTaxReturnData,
  selectedYears: string[]
): Record<string, string> => {
  const formValues: Record<string, string> = {};
  
  selectedYears.forEach(year => {
    const yearData = taxData.years[year];
    if (yearData) {
      Object.entries(yearData).forEach(([field, value]) => {
        formValues[`${field}_${year}`] = value.toString();
      });
    }
  });
  
  return formValues;
};

export const convertBusinessTaxDataToFormValues = (
  taxData: BusinessTaxReturnData,
  selectedYears: string[]
): Record<string, string> => {
  const formValues: Record<string, string> = {};
  
  selectedYears.forEach(year => {
    const yearData = taxData.years[year];
    if (yearData) {
      Object.entries(yearData).forEach(([field, value]) => {
        formValues[`${field}_${year}`] = value.toString();
      });
    }
  });
  
  return formValues;
};

// Function to get realistic tax data based on entity type and size
export const generateRealisticTaxData = (entityType: string, annualRevenue: number) => {
  // This function can generate realistic tax data based on business characteristics
  // For now, it returns one of the predefined datasets that best matches the criteria
  
  if (entityType === 'LLC') {
    return annualRevenue > 2000000 ? businessTaxReturnsData[0] : businessTaxReturnsData[4];
  } else if (entityType === 'S-Corp') {
    return businessTaxReturnsData[1];
  } else if (entityType === 'C-Corp') {
    return businessTaxReturnsData[2];
  } else if (entityType === 'Partnership') {
    return businessTaxReturnsData[3];
  }
  
  return businessTaxReturnsData[0]; // Default fallback
};

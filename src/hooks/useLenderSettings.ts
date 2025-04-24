
import { useState } from 'react';
import { LoanSetting, DocumentRequirement } from '@/types/lenderSettings';
import { initialLoanSettings, initialDocumentRequirements, loanTypes } from '@/lib/mockData/lenderSettings';

interface UseLenderSettingsReturn {
  loanSettings: LoanSetting[];
  documentRequirements: DocumentRequirement[];
  newSetting: LoanSetting;
  newFormRequirement: Omit<DocumentRequirement, "id"> & { documentGenerationTypes: string[] };
  handleSettingChange: (setting: Partial<LoanSetting>) => void;
  handleFormChange: (form: Partial<Omit<DocumentRequirement, "id"> & { documentGenerationTypes: string[] }>) => void;
  handleAddSetting: () => void;
  handleAddFormRequirement: () => void;
  handleDeleteSetting: (id: string) => void;
  handleDeleteRequirement: (id: string) => void;
}

export const useLenderSettings = (): UseLenderSettingsReturn => {
  const [loanSettings, setLoanSettings] = useState<LoanSetting[]>(initialLoanSettings);
  const [documentRequirements, setDocumentRequirements] = useState<DocumentRequirement[]>(initialDocumentRequirements);
  
  const [newSetting, setNewSetting] = useState<LoanSetting>({
    id: "",
    loanType: loanTypes[0],
    amountMin: 0,
    amountMax: 1000000,
    interestRate: 6.0,
    term: 10,
    amortization: 120,
    softCostPercentage: 3.0,
    requiredDocuments: {
      creditCheck: false,
      backgroundCheck: false,
      bankruptcyReport: false,
      underwritingDocuments: false,
      closingReport: false
    }
  });

  const [newFormRequirement, setNewFormRequirement] = useState<Omit<DocumentRequirement, "id"> & { documentGenerationTypes: string[] }>({
    loanType: loanTypes[0],
    participantType: "Borrower",
    formName: "",
    documentGenerationType: [],
    documentGenerationTypes: [], // Added this property to fix the error
    isRequired: true,
    loanAmountMin: 0,
    loanAmountMax: 5000000
  });

  const handleSettingChange = (setting: Partial<LoanSetting>) => {
    setNewSetting(prev => ({ ...prev, ...setting }));
  };

  const handleFormChange = (form: Partial<Omit<DocumentRequirement, "id"> & { documentGenerationTypes: string[] }>) => {
    setNewFormRequirement(prev => ({ ...prev, ...form }));
  };

  const handleAddSetting = () => {
    const settingToAdd = {
      ...newSetting,
      id: Date.now().toString()
    };
    setLoanSettings(prev => [...prev, settingToAdd]);
    setNewSetting({
      id: "",
      loanType: loanTypes[0],
      amountMin: 0,
      amountMax: 1000000,
      interestRate: 6.0,
      term: 10,
      amortization: 120,
      softCostPercentage: 3.0,
      requiredDocuments: {
        creditCheck: false,
        backgroundCheck: false,
        bankruptcyReport: false,
        underwritingDocuments: false,
        closingReport: false
      }
    });
  };

  const handleAddFormRequirement = () => {
    const newRequirement: DocumentRequirement = {
      id: Date.now().toString(),
      ...newFormRequirement,
      documentGenerationType: newFormRequirement.documentGenerationTypes || []
    };
    setDocumentRequirements(prev => [...prev, newRequirement]);
    setNewFormRequirement({
      loanType: loanTypes[0],
      participantType: "Borrower",
      formName: "",
      documentGenerationType: [],
      documentGenerationTypes: [],
      isRequired: true,
      loanAmountMin: 0,
      loanAmountMax: 5000000
    });
  };

  const handleDeleteSetting = (id: string) => {
    setLoanSettings(prev => prev.filter(setting => setting.id !== id));
  };

  const handleDeleteRequirement = (id: string) => {
    setDocumentRequirements(prev => prev.filter(req => req.id !== id));
  };

  return {
    loanSettings,
    documentRequirements,
    newSetting,
    newFormRequirement,
    handleSettingChange,
    handleFormChange,
    handleAddSetting,
    handleAddFormRequirement,
    handleDeleteSetting,
    handleDeleteRequirement
  };
};

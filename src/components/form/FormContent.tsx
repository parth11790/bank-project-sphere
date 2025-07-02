
import React from 'react';
import TaxReturnsForm from './TaxReturnsForm';
import BusinessTaxReturnsForm from './BusinessTaxReturnsForm';
import PersonalFinancialStatementForm from './PersonalFinancialStatementForm';
import BalanceSheetForm from './BalanceSheetForm';
import BusinessBalanceSheetMultiYear from './BusinessBalanceSheetMultiYear';
import ProfitLossStatementForm from './ProfitLossStatementForm';
import AccountsReceivablePayableForm from './AccountsReceivablePayableForm';
import BusinessDebtScheduleForm from './BusinessDebtScheduleForm';
import GenericForm from './GenericForm';
import DebtSummaryForm from './DebtSummaryForm';
import ProfessionalReferencesForm from './ProfessionalReferencesForm';
import ProfessionalResumeForm from './ProfessionalResumeForm';
import NetWorthForm from '@/components/participants/forms/NetWorthForm';
import EnhancedDocumentUpload from './EnhancedDocumentUpload';

interface FormContentProps {
  formName: string;
  entityType: string;
  formValues: Record<string, string>;
  calculatedValues: any;
  businessCalculatedValues: any;
  onInputChange: (field: string, value: string) => void;
  enableOCR?: boolean;
}

const FormContent: React.FC<FormContentProps> = ({
  formName,
  entityType,
  formValues,
  calculatedValues,
  businessCalculatedValues,
  onInputChange,
  enableOCR = true
}) => {
  if (formName === 'Tax Returns') {
    return (
      <TaxReturnsForm 
        formValues={formValues}
        calculatedValues={calculatedValues}
        onInputChange={onInputChange}
      />
    );
  }
  
  if (formName === 'Business Tax Returns' || formName === 'Business Tax Returns (3 years)') {
    return (
      <BusinessTaxReturnsForm 
        formValues={formValues}
        calculatedValues={businessCalculatedValues}
        onInputChange={onInputChange}
      />
    );
  }
  
  if (formName === 'Personal Debt Summary') {
    return (
      <DebtSummaryForm 
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }
  
  if (formName === 'Personal Financial Statement') {
    return <PersonalFinancialStatementForm />;
  }
  
  if (formName === 'Balance Sheet' && entityType === 'business') {
    return (
      <BusinessBalanceSheetMultiYear 
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }
  
  if (formName === 'Balance Sheet') {
    return <BalanceSheetForm />;
  }

  if (formName === 'Profit & Loss Statement') {
    return (
      <ProfitLossStatementForm
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }

  if (formName === 'Accounts Receivable & Accounts Payable' || formName === 'Accounts Receivable & Payable') {
    return (
      <AccountsReceivablePayableForm
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }

  if (formName === 'Business Debt Schedule') {
    return (
      <BusinessDebtScheduleForm
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }

  if (formName === 'Professional References Form') {
    return (
      <ProfessionalReferencesForm 
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }

  if (formName === 'Professional Resume') {
    return (
      <ProfessionalResumeForm 
        formValues={formValues}
        onInputChange={onInputChange}
      />
    );
  }

  if (formName === 'Net worth assessment') {
    return <NetWorthForm />;
  }
  
  return <GenericForm />;
};

export default FormContent;

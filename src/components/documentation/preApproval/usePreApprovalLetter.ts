
import { useState } from 'react';
import { useLender } from '@/contexts/LenderContext';

export interface PreApprovalData {
  applicantName: string;
  loanProgram: string;
  subjectBusiness: string;
  purchasePrice: string;
  borrowerEntity: string;
  guarantors: string;
  sbaLoanAmount: string;
  conventionalLoanAmount: string;
  cashEquityPercentage: string;
  termMonths: string;
  interestRateSpread: string;
  currentPrimeRate: string;
}

export const usePreApprovalLetter = () => {
  const { lenderInfo } = useLender();
  
  const [formData, setFormData] = useState<PreApprovalData>({
    applicantName: '',
    loanProgram: 'SBA 7(a) Business Purchase Financing',
    subjectBusiness: 'To be determined',
    purchasePrice: '',
    borrowerEntity: 'New Entity to be determined',
    guarantors: '',
    sbaLoanAmount: '',
    conventionalLoanAmount: '',
    cashEquityPercentage: '10',
    termMonths: '300',
    interestRateSpread: '2.75',
    currentPrimeRate: '8.50'
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof PreApprovalData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentRate = () => {
    const prime = parseFloat(formData.currentPrimeRate);
    const spread = parseFloat(formData.interestRateSpread);
    return (prime + spread).toFixed(2);
  };

  const generateLetter = () => {
    const currentDate = getCurrentDate();
    const totalRate = getCurrentRate();
    
    return `
${lenderInfo.name}
${lenderInfo.contactPhone}
${lenderInfo.contactEmail}

${currentDate}

${formData.applicantName}

RE: ${formData.loanProgram}

Dear ${formData.applicantName.split(' ')[0] || 'Valued Client'},

We are pleased to inform you that based on our preliminary review of your financial documents, you are considered a "Qualified and Eligible" borrower under our ${formData.loanProgram} program. This pre-approval letter outlines the preliminary terms for your business acquisition financing.

Please note that this is a preliminary pre-approval and not a final loan commitment. Final approval and loan terms are contingent upon completion of the full underwriting process and receipt of all required documents.

LOAN PROPOSAL SUMMARY

Subject Business:           ${formData.subjectBusiness}
Purchase Price:            Up to $${formData.purchasePrice}
Borrower:                  ${formData.borrowerEntity}
Guarantor(s):              ${formData.guarantors}
                          (Any owner with 20% or more stake will be required to provide full personal guarantee)

LOAN STRUCTURE

Loan 1 - SBA 7(a):        Up to $${formData.sbaLoanAmount} of Total Project Cost (TPC)
                          (${lenderInfo.name} is an SBA preferred lender)

${formData.conventionalLoanAmount ? `Loan 2 - Conventional:    $${formData.conventionalLoanAmount} (amount above SBA limit)` : ''}

Cash Equity Injection:     ${formData.cashEquityPercentage}% or more of TPC (SBA minimum requirement)
Seller Note:              To be Determined (must be subordinated, terms subject to lender approval)

LOAN TERMS AND REPAYMENT

Term:                     ${formData.termMonths} months fully amortizing
Interest Rate:            U.S. Prime Rate + ${formData.interestRateSpread}% (currently ${totalRate}%)
                         Adjusted calendar quarterly, 365-day base year

CONDITIONS OF PRE-APPROVAL

This pre-approval is subject to the following conditions:

1. Receipt and review of seller's financials and tax documents
2. Satisfactory site visit completed by lender
3. Receipt and review of fully executed Purchase Agreement and/or Letter of Intent
4. Receipt and review of business valuation supporting purchase price
5. Successful completion of underwriting process and credit team approval

COLLATERAL REQUIREMENTS

Primary Collateral:       1st UCC filing on all business assets
                         1st or 2nd Deed of Trust on real property owned

Additional Collateral:    Personal guarantor collateral may be required if business assets 
                         do not fully cover loan amount. Personal assets (residence, 
                         investment properties) may be required when equity exceeds 25%.

Life Insurance:          Required for portion of loan not covered by liquidated value 
                        of real estate collateral. Existing policies may be assigned 
                        to lender. Final amount determined during underwriting.

IMPORTANT DISCLAIMERS

This analysis is not all-inclusive. Final approval is subject to the preceding conditions and any other conditions deemed necessary by the lender in its sole judgment. All numbers and interest rates are estimates and are only effective as of the date of this letter.

We are excited about the opportunity to work with you on this acquisition. Should you have any questions, please contact me at ${lenderInfo.contactPhone} or ${lenderInfo.contactEmail}.

Sincerely,

${lenderInfo.name}
${lenderInfo.website}

${lenderInfo.complianceStatement}
©${new Date().getFullYear()} ${lenderInfo.name}. All rights reserved.
    `.trim();
  };

  const handleDownload = () => {
    const letter = generateLetter();
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pre-Approval-Letter-${formData.applicantName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    formData,
    showPreview,
    setShowPreview,
    handleInputChange,
    getCurrentRate,
    generateLetter,
    handleDownload
  };
};

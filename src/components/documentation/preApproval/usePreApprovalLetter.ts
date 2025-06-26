import { useState, useEffect } from 'react';
import { useLender } from '@/contexts/LenderContext';
import { useAuth } from '@/contexts/AuthContext';
import { Project } from '@/types/project';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import { logAuditEvent } from '@/services/auditService';
import { toast } from 'sonner';

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

export interface SavedPreApprovalLetter {
  letter_id: string;
  project_id: string;
  letter_content: string;
  generated_date: string;
  applicant_name: string;
  total_loan_amount: number;
  loans_included: Array<{
    loan_type: string;
    amount: number;
    term?: number;
    rate?: string;
  }>;
  downloaded_by: string;
  downloaded_by_name: string;
  download_timestamp: string;
}

export const usePreApprovalLetter = (project?: Project) => {
  const { lenderInfo } = useLender();
  const { user } = useAuth();
  const { calculateLoanPayment } = useLoanCalculator();
  
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
  const [savedLetters, setSavedLetters] = useState<SavedPreApprovalLetter[]>([]);

  // Auto-fill form data from project
  useEffect(() => {
    if (project) {
      const primaryOwner = project.owners?.[0];
      const mainBusiness = project.main_business;
      const projectLoans = project.loans || [];
      
      // Calculate total loan amounts by type
      const sbaLoans = projectLoans.filter(loan => 
        loan.loan_type.toLowerCase().includes('sba')
      );
      const conventionalLoans = projectLoans.filter(loan => 
        !loan.loan_type.toLowerCase().includes('sba')
      );
      
      const totalSBAAmount = sbaLoans.reduce((sum, loan) => sum + loan.amount, 0);
      const totalConventionalAmount = conventionalLoans.reduce((sum, loan) => sum + loan.amount, 0);
      
      // Determine primary loan program
      const primaryLoanProgram = sbaLoans.length > 0 ? 
        (sbaLoans[0].loan_type.includes('504') ? 'SBA 504 Real Estate Financing' : 'SBA 7(a) Business Purchase Financing') :
        'Conventional Business Acquisition';

      // Build guarantors list from owners
      const guarantorsList = project.owners?.filter(owner => owner.type === 'individual')
        .map(owner => owner.name).join(' and ') || '';

      setFormData(prev => ({
        ...prev,
        applicantName: primaryOwner?.name || '',
        loanProgram: primaryLoanProgram,
        subjectBusiness: mainBusiness?.name || project.project_name,
        purchasePrice: project.loan_amount.toString(),
        borrowerEntity: mainBusiness?.name || 'New Entity to be determined',
        guarantors: guarantorsList,
        sbaLoanAmount: totalSBAAmount.toString(),
        conventionalLoanAmount: totalConventionalAmount.toString()
      }));
    }
  }, [project]);

  // Load saved letters for the project
  useEffect(() => {
    if (project?.project_id) {
      loadSavedLetters(project.project_id);
    }
  }, [project?.project_id]);

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

  const getProjectLoansSection = () => {
    if (!project?.loans || project.loans.length === 0) {
      return `
LOAN STRUCTURE

Loan 1 - SBA 7(a):        Up to $${formData.sbaLoanAmount} of Total Project Cost (TPC)
                          (${lenderInfo.name} is an SBA preferred lender)

${formData.conventionalLoanAmount ? `Loan 2 - Conventional:    $${formData.conventionalLoanAmount} (amount above SBA limit)` : ''}`;
    }

    let loansSection = '\nLOAN STRUCTURE\n\n';
    project.loans.forEach((loan, index) => {
      const loanNumber = index + 1;
      const payment = loan.rate ? calculateLoanPayment(
        loan.amount, 
        loan.rate, 
        (loan.term || 25) * 12
      ).monthlyPayment : 0;

      loansSection += `Loan ${loanNumber} - ${loan.loan_type}:    $${loan.amount.toLocaleString()}
                          Term: ${loan.term || 'TBD'} years
                          Rate: ${loan.rate ? `${loan.rate}%` : 'TBD'}
                          ${payment > 0 ? `Est. Payment: $${payment.toLocaleString()}/month` : ''}

`;
    });

    return loansSection;
  };

  const generateLetter = () => {
    const currentDate = getCurrentDate();
    const totalRate = getCurrentRate();
    const loansSection = getProjectLoansSection();
    
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
${loansSection}
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

  const handleDownload = async () => {
    const letter = generateLetter();
    
    // Auto-save the letter when downloaded
    if (project?.project_id && user) {
      const totalLoanAmount = project.loans?.reduce((sum, loan) => sum + loan.amount, 0) || 
                            parseInt(formData.sbaLoanAmount || '0') + parseInt(formData.conventionalLoanAmount || '0');

      const savedLetter: SavedPreApprovalLetter = {
        letter_id: `letter_${Date.now()}`,
        project_id: project.project_id,
        letter_content: letter,
        generated_date: new Date().toISOString(),
        applicant_name: formData.applicantName,
        total_loan_amount: totalLoanAmount,
        loans_included: project.loans?.map(loan => ({
          loan_type: loan.loan_type,
          amount: loan.amount,
          term: loan.term,
          rate: loan.rate ? `${loan.rate}%` : undefined
        })) || [],
        downloaded_by: user.id,
        downloaded_by_name: user.email || 'Unknown User',
        download_timestamp: new Date().toISOString()
      };

      // Save to local state (in real app, this would save to database)
      setSavedLetters(prev => [savedLetter, ...prev]);

      // Log audit event
      logAuditEvent({
        userId: user.id,
        userName: user.email || 'Unknown User',
        projectId: project.project_id,
        action: 'pre_approval_letter_downloaded',
        category: 'document',
        details: {
          letterId: savedLetter.letter_id,
          applicantName: formData.applicantName,
          totalLoanAmount: totalLoanAmount,
          loansCount: project.loans?.length || 0
        }
      });

      toast.success('Pre-approval letter downloaded and saved to project history');
    }

    // Download the file
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pre-Approval-Letter-${formData.applicantName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadSavedLetters = async (projectId: string) => {
    // In a real implementation, this would load from the database
    // For now, we'll use mock data
    const mockSavedLetters: SavedPreApprovalLetter[] = [];
    setSavedLetters(mockSavedLetters);
  };

  const deleteLetter = async (letterId: string) => {
    setSavedLetters(prev => prev.filter(letter => letter.letter_id !== letterId));
    return true;
  };

  return {
    formData,
    showPreview,
    setShowPreview,
    handleInputChange,
    getCurrentRate,
    generateLetter,
    handleDownload,
    savedLetters,
    deleteLetter
  };
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PreApprovalData {
  lenderName: string;
  lenderRepName: string;
  lenderRepTitle: string;
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
  lenderAddress: string;
  lenderPhone: string;
  lenderEmail: string;
}

const PreApprovalLetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState<PreApprovalData>({
    lenderName: 'First National Bank',
    lenderRepName: 'John Anderson',
    lenderRepTitle: 'Senior Vice President, Commercial Lending',
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
    currentPrimeRate: '8.50',
    lenderAddress: '123 Main Street, Financial District, NY 10005',
    lenderPhone: '(555) 123-4567',
    lenderEmail: 'john.anderson@firstnational.com'
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
${formData.lenderName}
${formData.lenderAddress}

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
                          (First National Bank is an SBA preferred lender)

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

We are excited about the opportunity to work with you on this acquisition. Should you have any questions, please contact me at ${formData.lenderPhone} or ${formData.lenderEmail}.

Sincerely,

${formData.lenderRepName}
${formData.lenderRepTitle}
${formData.lenderName}

${formData.lenderAddress}
©${new Date().getFullYear()} ${formData.lenderName}. All rights reserved. Member FDIC. Equal Housing Lender.
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <CardTitle>Pre-Approval Letter Generator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lender Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Lender Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="lenderName">Lender Name</Label>
                  <Input
                    id="lenderName"
                    value={formData.lenderName}
                    onChange={(e) => handleInputChange('lenderName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="lenderRepName">Representative Name</Label>
                  <Input
                    id="lenderRepName"
                    value={formData.lenderRepName}
                    onChange={(e) => handleInputChange('lenderRepName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="lenderRepTitle">Representative Title</Label>
                  <Input
                    id="lenderRepTitle"
                    value={formData.lenderRepTitle}
                    onChange={(e) => handleInputChange('lenderRepTitle', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="lenderAddress">Lender Address</Label>
                  <Textarea
                    id="lenderAddress"
                    value={formData.lenderAddress}
                    onChange={(e) => handleInputChange('lenderAddress', e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="lenderPhone">Phone</Label>
                    <Input
                      id="lenderPhone"
                      value={formData.lenderPhone}
                      onChange={(e) => handleInputChange('lenderPhone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lenderEmail">Email</Label>
                    <Input
                      id="lenderEmail"
                      value={formData.lenderEmail}
                      onChange={(e) => handleInputChange('lenderEmail', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Loan Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="applicantName">Applicant Name</Label>
                  <Input
                    id="applicantName"
                    value={formData.applicantName}
                    onChange={(e) => handleInputChange('applicantName', e.target.value)}
                    placeholder="Full name of primary applicant"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanProgram">Loan Program</Label>
                  <Select
                    value={formData.loanProgram}
                    onValueChange={(value) => handleInputChange('loanProgram', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SBA 7(a) Business Purchase Financing">SBA 7(a) Business Purchase</SelectItem>
                      <SelectItem value="SBA 504 Real Estate Financing">SBA 504 Real Estate</SelectItem>
                      <SelectItem value="Conventional Business Acquisition">Conventional Business Acquisition</SelectItem>
                      <SelectItem value="Equipment Financing">Equipment Financing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
                    <Input
                      id="purchasePrice"
                      value={formData.purchasePrice}
                      onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                      placeholder="2,500,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sbaLoanAmount">SBA Loan Amount</Label>
                    <Input
                      id="sbaLoanAmount"
                      value={formData.sbaLoanAmount}
                      onChange={(e) => handleInputChange('sbaLoanAmount', e.target.value)}
                      placeholder="2,250,000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="guarantors">Guarantors</Label>
                  <Textarea
                    id="guarantors"
                    value={formData.guarantors}
                    onChange={(e) => handleInputChange('guarantors', e.target.value)}
                    placeholder="Mr. John Smith and Mrs. Jane Smith, Husband and Wife"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="cashEquityPercentage">Cash Equity %</Label>
                    <Input
                      id="cashEquityPercentage"
                      value={formData.cashEquityPercentage}
                      onChange={(e) => handleInputChange('cashEquityPercentage', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRateSpread">Rate Spread %</Label>
                    <Input
                      id="interestRateSpread"
                      value={formData.interestRateSpread}
                      onChange={(e) => handleInputChange('interestRateSpread', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentPrimeRate">Prime Rate %</Label>
                    <Input
                      id="currentPrimeRate"
                      value={formData.currentPrimeRate}
                      onChange={(e) => handleInputChange('currentPrimeRate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Current Total Rate: {getCurrentRate()}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            <Button onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Letter
            </Button>
          </div>
          
          {showPreview && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Letter Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                  {generateLetter()}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreApprovalLetterGenerator;

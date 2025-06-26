
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/project';

interface PreApprovalData {
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

interface PreApprovalFormDataProps {
  formData: PreApprovalData;
  onInputChange: (field: keyof PreApprovalData, value: string) => void;
  getCurrentRate: () => string;
  project?: Project;
}

export const PreApprovalFormData: React.FC<PreApprovalFormDataProps> = ({
  formData,
  onInputChange,
  getCurrentRate,
  project
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        Loan Information
      </h3>
      
      {project?.loans && project.loans.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Project Loans ({project.loans.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {project.loans.map((loan, index) => (
              <div key={loan.loan_id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{loan.loan_type}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{formatCurrency(loan.amount)}</Badge>
                  {loan.rate && <Badge variant="secondary">{loan.rate}%</Badge>}
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-blue-200">
              <div className="flex justify-between font-semibold">
                <span>Total Loan Amount:</span>
                <span>{formatCurrency(project.loans.reduce((sum, loan) => sum + loan.amount, 0))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="applicantName">Applicant Name</Label>
          <Input
            id="applicantName"
            value={formData.applicantName}
            onChange={(e) => onInputChange('applicantName', e.target.value)}
            placeholder="Full name of primary applicant"
          />
        </div>
        
        <div>
          <Label htmlFor="loanProgram">Loan Program</Label>
          <Select
            value={formData.loanProgram}
            onValueChange={(value) => onInputChange('loanProgram', value)}
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
              onChange={(e) => onInputChange('purchasePrice', e.target.value)}
              placeholder="2,500,000"
            />
          </div>
          <div>
            <Label htmlFor="sbaLoanAmount">SBA Loan Amount</Label>
            <Input
              id="sbaLoanAmount"
              value={formData.sbaLoanAmount}
              onChange={(e) => onInputChange('sbaLoanAmount', e.target.value)}
              placeholder="2,250,000"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="guarantors">Guarantors</Label>
          <Textarea
            id="guarantors"
            value={formData.guarantors}
            onChange={(e) => onInputChange('guarantors', e.target.value)}
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
              onChange={(e) => onInputChange('cashEquityPercentage', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="interestRateSpread">Rate Spread %</Label>
            <Input
              id="interestRateSpread"
              value={formData.interestRateSpread}
              onChange={(e) => onInputChange('interestRateSpread', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="currentPrimeRate">Prime Rate %</Label>
            <Input
              id="currentPrimeRate"
              value={formData.currentPrimeRate}
              onChange={(e) => onInputChange('currentPrimeRate', e.target.value)}
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
  );
};

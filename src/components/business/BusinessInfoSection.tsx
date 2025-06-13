
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Business } from '@/types/business';

interface BusinessInfoSectionProps {
  business: Business;
}

const BusinessInfoSection: React.FC<BusinessInfoSectionProps> = ({ business }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip_code) parts.push(address.zip_code);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <CardTitle>Business Information</CardTitle>
        </div>
        <CardDescription>Detailed business information and contact details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3">BASIC INFORMATION</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business Legal Name</label>
                  <p className="text-sm mt-1">{business.name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">DBA or Tradename</label>
                  <p className="text-sm mt-1">{business.dba_name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business Tax ID Number</label>
                  <p className="text-sm mt-1">{business.ein ? business.ein.replace(/(\d{2})(\d{7})/, '$1-$2') : 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Industry / NAICS Code</label>
                  <p className="text-sm mt-1">{business.naics_code || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Entity Type</label>
                  <p className="text-sm mt-1">{business.entity_type || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Special Ownership Type</label>
                  <p className="text-sm mt-1">{business.special_ownership_type || 'None'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Operational Information */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3">CONTACT INFORMATION</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business Phone Number</label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    {business.phone || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Contact Name</label>
                  <p className="text-sm mt-1">{business.primary_contact_name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Contact Email</label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {business.primary_contact_email || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date Business Established</label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {business.founding_date ? new Date(business.founding_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Number of Employees</label>
                  <p className="text-sm mt-1">{business.employee_count || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold text-sm text-muted-foreground mb-4">ADDRESS INFORMATION</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Principal Place of Business Address</label>
              <p className="text-sm mt-1 flex items-start gap-2">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                {formatAddress(business.address)}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Project Address</label>
              <p className="text-sm mt-1 flex items-start gap-2">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                {formatAddress(business.project_address) || 'Same as business address'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Mailing Address</label>
              <p className="text-sm mt-1 flex items-start gap-2">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                {formatAddress(business.mailing_address) || 'Same as business address'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notice Address</label>
              <p className="text-sm mt-1 flex items-start gap-2">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                {formatAddress(business.notice_address) || 'Same as business address'}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold text-sm text-muted-foreground mb-4">FINANCIAL INFORMATION</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Sales (Prior Calendar Year)</label>
              <p className="text-sm mt-1">{business.prior_year_sales ? formatCurrency(business.prior_year_sales) : 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Sales (Current Year YTD)</label>
              <p className="text-sm mt-1">{business.current_year_sales ? formatCurrency(business.current_year_sales) : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-semibold text-sm text-muted-foreground mb-4">ADDITIONAL INFORMATION</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Is this a startup business?</label>
              <p className="text-sm mt-1">{business.is_startup ? 'Yes' : 'No'}</p>
            </div>
            
            {business.is_startup && business.months_in_business && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Months in Business</label>
                <p className="text-sm mt-1">{business.months_in_business}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Previous SBA Loan?</label>
              <p className="text-sm mt-1">{business.has_previous_sba_loan ? 'Yes' : 'No'}</p>
            </div>
            
            {business.has_previous_sba_loan && business.previous_sba_loan_details && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Previous SBA Loan Details</label>
                <p className="text-sm mt-1 whitespace-pre-wrap">{business.previous_sba_loan_details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Business Debt Table */}
        {business.existing_debt && business.existing_debt.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold text-sm text-muted-foreground mb-4">EXISTING BUSINESS DEBT</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border p-2 text-left text-xs font-medium">Lender</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Original Amount</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Current Balance</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Payment</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Rate</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Maturity Date</th>
                    <th className="border border-border p-2 text-left text-xs font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {business.existing_debt.map((debt: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-border p-2 text-xs">{debt.lender}</td>
                      <td className="border border-border p-2 text-xs">{formatCurrency(debt.original_amount)}</td>
                      <td className="border border-border p-2 text-xs">{formatCurrency(debt.current_balance)}</td>
                      <td className="border border-border p-2 text-xs">{formatCurrency(debt.payment)}</td>
                      <td className="border border-border p-2 text-xs">{debt.rate}%</td>
                      <td className="border border-border p-2 text-xs">{new Date(debt.maturity_date).toLocaleDateString()}</td>
                      <td className="border border-border p-2 text-xs">{debt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessInfoSection;

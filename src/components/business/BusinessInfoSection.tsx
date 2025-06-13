
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
        {/* Basic Information - Compact Grid */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">BASIC INFORMATION</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Business Legal Name</label>
                <p className="text-sm">{business.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">DBA / Tradename</label>
                <p className="text-sm">{business.dba_name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Entity Type</label>
                <p className="text-sm">{business.entity_type || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Tax ID Number</label>
                <p className="text-sm">{business.ein ? business.ein.replace(/(\d{2})(\d{7})/, '$1-$2') : 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">NAICS Code</label>
                <p className="text-sm">{business.naics_code || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Special Ownership</label>
                <p className="text-sm">{business.special_ownership_type || 'None'}</p>
              </div>
            </div>
          </div>

          {/* Contact & Operational Information - Compact Grid */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">CONTACT & OPERATIONAL INFO</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone</label>
                <p className="text-sm flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {business.phone || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Primary Contact</label>
                <p className="text-sm">{business.primary_contact_name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Contact Email</label>
                <p className="text-sm flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {business.primary_contact_email || 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Date Established</label>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {business.founding_date ? new Date(business.founding_date).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Employees</label>
                <p className="text-sm">{business.employee_count || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Startup</label>
                <p className="text-sm">{business.is_startup ? `Yes (${business.months_in_business || 0} months)` : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Address Information - 2 Column Layout */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">ADDRESSES</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Business Address</label>
                <p className="text-sm flex items-start gap-1">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  {formatAddress(business.address)}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Project Address</label>
                <p className="text-sm flex items-start gap-1">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  {formatAddress(business.project_address) || 'Same as business'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Mailing Address</label>
                <p className="text-sm flex items-start gap-1">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  {formatAddress(business.mailing_address) || 'Same as business'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Notice Address</label>
                <p className="text-sm flex items-start gap-1">
                  <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  {formatAddress(business.notice_address) || 'Same as business'}
                </p>
              </div>
            </div>
          </div>

          {/* Financial & Additional Information - Compact Layout */}
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">FINANCIAL & ADDITIONAL INFO</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Prior Year Sales</label>
                <p className="text-sm font-medium">{business.prior_year_sales ? formatCurrency(business.prior_year_sales) : 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Current YTD Sales</label>
                <p className="text-sm font-medium">{business.current_year_sales ? formatCurrency(business.current_year_sales) : 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Previous SBA Loan</label>
                <p className="text-sm">{business.has_previous_sba_loan ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Website</label>
                <p className="text-sm">{business.website || 'N/A'}</p>
              </div>
            </div>
            {business.has_previous_sba_loan && business.previous_sba_loan_details && (
              <div className="mt-3">
                <label className="text-xs font-medium text-muted-foreground">SBA Loan Details</label>
                <p className="text-sm mt-1 bg-muted/30 p-2 rounded text-xs">{business.previous_sba_loan_details}</p>
              </div>
            )}
          </div>

          {/* Business Debt Table - Compact */}
          {business.existing_debt && business.existing_debt.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-3">EXISTING BUSINESS DEBT</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-2 text-left font-medium">Lender</th>
                      <th className="border border-border p-2 text-left font-medium">Original</th>
                      <th className="border border-border p-2 text-left font-medium">Balance</th>
                      <th className="border border-border p-2 text-left font-medium">Payment</th>
                      <th className="border border-border p-2 text-left font-medium">Rate</th>
                      <th className="border border-border p-2 text-left font-medium">Maturity</th>
                      <th className="border border-border p-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {business.existing_debt.map((debt: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-border p-2">{debt.lender}</td>
                        <td className="border border-border p-2">{formatCurrency(debt.original_amount)}</td>
                        <td className="border border-border p-2">{formatCurrency(debt.current_balance)}</td>
                        <td className="border border-border p-2">{formatCurrency(debt.payment)}</td>
                        <td className="border border-border p-2">{debt.rate}%</td>
                        <td className="border border-border p-2">{new Date(debt.maturity_date).toLocaleDateString()}</td>
                        <td className="border border-border p-2">{debt.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInfoSection;


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

  const formatEIN = (ein: string | undefined) => {
    if (!ein) return 'N/A';
    // Format EIN as XX-XXXXXXX
    return ein.replace(/(\d{2})(\d{7})/, '$1-$2');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg">Business Information</CardTitle>
        </div>
        <CardDescription className="text-xs">Detailed business information and contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information - 4 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Basic Information</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Legal Name</label>
              <p className="text-xs">{business.name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">DBA</label>
              <p className="text-xs">{business.dba_name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Entity Type</label>
              <p className="text-xs">{business.entity_type || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">EIN</label>
              <p className="text-xs">{formatEIN(business.ein)}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">NAICS</label>
              <p className="text-xs">{business.naics_code || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Special Ownership</label>
              <p className="text-xs">{business.special_ownership_type || 'None'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Employees</label>
              <p className="text-xs">{business.employee_count || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Established</label>
              <p className="text-xs">{business.founding_date ? new Date(business.founding_date).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Contact & Financial - 4 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Contact & Financial</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Phone</label>
              <p className="text-xs flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {business.phone || 'N/A'}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Contact Email</label>
              <p className="text-xs flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {business.primary_contact_email || 'N/A'}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Prior Year Sales</label>
              <p className="text-xs font-medium">{business.prior_year_sales ? formatCurrency(business.prior_year_sales) : 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">YTD Sales</label>
              <p className="text-xs font-medium">{business.current_year_sales ? formatCurrency(business.current_year_sales) : 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Primary Contact</label>
              <p className="text-xs">{business.primary_contact_name || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Website</label>
              <p className="text-xs">{business.website || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Previous SBA</label>
              <p className="text-xs">{business.has_previous_sba_loan ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Startup Status</label>
              <p className="text-xs">{business.is_startup ? `Yes (${business.months_in_business || 0} mo)` : 'No'}</p>
            </div>
          </div>
        </div>

        {/* Addresses - 2 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Addresses</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Business Address</label>
              <p className="text-xs flex items-start gap-1">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{formatAddress(business.address)}</span>
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Project Address</label>
              <p className="text-xs flex items-start gap-1">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{formatAddress(business.project_address) || 'Same as business'}</span>
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Mailing Address</label>
              <p className="text-xs flex items-start gap-1">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{formatAddress(business.mailing_address) || 'Same as business'}</span>
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Notice Address</label>
              <p className="text-xs flex items-start gap-1">
                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span className="break-words">{formatAddress(business.notice_address) || 'Same as business'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Existing Debt Table - Compact */}
        {business.existing_debt && business.existing_debt.length > 0 && (
          <div>
            <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Existing Business Debt</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="border border-border p-1.5 text-left font-medium">Lender</th>
                    <th className="border border-border p-1.5 text-left font-medium">Original</th>
                    <th className="border border-border p-1.5 text-left font-medium">Balance</th>
                    <th className="border border-border p-1.5 text-left font-medium">Payment</th>
                    <th className="border border-border p-1.5 text-left font-medium">Rate</th>
                    <th className="border border-border p-1.5 text-left font-medium">Maturity</th>
                    <th className="border border-border p-1.5 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {business.existing_debt.map((debt: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-border p-1.5">{debt.lender}</td>
                      <td className="border border-border p-1.5">{formatCurrency(debt.original_amount)}</td>
                      <td className="border border-border p-1.5">{formatCurrency(debt.current_balance)}</td>
                      <td className="border border-border p-1.5">{formatCurrency(debt.payment)}</td>
                      <td className="border border-border p-1.5">{debt.rate}%</td>
                      <td className="border border-border p-1.5">{new Date(debt.maturity_date).toLocaleDateString()}</td>
                      <td className="border border-border p-1.5">{debt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {business.has_previous_sba_loan && business.previous_sba_loan_details && (
          <div>
            <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">SBA Loan Details</h4>
            <p className="text-xs bg-muted/20 p-2 rounded">{business.previous_sba_loan_details}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessInfoSection;

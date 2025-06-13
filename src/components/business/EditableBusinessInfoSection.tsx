import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Phone, Mail, Calendar, MapPin, Edit, Save, X } from 'lucide-react';
import { Business } from '@/types/business';
import { toast } from 'sonner';

interface EditableBusinessInfoSectionProps {
  business: Business;
}

const EditableBusinessInfoSection: React.FC<EditableBusinessInfoSectionProps> = ({ business }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState(business);

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

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast.success('Business information updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBusiness(business);
    setIsEditing(false);
  };

  const updateField = (field: string, value: any) => {
    setEditedBusiness(prev => ({ ...prev, [field]: value }));
  };

  const updateAddressField = (addressType: string, field: string, value: string) => {
    setEditedBusiness(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType as keyof Business],
        [field]: value
      }
    }));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Business Information</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
        <CardDescription className="text-xs">Detailed business information and contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information - 4 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Basic Information</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Legal Name</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.name} 
                  onChange={(e) => updateField('name', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.name || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">DBA</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.dba_name || ''} 
                  onChange={(e) => updateField('dba_name', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.dba_name || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Entity Type</label>
              {isEditing ? (
                <Select value={editedBusiness.entity_type} onValueChange={(value) => updateField('entity_type', value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LLC">LLC</SelectItem>
                    <SelectItem value="Corporation">Corporation</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs">{editedBusiness.entity_type || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Tax ID</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.ein || ''} 
                  onChange={(e) => updateField('ein', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="XX-XXXXXXX"
                />
              ) : (
                <p className="text-xs">{editedBusiness.ein ? editedBusiness.ein.replace(/(\d{2})(\d{7})/, '$1-$2') : 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">NAICS</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.naics_code || ''} 
                  onChange={(e) => updateField('naics_code', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.naics_code || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Special Ownership</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.special_ownership_type || ''} 
                  onChange={(e) => updateField('special_ownership_type', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.special_ownership_type || 'None'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Employees</label>
              {isEditing ? (
                <Input 
                  type="number"
                  value={editedBusiness.employee_count || ''} 
                  onChange={(e) => updateField('employee_count', parseInt(e.target.value))}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.employee_count || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Established</label>
              {isEditing ? (
                <Input 
                  type="date"
                  value={editedBusiness.founding_date || ''} 
                  onChange={(e) => updateField('founding_date', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.founding_date ? new Date(editedBusiness.founding_date).toLocaleDateString() : 'N/A'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact & Financial - 4 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Contact & Financial</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Phone</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.phone || ''} 
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {editedBusiness.phone || 'N/A'}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Contact Email</label>
              {isEditing ? (
                <Input 
                  type="email"
                  value={editedBusiness.primary_contact_email || ''} 
                  onChange={(e) => updateField('primary_contact_email', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {editedBusiness.primary_contact_email || 'N/A'}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Prior Year Sales</label>
              {isEditing ? (
                <Input 
                  type="number"
                  value={editedBusiness.prior_year_sales || ''} 
                  onChange={(e) => updateField('prior_year_sales', parseFloat(e.target.value))}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs font-medium">{editedBusiness.prior_year_sales ? formatCurrency(editedBusiness.prior_year_sales) : 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">YTD Sales</label>
              {isEditing ? (
                <Input 
                  type="number"
                  value={editedBusiness.current_year_sales || ''} 
                  onChange={(e) => updateField('current_year_sales', parseFloat(e.target.value))}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs font-medium">{editedBusiness.current_year_sales ? formatCurrency(editedBusiness.current_year_sales) : 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Primary Contact</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.primary_contact_name || ''} 
                  onChange={(e) => updateField('primary_contact_name', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.primary_contact_name || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Website</label>
              {isEditing ? (
                <Input 
                  value={editedBusiness.website || ''} 
                  onChange={(e) => updateField('website', e.target.value)}
                  className="h-8 text-xs"
                />
              ) : (
                <p className="text-xs">{editedBusiness.website || 'N/A'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Previous SBA</label>
              {isEditing ? (
                <Select 
                  value={editedBusiness.has_previous_sba_loan ? 'yes' : 'no'} 
                  onValueChange={(value) => updateField('has_previous_sba_loan', value === 'yes')}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs">{editedBusiness.has_previous_sba_loan ? 'Yes' : 'No'}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Startup Status</label>
              {isEditing ? (
                <div className="flex gap-2">
                  <Select 
                    value={editedBusiness.is_startup ? 'yes' : 'no'} 
                    onValueChange={(value) => updateField('is_startup', value === 'yes')}
                  >
                    <SelectTrigger className="h-8 text-xs flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {editedBusiness.is_startup && (
                    <Input 
                      type="number"
                      placeholder="Months"
                      value={editedBusiness.months_in_business || ''} 
                      onChange={(e) => updateField('months_in_business', parseInt(e.target.value))}
                      className="h-8 text-xs w-20"
                    />
                  )}
                </div>
              ) : (
                <p className="text-xs">{editedBusiness.is_startup ? `Yes (${editedBusiness.months_in_business || 0} mo)` : 'No'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Addresses - 2 columns */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Addresses</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
            {['address', 'project_address', 'mailing_address', 'notice_address'].map((addressType, index) => {
              const labels = ['Business Address', 'Project Address', 'Mailing Address', 'Notice Address'];
              const address = editedBusiness[addressType as keyof Business] as any;
              
              return (
                <div key={addressType}>
                  <label className="text-xs font-medium text-muted-foreground">{labels[index]}</label>
                  {isEditing ? (
                    <div className="space-y-1">
                      <Input 
                        placeholder="Street"
                        value={address?.street || ''} 
                        onChange={(e) => updateAddressField(addressType, 'street', e.target.value)}
                        className="h-8 text-xs"
                      />
                      <div className="grid grid-cols-3 gap-1">
                        <Input 
                          placeholder="City"
                          value={address?.city || ''} 
                          onChange={(e) => updateAddressField(addressType, 'city', e.target.value)}
                          className="h-8 text-xs"
                        />
                        <Input 
                          placeholder="State"
                          value={address?.state || ''} 
                          onChange={(e) => updateAddressField(addressType, 'state', e.target.value)}
                          className="h-8 text-xs"
                        />
                        <Input 
                          placeholder="ZIP"
                          value={address?.zip_code || ''} 
                          onChange={(e) => updateAddressField(addressType, 'zip_code', e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{formatAddress(address) || (index > 0 ? 'Same as business' : 'N/A')}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Existing Debt Table - Keep same as original */}
        {editedBusiness.existing_debt && editedBusiness.existing_debt.length > 0 && (
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
                  {editedBusiness.existing_debt.map((debt: any, index: number) => (
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

        {editedBusiness.has_previous_sba_loan && editedBusiness.previous_sba_loan_details && (
          <div>
            <h4 className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">SBA Loan Details</h4>
            {isEditing ? (
              <textarea 
                value={editedBusiness.previous_sba_loan_details}
                onChange={(e) => updateField('previous_sba_loan_details', e.target.value)}
                className="w-full p-2 text-xs bg-muted/20 rounded border"
                rows={3}
              />
            ) : (
              <p className="text-xs bg-muted/20 p-2 rounded">{editedBusiness.previous_sba_loan_details}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableBusinessInfoSection;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Plus, Edit, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AffiliatedBusiness {
  business_id: string;
  name: string;
  entity_type: string;
  ownership_percentage: number;
  industry: string;
  annual_revenue: number;
  employees: number;
  status: 'Active' | 'Inactive' | 'Pending';
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
  };
  contact: {
    phone?: string;
    email?: string;
  };
  owner_role: string;
  date_acquired: string;
}

interface AffiliatedBusinessOwnershipSectionProps {
  projectId: string;
  owners: any[];
}

const AffiliatedBusinessOwnershipSection: React.FC<AffiliatedBusinessOwnershipSectionProps> = ({ 
  projectId, 
  owners 
}) => {
  const navigate = useNavigate();
  
  // Mock affiliated businesses data - in real app this would come from API
  const [affiliatedBusinesses] = useState<AffiliatedBusiness[]>([
    {
      business_id: 'aff_bus_1',
      name: 'Tech Consulting Solutions LLC',
      entity_type: 'LLC',
      ownership_percentage: 75,
      industry: 'Technology Consulting',
      annual_revenue: 2450000,
      employees: 12,
      status: 'Active',
      address: {
        street: '456 Innovation Dr',
        city: 'Seattle',
        state: 'WA',
        zip_code: '98101'
      },
      contact: {
        phone: '(206) 555-0123',
        email: 'info@techconsultingsolutions.com'
      },
      owner_role: 'Managing Member',
      date_acquired: '2019-03-15'
    },
    {
      business_id: 'aff_bus_2', 
      name: 'Pacific Real Estate Holdings',
      entity_type: 'Partnership',
      ownership_percentage: 45,
      industry: 'Real Estate Investment',
      annual_revenue: 1850000,
      employees: 6,
      status: 'Active',
      address: {
        street: '789 Waterfront Ave',
        city: 'Portland',
        state: 'OR',
        zip_code: '97201'
      },
      contact: {
        phone: '(503) 555-0456',
        email: 'contact@pacificrealestate.com'
      },
      owner_role: 'General Partner',
      date_acquired: '2020-08-22'
    },
    {
      business_id: 'aff_bus_3',
      name: 'Northwest Marketing Group Inc',
      entity_type: 'S-Corp',
      ownership_percentage: 60,
      industry: 'Marketing & Advertising',
      annual_revenue: 985000,
      employees: 8,
      status: 'Active',
      address: {
        street: '321 Commerce Blvd',
        city: 'Bellevue',
        state: 'WA',
        zip_code: '98004'
      },
      contact: {
        phone: '(425) 555-0789',
        email: 'hello@nwmarketinggroup.com'
      },
      owner_role: 'President & Shareholder',
      date_acquired: '2021-01-10'
    },
    {
      business_id: 'aff_bus_4',
      name: 'Coastal Investment Properties LLC',
      entity_type: 'LLC',
      ownership_percentage: 85,
      industry: 'Property Management',
      annual_revenue: 650000,
      employees: 4,
      status: 'Active',
      address: {
        street: '555 Ocean View Dr',
        city: 'Newport',
        state: 'OR',
        zip_code: '97365'
      },
      contact: {
        phone: '(541) 555-0234',
        email: 'info@coastalinvestmentprops.com'
      },
      owner_role: 'Managing Member',
      date_acquired: '2022-06-18'
    },
    {
      business_id: 'aff_bus_5',
      name: 'Urban Retail Ventures',
      entity_type: 'LLC',
      ownership_percentage: 30,
      industry: 'Retail',
      annual_revenue: 1250000,
      employees: 15,
      status: 'Pending',
      address: {
        street: '888 Downtown Plaza',
        city: 'Vancouver',
        state: 'WA',
        zip_code: '98660'
      },
      contact: {
        phone: '(360) 555-0567',
        email: 'info@urbanretailventures.com'
      },
      owner_role: 'Minority Partner',
      date_acquired: '2023-11-05'
    }
  ]);

  const getTotalAffiliatedValue = () => {
    return affiliatedBusinesses.reduce((total, business) => 
      total + (business.annual_revenue * (business.ownership_percentage / 100)), 0
    );
  };

  const handleBusinessClick = (businessId: string) => {
    navigate(`/affiliated-business/${projectId}`);
  };

  const handleAddBusiness = () => {
    console.log('Add affiliated business');
  };

  const handleEditBusiness = (businessId: string) => {
    console.log('Edit business:', businessId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAddress = (address: AffiliatedBusiness['address']) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zip_code}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Affiliated Business Ownership</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Total Portfolio Value: {formatCurrency(getTotalAffiliatedValue())}
            </Badge>
            <Button variant="outline" size="sm" onClick={handleAddBusiness}>
              <Plus className="h-4 w-4 mr-2" />
              Add Business
            </Button>
          </div>
        </div>
        <CardDescription className="text-sm">
          Other businesses owned by the principals ({affiliatedBusinesses.length} businesses)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        {affiliatedBusinesses.length > 0 ? (
          <div className="space-y-4">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Business Name</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Ownership %</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Annual Revenue</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Acquired</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliatedBusinesses.map((business) => (
                    <TableRow 
                      key={business.business_id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleBusinessClick(business.business_id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{business.name}</div>
                            <div className="text-xs text-muted-foreground">ID: {business.business_id}</div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {business.entity_type}
                        </Badge>
                      </TableCell>
                      
                      <TableCell className="text-sm">{business.industry}</TableCell>
                      
                      <TableCell className="text-right">
                        <div className="font-bold text-primary text-lg">
                          {business.ownership_percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Value: {formatCurrency(business.annual_revenue * (business.ownership_percentage / 100))}
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-sm">{business.owner_role}</TableCell>
                      
                      <TableCell className="text-right font-medium">
                        {formatCurrency(business.annual_revenue)}
                      </TableCell>
                      
                      <TableCell className="text-center">{business.employees}</TableCell>
                      
                      <TableCell>
                        <Badge className={`text-xs ${getStatusColor(business.status)}`}>
                          {business.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          {business.contact.phone && (
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3" />
                              {business.contact.phone}
                            </div>
                          )}
                          {business.contact.email && (
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3" />
                              {business.contact.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell className="max-w-48">
                        <div className="flex items-start gap-1 text-xs">
                          <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span className="truncate">{formatAddress(business.address)}</span>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-sm">
                        {new Date(business.date_acquired).toLocaleDateString()}
                      </TableCell>
                      
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBusiness(business.business_id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Businesses</div>
                <div className="text-2xl font-bold text-primary">{affiliatedBusinesses.length}</div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                <div className="text-2xl font-bold text-primary">{formatCurrency(getTotalAffiliatedValue())}</div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Average Ownership</div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(affiliatedBusinesses.reduce((sum, b) => sum + b.ownership_percentage, 0) / affiliatedBusinesses.length)}%
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Active Businesses</div>
                <div className="text-2xl font-bold text-primary">
                  {affiliatedBusinesses.filter(b => b.status === 'Active').length}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No affiliated businesses found</p>
            <p className="text-sm text-muted-foreground mt-1">Click "Add Business" to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliatedBusinessOwnershipSection;

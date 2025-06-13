
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, Users, Plus, DollarSign, UserCheck } from 'lucide-react';
import { Project } from '@/types/project';
import LoanDetailsTable from './LoanDetailsTable';

interface ProjectBusinessStructureProps {
  project: Project;
  onAddOwner: () => void;
  onAddSeller: () => void;
  onAddAffiliatedBusiness: (ownerId: string) => void;
}

const ProjectBusinessStructure: React.FC<ProjectBusinessStructureProps> = ({
  project,
  onAddOwner,
  onAddSeller,
  onAddAffiliatedBusiness
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock owners data - in a real app this would come from the project data
  const mockOwners = [
    {
      owner_id: 'owner_1',
      name: 'John Smith',
      type: 'individual' as const,
      ownership_percentage: 60,
      role: 'CEO',
      email: 'john.smith@example.com'
    },
    {
      owner_id: 'owner_2', 
      name: 'Sarah Johnson',
      type: 'individual' as const,
      ownership_percentage: 40,
      role: 'COO',
      email: 'sarah.johnson@example.com'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Business Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Main Business</CardTitle>
            </div>
          </div>
          <CardDescription>Primary business entity for this project</CardDescription>
        </CardHeader>
        <CardContent>
          {project.main_business ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-lg">{project.main_business.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.main_business.entity_type}</p>
                  {project.main_business.description && (
                    <p className="text-sm mt-2">{project.main_business.description}</p>
                  )}
                </div>
                <div className="space-y-2">
                  {project.main_business.website && (
                    <p className="text-sm"><strong>Website:</strong> {project.main_business.website}</p>
                  )}
                  {project.main_business.founding_date && (
                    <p className="text-sm"><strong>Founded:</strong> {new Date(project.main_business.founding_date).toLocaleDateString()}</p>
                  )}
                  {project.main_business.employee_count && (
                    <p className="text-sm"><strong>Employees:</strong> {project.main_business.employee_count}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No main business configured</p>
              <Button className="mt-4">Add Main Business</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Owners Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>Owners</CardTitle>
            </div>
            <Button size="sm" onClick={onAddOwner}>
              <Plus className="h-4 w-4 mr-2" />
              Add Owner
            </Button>
          </div>
          <CardDescription>Ownership structure of the main business</CardDescription>
        </CardHeader>
        <CardContent>
          {mockOwners && mockOwners.length > 0 ? (
            <div className="space-y-4">
              {mockOwners.map((owner) => (
                <div key={owner.owner_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <h4 className="font-semibold">{owner.name}</h4>
                        <p className="text-sm text-muted-foreground">{owner.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{owner.ownership_percentage}%</div>
                      <p className="text-xs text-muted-foreground">Ownership</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <Badge variant="outline" className="mt-1">
                        {owner.type === 'individual' ? 'Individual' : 'Business'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Role</p>
                      <p className="font-medium mt-1">{owner.role}</p>
                    </div>
                  </div>

                  {owner.type === 'individual' && (
                    <div className="mt-3 pt-3 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onAddAffiliatedBusiness(owner.owner_id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Affiliated Business
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Ownership:</span>
                  <span className="text-lg font-bold text-primary">
                    {mockOwners.reduce((sum, owner) => sum + owner.ownership_percentage, 0)}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No owners added</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loans Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <CardTitle>Loans</CardTitle>
            </div>
          </div>
          <CardDescription>Loans assigned to the main business</CardDescription>
        </CardHeader>
        <CardContent>
          {project.loans && project.loans.length > 0 ? (
            <div className="space-y-4">
              {project.loans.map((loan) => (
                <div key={loan.loan_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{loan.loan_type}</h4>
                    <Badge className={getStatusColor(loan.status)}>{loan.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">{formatCurrency(loan.amount)}</p>
                    </div>
                    {loan.rate && (
                      <div>
                        <p className="text-muted-foreground">Rate</p>
                        <p className="font-medium">{loan.rate}%</p>
                      </div>
                    )}
                    {loan.term && (
                      <div>
                        <p className="text-muted-foreground">Term</p>
                        <p className="font-medium">{loan.term} years</p>
                      </div>
                    )}
                  </div>
                  {loan.description && (
                    <p className="text-sm text-muted-foreground mt-2">{loan.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No loans configured</p>
              <Button className="mt-4">Add Loan</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loan Details from Use of Proceeds */}
      <LoanDetailsTable project={project} />

      {/* Sellers Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Sellers</CardTitle>
            </div>
            <Button size="sm" onClick={onAddSeller}>
              <Plus className="h-4 w-4 mr-2" />
              Add Seller
            </Button>
          </div>
          <CardDescription>Sellers associated with this project</CardDescription>
        </CardHeader>
        <CardContent>
          {project.sellers && project.sellers.length > 0 ? (
            <div className="space-y-4">
              {project.sellers.map((seller) => (
                <div key={seller.seller_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{seller.name}</h4>
                    <Badge variant="outline">{seller.type}</Badge>
                  </div>
                  
                  {seller.associated_businesses && seller.associated_businesses.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">Associated Businesses:</h5>
                      <div className="space-y-2">
                        {seller.associated_businesses.map((business) => (
                          <div key={business.business_id} className="ml-4 p-2 bg-muted/50 rounded">
                            <p className="font-medium">{business.name}</p>
                            <p className="text-sm text-muted-foreground">{business.entity_type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No sellers added</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectBusinessStructure;

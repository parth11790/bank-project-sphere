
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, Plus, Percent } from 'lucide-react';
import { Project, Owner, Seller } from '@/types/project';
import { Business } from '@/types/business';

interface ProjectBusinessStructureProps {
  project: Project;
  onAddOwner?: () => void;
  onAddSeller?: () => void;
  onAddAffiliatedBusiness?: (ownerId: string) => void;
}

export const ProjectBusinessStructure: React.FC<ProjectBusinessStructureProps> = ({
  project,
  onAddOwner,
  onAddSeller,
  onAddAffiliatedBusiness
}) => {
  return (
    <div className="space-y-6">
      {/* Main Business Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Main Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          {project.main_business ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{project.main_business.name}</h3>
                  <Badge variant="outline">{project.main_business.entity_type}</Badge>
                </div>
              </div>
              
              {project.main_business.description && (
                <p className="text-muted-foreground">{project.main_business.description}</p>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">{project.main_business.website || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="font-medium">{project.main_business.founding_date || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="font-medium">{project.main_business.employee_count || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="font-medium">{project.main_business.documents?.length || 0}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Main Business</h3>
              <p className="text-muted-foreground mb-4">
                This project doesn't have a main business assigned yet.
              </p>
              <Button>Add Main Business</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loans Section */}
      <Card>
        <CardHeader>
          <CardTitle>Loans</CardTitle>
        </CardHeader>
        <CardContent>
          {project.loans && project.loans.length > 0 ? (
            <div className="space-y-4">
              {project.loans.map((loan) => (
                <div key={loan.loan_id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{loan.loan_type}</h4>
                      <p className="text-lg font-bold text-primary">
                        ${loan.amount.toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={loan.status === 'approved' ? 'default' : 'secondary'}>
                      {loan.status}
                    </Badge>
                  </div>
                  {loan.description && (
                    <p className="text-sm text-muted-foreground">{loan.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No loans assigned to this project.</p>
          )}
        </CardContent>
      </Card>

      {/* Owners Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Business Owners
            </CardTitle>
            {onAddOwner && (
              <Button variant="outline" size="sm" onClick={onAddOwner}>
                <Plus className="h-4 w-4 mr-2" />
                Add Owner
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock owners data for demonstration */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold">John Smith</h4>
                  <Badge variant="outline">Individual</Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Percent className="h-4 w-4" />
                    <span className="font-medium">65%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ownership</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Affiliated Businesses (2)</h5>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Smith Consulting LLC</span>
                    <Badge variant="secondary" className="text-xs">LLC</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Tech Solutions Inc</span>
                    <Badge variant="secondary" className="text-xs">Corporation</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sellers Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sellers</CardTitle>
            {onAddSeller && (
              <Button variant="outline" size="sm" onClick={onAddSeller}>
                <Plus className="h-4 w-4 mr-2" />
                Add Seller
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock seller data for demonstration */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold">ABC Holdings Corp</h4>
                  <Badge variant="outline">Business</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Associated Businesses (1)</h5>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">ABC Manufacturing LLC</span>
                    <Badge variant="secondary" className="text-xs">LLC</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import { Project } from '@/types/project';

interface MainBusinessSectionProps {
  project: Project;
}

const MainBusinessSection: React.FC<MainBusinessSectionProps> = ({
  project
}) => {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Borrower Information</CardTitle>
          </div>
        </div>
        <CardDescription>Primary business entity for this project</CardDescription>
      </CardHeader>
      <CardContent>
        {project.main_business ? (
          <div className="space-y-6">
            {/* Basic Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{project.main_business.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.main_business.entity_type}</p>
                </div>
                
                {project.main_business.description && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p className="text-sm mt-1">{project.main_business.description}</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {project.main_business.ein && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">EIN</p>
                    <p className="text-sm">{project.main_business.ein}</p>
                  </div>
                )}
                
                {project.main_business.website && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Website</p>
                    <p className="text-sm">{project.main_business.website}</p>
                  </div>
                )}
                
                {project.main_business.founding_date && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Founded</p>
                    <p className="text-sm">{new Date(project.main_business.founding_date).toLocaleDateString()}</p>
                  </div>
                )}
                
                {project.main_business.employee_count && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Employees</p>
                    <p className="text-sm">{project.main_business.employee_count}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Business Address</p>
              <p className="text-sm">{formatAddress(project.main_business.address)}</p>
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
  );
};

export default MainBusinessSection;

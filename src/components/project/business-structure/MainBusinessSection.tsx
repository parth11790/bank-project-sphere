
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ExternalLink, MapPin, Calendar, Users, Globe } from 'lucide-react';
import { Project } from '@/types/project';

interface MainBusinessSectionProps {
  project: Project;
}

const MainBusinessSection: React.FC<MainBusinessSectionProps> = ({
  project
}) => {
  const navigate = useNavigate();
  
  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip_code) parts.push(address.zip_code);
    
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  const handleViewDetails = () => {
    navigate(`/business/${project.project_id}`);
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewDetails}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Borrower Information</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            View Details
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Primary business entity details</CardDescription>
      </CardHeader>
      <CardContent>
        {project.main_business ? (
          <div className="space-y-4">
            {/* Business Name and Type */}
            <div className="border-b pb-3">
              <h3 className="font-semibold text-xl text-foreground">{project.main_business.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.main_business.entity_type}</p>
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {project.main_business.ein && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-muted-foreground min-w-[60px]">EIN:</span>
                  <span>{project.main_business.ein}</span>
                </div>
              )}
              
              {project.main_business.founding_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">Founded:</span>
                  <span>{new Date(project.main_business.founding_date).toLocaleDateString()}</span>
                </div>
              )}
              
              {project.main_business.employee_count && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">Employees:</span>
                  <span>{project.main_business.employee_count}</span>
                </div>
              )}
              
              {project.main_business.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-muted-foreground">Website:</span>
                  <a 
                    href={`https://${project.main_business.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.main_business.website}
                  </a>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm pt-2 border-t">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium text-muted-foreground">Address:</span>
                <p className="mt-1">{formatAddress(project.main_business.address)}</p>
              </div>
            </div>

            {/* Description if available */}
            {project.main_business.description && (
              <div className="text-sm pt-2 border-t">
                <span className="font-medium text-muted-foreground">Description:</span>
                <p className="mt-1 text-muted-foreground">{project.main_business.description}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No borrower information configured</p>
            <Button className="mt-4">Add Borrower Details</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainBusinessSection;

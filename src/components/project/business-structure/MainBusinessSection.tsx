
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

  const handleAddressClick = (address: any) => {
    if (!address) return;
    const addressString = formatAddress(address);
    if (addressString !== 'N/A') {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleViewDetails = () => {
    navigate(`/business/${project.project_id}`);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Main Business</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
        <CardDescription>Primary business information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1">Business Name</h4>
          <p className="font-medium">{project.business_name || 'N/A'}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1">Business Type</h4>
          <p>{project.business_type || 'N/A'}</p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1">Industry</h4>
          <p>{project.industry || 'N/A'}</p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            Business Address
          </h4>
          <p 
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => handleAddressClick(project.business_address)}
          >
            {formatAddress(project.business_address)}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Date Established
          </h4>
          <p>{project.date_established ? new Date(project.date_established).toLocaleDateString() : 'N/A'}</p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Number of Employees
          </h4>
          <p>{project.number_of_employees || 'N/A'}</p>
        </div>

        {project.website && (
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Website
            </h4>
            <a 
              href={project.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {project.website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainBusinessSection;

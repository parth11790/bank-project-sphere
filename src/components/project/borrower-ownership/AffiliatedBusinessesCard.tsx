
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';
import { Project } from '@/types/project';

interface AffiliatedBusinessesCardProps {
  project: Project;
}

const AffiliatedBusinessesCard: React.FC<AffiliatedBusinessesCardProps> = ({ project }) => {
  const navigate = useNavigate();

  // Mock affiliated businesses for owners
  const getAffiliatedBusinesses = (ownerId: string) => {
    const mockBusinesses = [
      { business_id: 'aff_1', name: 'Tech Consulting LLC', entity_type: 'LLC', ownership_percentage: 75 },
      { business_id: 'aff_2', name: 'Real Estate Holdings', entity_type: 'Partnership', ownership_percentage: 45 },
      { business_id: 'aff_3', name: 'Marketing Solutions Inc', entity_type: 'Corporation', ownership_percentage: 60 },
      { business_id: 'aff_4', name: 'Investment Properties LLC', entity_type: 'LLC', ownership_percentage: 85 },
      { business_id: 'aff_5', name: 'Retail Ventures', entity_type: 'S-Corp', ownership_percentage: 30 }
    ];
    
    // Return 1-2 businesses per owner
    const startIndex = parseInt(ownerId.slice(-1)) || 0;
    return mockBusinesses.slice(startIndex % 3, (startIndex % 3) + 2);
  };

  const handleAffiliatedBusinessClick = (businessId: string) => {
    navigate(`/affiliated-business/${project.project_id}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Affiliated Businesses</CardTitle>
        </div>
        <CardDescription>Other businesses owned by the principals</CardDescription>
      </CardHeader>
      <CardContent>
        {project.owners && project.owners.length > 0 ? (
          <div className="space-y-2">
            {project.owners
              .filter(owner => owner.type === 'individual')
              .map((owner) => {
                const affiliatedBusinesses = getAffiliatedBusinesses(owner.owner_id);
                
                return (
                  <div key={owner.owner_id} className="space-y-1">
                    <div className="border-b pb-0.5">
                      <h5 className="font-medium text-sm text-gray-800">{owner.name}</h5>
                    </div>
                    
                    {affiliatedBusinesses.length > 0 ? (
                      <div className="space-y-1 ml-1">
                        {affiliatedBusinesses.map((business) => (
                          <div 
                            key={business.business_id} 
                            className="flex justify-between items-center p-1 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => handleAffiliatedBusinessClick(business.business_id)}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-medium text-gray-800 truncate">{business.name}</p>
                                <Badge variant="outline" className="text-xs shrink-0">
                                  {business.entity_type}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right ml-2 shrink-0">
                              <span className="text-sm font-semibold text-primary">
                                {business.ownership_percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 ml-1">No affiliated businesses</p>
                    )}
                  </div>
                );
              })}
              
            {project.owners.filter(owner => owner.type === 'individual').length === 0 && (
              <p className="text-muted-foreground text-sm">No individual owners to show affiliated businesses</p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No affiliated business information available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliatedBusinessesCard;

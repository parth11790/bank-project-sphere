
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Project } from '@/types/project';

interface OwnershipStructureCardProps {
  project: Project;
}

const OwnershipStructureCard: React.FC<OwnershipStructureCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleOwnerClick = (owner: any) => {
    if (owner.type === 'business') {
      // Navigate to business information page
      navigate(`/business/${owner.business_id || owner.owner_id}`);
    } else {
      // Navigate to personal information page for individual owners
      navigate(`/project/participants/${project.project_id}/personal-info/${owner.owner_id}`);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Ownership Structure</CardTitle>
        </div>
        <CardDescription>Business owners and their stakes</CardDescription>
      </CardHeader>
      <CardContent>
        {project.owners && project.owners.length > 0 ? (
          <div className="space-y-1">
            {project.owners.map((owner) => (
              <div 
                key={owner.owner_id} 
                className="border-b pb-1 last:border-b-0 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors"
                onClick={() => handleOwnerClick(owner)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-medium text-sm text-gray-900 truncate">{owner.name}</h4>
                      <Badge variant={owner.type === 'individual' ? 'secondary' : 'outline'} className="text-xs shrink-0">
                        {owner.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {owner.role && (
                          <span className="text-xs text-gray-500">{owner.role}</span>
                        )}
                        {owner.email && (
                          <span className="text-xs text-gray-500 truncate">{owner.email}</span>
                        )}
                      </div>
                      <span className="font-bold text-primary text-base ml-2">{owner.ownership_percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No ownership information available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnershipStructureCard;

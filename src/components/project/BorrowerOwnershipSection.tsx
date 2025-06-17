
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Users, Building } from 'lucide-react';
import { Project } from '@/types/project';

interface BorrowerOwnershipSectionProps {
  project: Project;
}

const BorrowerOwnershipSection: React.FC<BorrowerOwnershipSectionProps> = ({ project }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Borrower Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Borrower</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {project.main_business ? (
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{project.main_business.name}</h3>
                <Badge variant="outline" className="mt-1">{project.main_business.entity_type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.main_business.description || 'No description available'}
              </p>
              {project.main_business.address && (
                <p className="text-sm">
                  {project.main_business.address.city}, {project.main_business.address.state}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No borrower information available</p>
          )}
        </CardContent>
      </Card>

      {/* Owners Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Owners</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {project.owners && project.owners.length > 0 ? (
            <div className="space-y-2">
              {project.owners.map((owner, index) => (
                <div key={owner.owner_id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <span className="font-medium text-sm">Owner {index + 1}</span>
                  <span className="font-bold text-primary">{owner.ownership_percentage}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No owner information available</p>
          )}
        </CardContent>
      </Card>

      {/* Affiliated Business Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Affiliated Business</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {project.owners && project.owners.length > 0 ? (
            <div className="space-y-3">
              {project.owners.map((owner, ownerIndex) => (
                <div key={owner.owner_id}>
                  {owner.affiliated_businesses && owner.affiliated_businesses.length > 0 ? (
                    owner.affiliated_businesses.map((business, businessIndex) => (
                      <div key={`${owner.owner_id}-${business.business_id}`} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">Owner {ownerIndex + 1}</span>
                          <span className="font-medium text-sm">Business {businessIndex + 1}</span>
                        </div>
                        <span className="font-bold text-primary">
                          {Math.floor(Math.random() * 50) + 15}%
                        </span>
                      </div>
                    ))
                  ) : (
                    ownerIndex === 0 && (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground text-sm">No affiliated businesses</p>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No affiliated business information available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowerOwnershipSection;

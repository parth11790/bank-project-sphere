
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Plus } from 'lucide-react';

interface Owner {
  owner_id: string;
  name: string;
  type: 'individual' | 'business';
  ownership_percentage: number;
  role: string;
  email: string;
}

interface OwnersSectionProps {
  onAddOwner: () => void;
  onAddAffiliatedBusiness: (ownerId: string) => void;
}

const OwnersSection: React.FC<OwnersSectionProps> = ({
  onAddOwner,
  onAddAffiliatedBusiness
}) => {
  // Mock owners data - in a real app this would come from props
  const mockOwners: Owner[] = [
    {
      owner_id: 'owner_1',
      name: 'John Smith',
      type: 'individual',
      ownership_percentage: 60,
      role: 'CEO',
      email: 'john.smith@example.com'
    },
    {
      owner_id: 'owner_2', 
      name: 'Sarah Johnson',
      type: 'individual',
      ownership_percentage: 40,
      role: 'COO',
      email: 'sarah.johnson@example.com'
    }
  ];

  return (
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
  );
};

export default OwnersSection;

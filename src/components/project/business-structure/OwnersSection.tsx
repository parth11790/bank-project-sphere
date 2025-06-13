
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Ownership %</TableHead>
                    <TableHead>Affiliated Businesses</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOwners.map((owner) => (
                    <TableRow key={owner.owner_id}>
                      <TableCell className="font-medium">{owner.name}</TableCell>
                      <TableCell>{owner.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {owner.type === 'individual' ? 'Individual' : 'Business'}
                        </Badge>
                      </TableCell>
                      <TableCell>{owner.role}</TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {owner.ownership_percentage}%
                      </TableCell>
                      <TableCell className="text-center">0</TableCell>
                      <TableCell>
                        {owner.type === 'individual' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onAddAffiliatedBusiness(owner.owner_id)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Business
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
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


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus } from 'lucide-react';
import { Project } from '@/types/project';

interface SellersSectionProps {
  project: Project;
  onAddSeller: () => void;
}

const SellersSection: React.FC<SellersSectionProps> = ({ project, onAddSeller }) => {
  return (
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.sellers.map((seller) => (
                  <TableRow key={seller.seller_id}>
                    <TableCell className="font-medium">{seller.name}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Badge variant="outline">{seller.type}</Badge>
                    </TableCell>
                    <TableCell>Seller</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">
                      {seller.associated_businesses ? seller.associated_businesses.length : 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No sellers added</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SellersSection;

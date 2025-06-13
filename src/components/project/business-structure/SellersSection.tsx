
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
          <div className="space-y-4">
            {project.sellers.map((seller) => (
              <div key={seller.seller_id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{seller.name}</h4>
                  <Badge variant="outline">{seller.type}</Badge>
                </div>
                
                {seller.associated_businesses && seller.associated_businesses.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium mb-2">Associated Businesses:</h5>
                    <div className="space-y-2">
                      {seller.associated_businesses.map((business) => (
                        <div key={business.business_id} className="ml-4 p-2 bg-muted/50 rounded">
                          <p className="font-medium">{business.name}</p>
                          <p className="text-sm text-muted-foreground">{business.entity_type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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

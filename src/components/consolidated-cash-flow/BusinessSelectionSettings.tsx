
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, X } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  type: string;
}

interface BusinessSelectionSettingsProps {
  availableBusinesses: Business[];
  selectedBusinesses: string[];
  onSelectionChange: (businessIds: string[]) => void;
  onClose: () => void;
}

const BusinessSelectionSettings: React.FC<BusinessSelectionSettingsProps> = ({
  availableBusinesses,
  selectedBusinesses,
  onSelectionChange,
  onClose
}) => {
  const handleBusinessToggle = (businessId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedBusinesses, businessId]);
    } else {
      onSelectionChange(selectedBusinesses.filter(id => id !== businessId));
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Main Business': return 'bg-blue-100 text-blue-800';
      case 'Owner Business': return 'bg-green-100 text-green-800';
      case 'Affiliated Business': return 'bg-purple-100 text-purple-800';
      case 'Seller Business': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">Business Selection Settings</CardTitle>
          <CardDescription>
            Choose which businesses to include in the consolidated cash flow analysis
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-3">
            Selected: {selectedBusinesses.length} of {availableBusinesses.length} businesses
          </div>
          
          <div className="grid gap-3">
            {availableBusinesses.map((business) => (
              <div 
                key={business.id} 
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50"
              >
                <Checkbox
                  id={business.id}
                  checked={selectedBusinesses.includes(business.id)}
                  onCheckedChange={(checked) => 
                    handleBusinessToggle(business.id, checked as boolean)
                  }
                />
                <div className="flex items-center gap-2 flex-1">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <label 
                      htmlFor={business.id} 
                      className="text-sm font-medium cursor-pointer"
                    >
                      {business.name}
                    </label>
                  </div>
                  <Badge className={`text-xs ${getTypeColor(business.type)}`}>
                    {business.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => onSelectionChange([])}
              disabled={selectedBusinesses.length === 0}
            >
              Clear All
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onSelectionChange(availableBusinesses.map(b => b.id))}
              disabled={selectedBusinesses.length === availableBusinesses.length}
            >
              Select All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessSelectionSettings;

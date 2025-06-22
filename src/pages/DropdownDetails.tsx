
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Lock, Plus, MoreVertical, Eye, EyeOff } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sbaDropdownFields, CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { toast } from 'sonner';

interface DropdownOption {
  id: string;
  value: string;
  status: 'active' | 'inactive';
  dateCreated: string;
  dateModified: string;
  modifiedBy: string;
}

const DropdownDetails = () => {
  const { dropdownId } = useParams<{ dropdownId: string }>();
  const navigate = useNavigate();
  
  // Find the dropdown field
  const dropdownField = useMemo(() => {
    return sbaDropdownFields.find(field => field.id === dropdownId);
  }, [dropdownId]);

  // Initialize dropdown options with mock data
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>(() => {
    if (!dropdownField) return [];
    
    return dropdownField.initialValues.map((value, index) => ({
      id: `${dropdownId}_${index}`,
      value,
      status: Math.random() > 0.1 ? 'active' : 'inactive' as 'active' | 'inactive',
      dateCreated: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      dateModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      modifiedBy: ['John Smith', 'Sarah Johnson', 'Michael Brown', 'System'][Math.floor(Math.random() * 4)]
    }));
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [newOptionValue, setNewOptionValue] = useState('');

  // Filter options
  const filteredOptions = useMemo(() => {
    return dropdownOptions.filter(option => {
      const matchesSearch = option.value.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesStatus = statusFilter === 'all' || option.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [dropdownOptions, searchFilter, statusFilter]);

  // Handle option status toggle
  const handleToggleStatus = (optionId: string) => {
    setDropdownOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { 
              ...option, 
              status: option.status === 'active' ? 'inactive' : 'active',
              dateModified: new Date().toISOString(),
              modifiedBy: 'Current User'
            }
          : option
      )
    );
    toast.success('Option status updated');
  };

  // Handle adding new option
  const handleAddOption = () => {
    if (!newOptionValue.trim()) {
      toast.error('Please enter a value for the new option');
      return;
    }

    if (dropdownOptions.some(option => option.value.toLowerCase() === newOptionValue.toLowerCase())) {
      toast.error('This option already exists');
      return;
    }

    const newOption: DropdownOption = {
      id: `${dropdownId}_${Date.now()}`,
      value: newOptionValue.trim(),
      status: 'active',
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      modifiedBy: 'Current User'
    };

    setDropdownOptions(prev => [...prev, newOption]);
    setNewOptionValue('');
    toast.success('New option added successfully');
  };

  if (!dropdownField) {
    return (
      <Layout>
        <div className="container mx-auto py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Dropdown Not Found</h1>
            <p className="text-muted-foreground mb-4">The requested dropdown could not be found.</p>
            <Button onClick={() => navigate('/admin-settings')}>
              Back to Admin Settings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const isRestricted = dropdownField.customizationLevel === 'SBA Defined';
  const activeCount = dropdownOptions.filter(opt => opt.status === 'active').length;
  const inactiveCount = dropdownOptions.filter(opt => opt.status === 'inactive').length;

  const getBadgeColor = (level: CustomizationLevel) => {
    switch (level) {
      case 'SBA Defined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Lender Customizable':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin-settings')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{dropdownField.label}</h1>
              <p className="text-muted-foreground">{dropdownField.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{dropdownField.module}</Badge>
            <Badge className={getBadgeColor(dropdownField.customizationLevel)}>
              {dropdownField.customizationLevel}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Restriction Alert */}
        {isRestricted && (
          <Alert variant="destructive">
            <Lock className="h-4 w-4" />
            <AlertTitle>SBA Defined Dropdown</AlertTitle>
            <AlertDescription>
              This dropdown is defined by SBA Standard Operating Procedures and cannot be modified.
              You can view the options but cannot add, edit, or change their status.
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dropdownOptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inactive Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customization Level</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={getBadgeColor(dropdownField.customizationLevel)}>
                {dropdownField.customizationLevel}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search options..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-64"
            />
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button
              variant={statusFilter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={statusFilter === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
            </Button>
          </div>

          {!isRestricted && (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add new option..."
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
                className="w-48"
                onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
              />
              <Button onClick={handleAddOption} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          )}
        </div>

        {/* Options Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Option Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Modified By</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.value}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={option.status === 'active' ? 'default' : 'secondary'}
                      className={option.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}
                    >
                      {option.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(option.dateCreated).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(option.dateModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{option.modifiedBy}</TableCell>
                  <TableCell>
                    {!isRestricted && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleToggleStatus(option.id)}>
                            {option.status === 'active' ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOptions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No options found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DropdownDetails;

import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings, FileText, Search, Filter, ExternalLink, TrendingUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sbaDropdownFields, CustomizationLevel } from '@/lib/mockData/dropdownFields';
import { useQuery } from '@tanstack/react-query';
import { getFormTemplatesData } from '@/lib/mockDataServices/formService';
import { FormTemplate } from '@/types/form';
import { toast } from 'sonner';
import { InterestRatesManager } from '@/components/admin/InterestRatesManager';
import { SectionConfigurationManager } from '@/components/admin/SectionConfigurationManager';

const AdminSettings = () => {
  const navigate = useNavigate();
  
  // Dropdown filters
  const [dropdownNameFilter, setDropdownNameFilter] = useState('');
  const [dropdownModuleFilter, setDropdownModuleFilter] = useState<string>('all');
  const [customizationLevelFilter, setCustomizationLevelFilter] = useState<string>('all');
  
  // Form filters
  const [formNameFilter, setFormNameFilter] = useState('');
  const [formEntityFilter, setFormEntityFilter] = useState<string>('all');
  const [formStatusFilter, setFormStatusFilter] = useState<string>('all');
  
  // Form status state
  const [formStatuses, setFormStatuses] = useState<Record<string, 'active' | 'inactive'>>({});

  // Fetch forms data
  const { data: individualFormsData = [] } = useQuery({
    queryKey: ['admin-forms', 'individual'],
    queryFn: () => getFormTemplatesData('individual'),
  });

  const { data: businessFormsData = [] } = useQuery({
    queryKey: ['admin-forms', 'business'],
    queryFn: () => getFormTemplatesData('business'),
  });

  // Combine all forms with admin status
  const allForms = useMemo(() => {
    const combined = [...individualFormsData, ...businessFormsData];
    return combined.map(form => ({
      ...form,
      adminStatus: formStatuses[form.form_id] || 'active' as 'active' | 'inactive'
    }));
  }, [individualFormsData, businessFormsData, formStatuses]);

  // Get unique modules for dropdown filter
  const dropdownModules = useMemo(() => {
    const modules = new Set(sbaDropdownFields.map(field => field.module));
    return Array.from(modules).sort();
  }, []);

  // Filter dropdowns
  const filteredDropdowns = useMemo(() => {
    return sbaDropdownFields.filter(dropdown => {
      const nameMatch = dropdown.label.toLowerCase().includes(dropdownNameFilter.toLowerCase());
      const moduleMatch = dropdownModuleFilter === 'all' || dropdown.module === dropdownModuleFilter;
      const levelMatch = customizationLevelFilter === 'all' || dropdown.customizationLevel === customizationLevelFilter;
      return nameMatch && moduleMatch && levelMatch;
    });
  }, [dropdownNameFilter, dropdownModuleFilter, customizationLevelFilter]);

  // Filter forms
  const filteredForms = useMemo(() => {
    return allForms.filter(form => {
      const nameMatch = form.name.toLowerCase().includes(formNameFilter.toLowerCase());
      const entityMatch = formEntityFilter === 'all' || form.entity_type === formEntityFilter;
      const statusMatch = formStatusFilter === 'all' || form.adminStatus === formStatusFilter;
      return nameMatch && entityMatch && statusMatch;
    });
  }, [allForms, formNameFilter, formEntityFilter, formStatusFilter]);

  const handleToggleFormStatus = (formId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setFormStatuses(prev => ({
      ...prev,
      [formId]: newStatus
    }));
    toast.success(`Form status changed to ${newStatus}`);
    console.log(`[AUDIT] Form status changed: ${formId} from ${currentStatus} to ${newStatus} by admin at ${new Date().toISOString()}`);
  };

  const getCustomizationBadgeColor = (level: CustomizationLevel) => {
    switch (level) {
      case 'SBA Defined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Lender Customizable':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Handle dropdown row click
  const handleDropdownRowClick = (dropdownId: string) => {
    navigate(`/admin-settings/dropdown/${dropdownId}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Admin Settings</h1>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <Tabs defaultValue="dropdowns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dropdowns" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Dropdown Values
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Forms
            </TabsTrigger>
            <TabsTrigger value="sections" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Section Configuration
            </TabsTrigger>
            <TabsTrigger value="interest-rates" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Interest Rates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dropdowns" className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Dropdown Values Management</h2>
              <p className="text-muted-foreground">
                Manage the values available in various dropdown menus throughout the application. Click on any row to view detailed options.
              </p>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <div className="flex items-center gap-2">
                        Dropdown Name
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Filter names..."
                            value={dropdownNameFilter}
                            onChange={(e) => setDropdownNameFilter(e.target.value)}
                            className="pl-8 h-8 w-40"
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Module
                        <Select value={dropdownModuleFilter} onValueChange={setDropdownModuleFilter}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Modules</SelectItem>
                            {dropdownModules.map(module => (
                              <SelectItem key={module} value={module}>{module}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Customization Level
                        <Select value={customizationLevelFilter} onValueChange={setCustomizationLevelFilter}>
                          <SelectTrigger className="h-8 w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="SBA Defined">SBA Defined</SelectItem>
                            <SelectItem value="Lender Customizable">Lender Customizable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Values Count</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDropdowns.map((dropdown) => (
                    <TableRow 
                      key={dropdown.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleDropdownRowClick(dropdown.id)}
                    >
                      <TableCell className="font-medium">{dropdown.label}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{dropdown.module}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getCustomizationBadgeColor(dropdown.customizationLevel)}
                        >
                          {dropdown.customizationLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                        {dropdown.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{dropdown.initialValues.length}</Badge>
                      </TableCell>
                      <TableCell>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="forms" className="space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Forms Management</h2>
              <p className="text-muted-foreground">
                Manage form availability across the system. Toggle status to control whether forms can be assigned to participants.
              </p>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <div className="flex items-center gap-2">
                        Form Name
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Filter forms..."
                            value={formNameFilter}
                            onChange={(e) => setFormNameFilter(e.target.value)}
                            className="pl-8 h-8 w-40"
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead>Form ID</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Entity Type
                        <Select value={formEntityFilter} onValueChange={setFormEntityFilter}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Status
                        <Select value={formStatusFilter} onValueChange={setFormStatusFilter}>
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.form_id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          {form.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {form.form_id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {form.entity_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={form.adminStatus === 'active' ? 'default' : 'secondary'}
                          className={form.adminStatus === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}
                        >
                          {form.adminStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFormStatus(form.form_id, form.adminStatus)}
                        >
                          Toggle Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <SectionConfigurationManager />
          </TabsContent>

          <TabsContent value="interest-rates" className="space-y-6">
            <InterestRatesManager />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminSettings;

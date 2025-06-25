
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Eye, EyeOff, Plus, Settings2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { sectionConfigurations, SectionConfiguration, FieldConfiguration } from '@/lib/mockData/sectionConfiguration';
import { toast } from 'sonner';

export const SectionConfigurationManager: React.FC = () => {
  const [sections, setSections] = useState<SectionConfiguration[]>(sectionConfigurations);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Filter sections
  const filteredSections = useMemo(() => {
    return sections.filter(section => {
      const nameMatch = section.name.toLowerCase().includes(searchFilter.toLowerCase());
      const categoryMatch = categoryFilter === 'all' || section.category === categoryFilter;
      return nameMatch && categoryMatch;
    });
  }, [sections, searchFilter, categoryFilter]);

  const handleSectionVisibilityToggle = (sectionId: string, visible: boolean) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, visible } : section
    ));
    toast.success(`Section visibility ${visible ? 'enabled' : 'disabled'}`);
    console.log(`[AUDIT] Section visibility changed: ${sectionId} to ${visible} at ${new Date().toISOString()}`);
  };

  const handleFieldVisibilityToggle = (sectionId: string, fieldId: string, visible: boolean) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            fields: section.fields.map(field => 
              field.id === fieldId ? { ...field, visible } : field
            )
          }
        : section
    ));
    toast.success(`Field visibility ${visible ? 'enabled' : 'disabled'}`);
    console.log(`[AUDIT] Field visibility changed: ${sectionId}.${fieldId} to ${visible} at ${new Date().toISOString()}`);
  };

  const handleFieldRequiredToggle = (sectionId: string, fieldId: string, required: boolean) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            fields: section.fields.map(field => 
              field.id === fieldId ? { ...field, required } : field
            )
          }
        : section
    ));
    toast.success(`Field requirement ${required ? 'enabled' : 'disabled'}`);
    console.log(`[AUDIT] Field requirement changed: ${sectionId}.${fieldId} to ${required} at ${new Date().toISOString()}`);
  };

  const getFieldTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      text: 'bg-blue-100 text-blue-800',
      email: 'bg-green-100 text-green-800',
      phone: 'bg-purple-100 text-purple-800',
      select: 'bg-orange-100 text-orange-800',
      textarea: 'bg-yellow-100 text-yellow-800',
      date: 'bg-pink-100 text-pink-800',
      number: 'bg-indigo-100 text-indigo-800',
      checkbox: 'bg-teal-100 text-teal-800',
      radio: 'bg-red-100 text-red-800',
      file: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Section Configuration</h2>
        <p className="text-muted-foreground">
          Configure sections and fields for both individual and business forms. Control visibility, requirements, and field properties.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sections..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {/* Sections Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Fields Count</TableHead>
              <TableHead>Visible</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSections.map((section) => (
              <React.Fragment key={section.id}>
                <TableRow 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleSectionExpansion(section.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-primary" />
                      {section.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="text-sm text-muted-foreground truncate">
                      {section.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {section.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {section.fields.length}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={section.visible}
                      onCheckedChange={(checked) => handleSectionVisibilityToggle(section.id, checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>{section.order}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                {/* Expanded Fields */}
                {expandedSection === section.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-4 bg-muted/20 border-t">
                        <h4 className="font-medium mb-3">Fields Configuration</h4>
                        <div className="space-y-3">
                          {section.fields.map((field) => (
                            <div key={field.id} className="flex items-center justify-between p-3 bg-background rounded border">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex-1">
                                  <div className="font-medium">{field.label}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Field Name: {field.name}
                                  </div>
                                </div>
                                <Badge className={getFieldTypeColor(field.type)}>
                                  {field.type}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Required</span>
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) => handleFieldRequiredToggle(section.id, field.id, checked)}
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Visible</span>
                                  <Switch
                                    checked={field.visible}
                                    onCheckedChange={(checked) => handleFieldVisibilityToggle(section.id, field.id, checked)}
                                  />
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Field
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sections.length}</div>
            <div className="text-sm text-muted-foreground">Total Sections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {sections.filter(s => s.category === 'individual').length}
            </div>
            <div className="text-sm text-muted-foreground">Individual Sections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {sections.filter(s => s.category === 'business').length}
            </div>
            <div className="text-sm text-muted-foreground">Business Sections</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {sections.reduce((acc, section) => acc + section.fields.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Fields</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

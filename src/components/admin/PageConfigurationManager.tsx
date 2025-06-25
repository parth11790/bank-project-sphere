
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Plus, FileText, Settings2, Check, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { pageConfigurations, PageConfiguration } from '@/lib/mockData/pageConfiguration';
import { sectionConfigurations } from '@/lib/mockData/sectionConfiguration';
import { toast } from 'sonner';

export const PageConfigurationManager: React.FC = () => {
  const [pages, setPages] = useState<PageConfiguration[]>(pageConfigurations);
  const [searchFilter, setSearchFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [editingPage, setEditingPage] = useState<PageConfiguration | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter pages
  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const nameMatch = page.name.toLowerCase().includes(searchFilter.toLowerCase());
      const entityMatch = entityFilter === 'all' || page.entityType === entityFilter;
      return nameMatch && entityMatch;
    });
  }, [pages, searchFilter, entityFilter]);

  // Get available sections for a page based on entity type
  const getAvailableSections = (entityType: 'individual' | 'business' | 'both') => {
    return sectionConfigurations.filter(section => 
      section.category === entityType || section.category === 'both'
    );
  };

  const handleEditPage = (page: PageConfiguration) => {
    setEditingPage({ ...page });
    setIsEditDialogOpen(true);
  };

  const handleSavePageEdit = () => {
    if (!editingPage) return;

    setPages(prev => prev.map(page => 
      page.id === editingPage.id ? editingPage : page
    ));

    toast.success('Page configuration updated successfully');
    console.log(`[AUDIT] Page configuration updated: ${editingPage.id} at ${new Date().toISOString()}`);
    setIsEditDialogOpen(false);
    setEditingPage(null);
  };

  const toggleSectionAssignment = (sectionId: string) => {
    if (!editingPage) return;

    const isAssigned = editingPage.assignedSections.includes(sectionId);
    const updatedSections = isAssigned
      ? editingPage.assignedSections.filter(id => id !== sectionId)
      : [...editingPage.assignedSections, sectionId];

    setEditingPage({
      ...editingPage,
      assignedSections: updatedSections
    });
  };

  const getSectionName = (sectionId: string) => {
    const section = sectionConfigurations.find(s => s.id === sectionId);
    return section?.name || sectionId;
  };

  const getEntityTypeColor = (entityType: string) => {
    switch (entityType) {
      case 'individual':
        return 'bg-blue-100 text-blue-800';
      case 'business':
        return 'bg-green-100 text-green-800';
      case 'both':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Page Configuration</h2>
        <p className="text-muted-foreground">
          Configure which sections appear on each page type. Assign and remove sections to customize the user experience for different participant types.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={entityFilter} onValueChange={setEntityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Entity Types</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Pages Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Entity Type</TableHead>
              <TableHead>Sections Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {page.name}
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <p className="text-sm text-muted-foreground truncate">
                    {page.description}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getEntityTypeColor(page.entityType)}>
                    {page.entityType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {page.assignedSections.length}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={page.exists ? 'default' : 'secondary'}>
                    {page.exists ? 'Exists' : 'To Be Created'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {page.route}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditPage(page)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page Configuration</DialogTitle>
            <DialogDescription>
              Assign or remove sections for this page type.
            </DialogDescription>
          </DialogHeader>
          
          {editingPage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/20 rounded">
                <div>
                  <label className="text-sm font-medium">Page Name</label>
                  <p className="text-sm text-muted-foreground">{editingPage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Entity Type</label>
                  <Badge variant="outline" className={getEntityTypeColor(editingPage.entityType)}>
                    {editingPage.entityType}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Available Sections</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getAvailableSections(editingPage.entityType).map((section) => {
                    const isAssigned = editingPage.assignedSections.includes(section.id);
                    return (
                      <div 
                        key={section.id} 
                        className="flex items-center justify-between p-3 border rounded hover:bg-muted/20"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{section.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {section.description}
                          </div>
                        </div>
                        <Button
                          variant={isAssigned ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSectionAssignment(section.id)}
                        >
                          {isAssigned ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Assigned
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Assign
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Currently Assigned Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {editingPage.assignedSections.map((sectionId) => (
                    <Badge key={sectionId} variant="secondary" className="flex items-center gap-1">
                      {getSectionName(sectionId)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => toggleSectionAssignment(sectionId)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePageEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{pages.length}</div>
            <div className="text-sm text-muted-foreground">Total Pages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {pages.filter(p => p.exists).length}
            </div>
            <div className="text-sm text-muted-foreground">Existing Pages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {pages.filter(p => !p.exists).length}
            </div>
            <div className="text-sm text-muted-foreground">To Be Created</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {pages.reduce((acc, page) => acc + page.assignedSections.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Assignments</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React, { useState, useMemo } from 'react';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, FileText } from 'lucide-react';
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
import { EditTemplateDialog } from './EditTemplateDialog';
import { useNavigate } from 'react-router-dom';

interface DocumentGatheringTemplatesListProps {
  templates: DocumentGatheringTemplate[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<DocumentGatheringTemplate>) => void;
}

export const DocumentGatheringTemplatesList = ({
  templates,
  onDelete,
  onUpdate
}: DocumentGatheringTemplatesListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState<string>('all');
  const [editingTemplate, setEditingTemplate] = useState<DocumentGatheringTemplate | null>(null);

  // Get unique loan types for filters
  const uniqueLoanTypes = useMemo(() => {
    const types = new Set(templates.map(t => t.loanType));
    return Array.from(types).sort();
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const nameMatch = template.templateName.toLowerCase().includes(searchTerm.toLowerCase());
      const loanTypeMatch = loanTypeFilter === 'all' || template.loanType === loanTypeFilter;
      return nameMatch && loanTypeMatch;
    });
  }, [templates, searchTerm, loanTypeFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalFormsCount = (template: DocumentGatheringTemplate) => {
    return Object.values(template.participantForms).reduce((total, forms) => total + forms.length, 0);
  };

  const handleToggleStatus = (template: DocumentGatheringTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(template.id, { isActive: !template.isActive });
  };

  const handleEdit = (template: DocumentGatheringTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTemplate(template);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleRowClick = (templateId: string) => {
    navigate(`/lender-settings/template/${templateId}`);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={loanTypeFilter} onValueChange={setLoanTypeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by loan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Loan Types</SelectItem>
            {uniqueLoanTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template Name</TableHead>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount Range</TableHead>
              <TableHead>Total Forms</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow 
                key={template.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(template.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {template.templateName}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{template.loanType}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatCurrency(template.amountMin)} - {formatCurrency(template.amountMax)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {getTotalFormsCount(template)} forms
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleToggleStatus(template, e)}
                  >
                    <Badge 
                      variant={template.isActive ? 'default' : 'secondary'}
                      className={template.isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}
                    >
                      {template.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEdit(template, e)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(template.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No templates found matching your criteria.
        </div>
      )}

      <EditTemplateDialog
        template={editingTemplate}
        open={!!editingTemplate}
        onOpenChange={(open) => !open && setEditingTemplate(null)}
        onUpdate={(updates) => {
          if (editingTemplate) {
            onUpdate(editingTemplate.id, updates);
            setEditingTemplate(null);
          }
        }}
      />
    </div>
  );
};

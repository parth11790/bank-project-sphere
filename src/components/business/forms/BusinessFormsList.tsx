
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessFormsListProps {
  forms: any[];
  isEditing: boolean;
  onFormClick: (formId: string, formName: string) => void;
  onStatusUpdate: (formId: string, newStatus: string) => void;
}

const BusinessFormsList: React.FC<BusinessFormsListProps> = ({
  forms,
  isEditing,
  onFormClick,
  onStatusUpdate
}) => {
  const getStatusIcon = (status: string | undefined) => {
    if (!status) {
      return <FileText className="h-3.5 w-3.5 text-gray-600" />;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
      case 'submitted':
        return <CheckCircle className="h-3.5 w-3.5 text-green-600 dark:text-green-500" />;
      case 'in_progress':
        return <Clock className="h-3.5 w-3.5 text-orange-500" />;
      case 'pending':
        return <AlertCircle className="h-3.5 w-3.5 text-red-600" />;
      default:
        return <FileText className="h-3.5 w-3.5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return <Badge variant="outline" className="text-xs px-2 py-0">Not Started</Badge>;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
      case 'submitted':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400"
            )}
          >
            Submitted
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400"
            )}
          >
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs px-2 py-0",
              "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
            )}
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-xs px-2 py-0">Not Started</Badge>;
    }
  };

  return (
    <div className="grid gap-2">
      {forms.map((form: any) => (
        <div 
          key={form.form_id} 
          className={cn(
            "flex items-center justify-between p-2 rounded-md transition-colors",
            !isEditing && "cursor-pointer hover:bg-muted/80",
            form.status === 'completed' || form.status === 'submitted' ? 'bg-green-50 dark:bg-green-950/30' : 'bg-muted'
          )}
          onClick={() => onFormClick(form.form_id, form.name)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getStatusIcon(form.status)}
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium truncate block">{form.name}</span>
              <span className="text-xs text-muted-foreground">ID: {form.form_id}</span>
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            {isEditing ? (
              <Select 
                value={form.status || 'not_started'} 
                onValueChange={(value) => onStatusUpdate(form.form_id, value)}
              >
                <SelectTrigger className="h-7 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              getStatusBadge(form.status)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessFormsList;

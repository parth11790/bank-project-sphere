
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Form {
  form_id: string;
  name: string;
  status?: 'submitted' | 'pending';
}

interface FormsListProps {
  title: string;
  forms: Form[];
  onAssign: () => void;
  onFormClick: (formId: string, formName: string) => void;
}

const FormsList: React.FC<FormsListProps> = ({
  title,
  forms,
  onAssign,
  onFormClick,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{title}</h3>
        <Button variant="outline" size="sm" onClick={onAssign}>
          <Plus className="h-3 w-3 mr-1" />
          Assign
        </Button>
      </div>
      {forms.length === 0 ? (
        <p className="text-sm text-muted-foreground">No forms assigned</p>
      ) : (
        <div className="grid gap-2">
          {forms.map(form => (
            <div 
              key={form.form_id} 
              className={cn(
                "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted/80",
                form.status === 'submitted' ? 'bg-green-50 dark:bg-green-950/30' : 'bg-muted'
              )}
              onClick={() => onFormClick(form.form_id, form.name)}
            >
              <div className="flex items-center">
                {form.status === 'submitted' ? (
                  <ClipboardCheck className="h-3.5 w-3.5 mr-2 text-green-600 dark:text-green-500" />
                ) : (
                  <Clock className="h-3.5 w-3.5 mr-2 text-orange-500" />
                )}
                <span className="text-sm">{form.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    form.status === 'submitted' 
                      ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400' 
                      : 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-400'
                  )}
                >
                  {form.status === 'submitted' ? 'Submitted' : 'Pending'}
                </Badge>
                <Button size="sm" variant="ghost" className="h-7 px-2">
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsList;

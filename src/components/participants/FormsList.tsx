
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, Plus, ArrowRight } from 'lucide-react';

interface Form {
  form_id: string;
  name: string;
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
              className="flex items-center justify-between p-2 bg-muted rounded-md cursor-pointer hover:bg-muted/80"
              onClick={() => onFormClick(form.form_id, form.name)}
            >
              <div className="flex items-center">
                <ClipboardCheck className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                <span className="text-sm">{form.name}</span>
              </div>
              <Button size="sm" variant="ghost" className="h-7 px-2">
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormsList;

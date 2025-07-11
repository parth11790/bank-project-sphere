import React from 'react';
import { CheckCircle, Clock, FileText, User, Building, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface FormGroup {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  forms: AssignedForm[];
}

interface AssignedForm {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  entity_type: 'individual' | 'business';
  due_date?: string;
  category: string;
}

interface BorrowerFormsSidebarProps {
  forms: AssignedForm[];
  onFormClick: (form: AssignedForm) => void;
}

const BorrowerFormsSidebar: React.FC<BorrowerFormsSidebarProps> = ({
  forms,
  onFormClick
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500 text-xs">Done</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-yellow-500 text-xs">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };

  // Group forms by category
  const groupedForms: FormGroup[] = [
    {
      category: 'Business Information',
      icon: Building,
      forms: forms.filter(f => f.category === 'business')
    },
    {
      category: 'Personal Information',
      icon: User,
      forms: forms.filter(f => f.category === 'personal')
    },
    {
      category: 'Financial Documents',
      icon: FileText,
      forms: forms.filter(f => f.category === 'financial')
    }
  ];

  return (
    <div className="w-80 border-l bg-muted/30 h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-sm">Required Forms</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Complete all forms to proceed
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-6">
          {groupedForms.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-3">
                <group.icon className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">{group.category}</h4>
              </div>
              
              <div className="space-y-2">
                {group.forms.map((form) => (
                  <div
                    key={form.id}
                    className="p-3 rounded-lg border bg-background hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onFormClick(form)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        {getStatusIcon(form.status)}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm truncate">{form.name}</h5>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {form.description}
                          </p>
                          {form.due_date && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                              <Calendar className="h-3 w-3" />
                              Due: {new Date(form.due_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(form.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {group !== groupedForms[groupedForms.length - 1] && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BorrowerFormsSidebar;
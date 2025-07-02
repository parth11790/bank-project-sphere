
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormHeaderProps {
  formName: string;
  participantName: string;
  onSubmit: () => void;
  hideSubmitButton?: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  formName, 
  participantName, 
  onSubmit,
  hideSubmitButton = false
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{formName}</h1>
          <p className="text-sm text-muted-foreground">Participant: {participantName}</p>
        </div>
        {!hideSubmitButton && (
          <Button onClick={onSubmit} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Form
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormHeader;

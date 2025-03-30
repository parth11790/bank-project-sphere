
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormHeaderProps {
  formName: string;
  participantName: string;
  onSubmit: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  formName, 
  participantName, 
  onSubmit 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{formName}</h1>
        <p className="text-muted-foreground">Participant: {participantName}</p>
      </div>
      <Button onClick={onSubmit}>
        <Save className="h-4 w-4 mr-2" />
        Save Form
      </Button>
    </div>
  );
};

export default FormHeader;

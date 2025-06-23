
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface FormFooterProps {
  shouldShow: boolean;
  onSubmit: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({
  shouldShow,
  onSubmit
}) => {
  if (!shouldShow) return null;

  return (
    <CardFooter className="flex justify-end">
      <Button onClick={onSubmit}>
        <Save className="h-4 w-4 mr-2" />
        Save Form
      </Button>
    </CardFooter>
  );
};

export default FormFooter;


import React from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertIcon } from './AlertIcon';
import { getAlertClass, getAlertVariant } from './alertStyles';
import { AlertItem as AlertItemType } from './types';

interface AlertItemProps {
  alert: AlertItemType;
  onRemove: (id: string) => void;
}

export const AlertItemComponent: React.FC<AlertItemProps> = ({
  alert,
  onRemove
}) => {
  return (
    <Alert
      variant={getAlertVariant(alert.severity)}
      className={`${getAlertClass(alert.severity)} pr-10 relative`}
    >
      <AlertIcon severity={alert.severity} />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
        onClick={() => onRemove(alert.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      {alert.actions && (
        <div className="flex gap-2 mt-2">
          {alert.actions}
        </div>
      )}
    </Alert>
  );
};

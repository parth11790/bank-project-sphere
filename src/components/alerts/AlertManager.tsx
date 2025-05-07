
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useAlerts } from './AlertContext';
import { AlertSeverity } from './types';

const getAlertIcon = (severity: AlertSeverity) => {
  switch (severity) {
    case 'error':
      <AlertTriangle className="h-4 w-4" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'info':
      return <Info className="h-4 w-4" />;
    case 'success':
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getAlertVariant = (severity: AlertSeverity) => {
  switch (severity) {
    case 'error':
      return 'destructive';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    case 'success':
      return 'success';
    default:
      return 'default';
  }
};

const getAlertClass = (severity: AlertSeverity) => {
  switch (severity) {
    case 'error':
      return 'bg-red-50';
    case 'warning':
      return 'bg-amber-50 border-amber-200';
    case 'info':
      return 'bg-blue-50 border-blue-200';
    case 'success':
      return 'bg-green-50 border-green-200';
    default:
      return '';
  }
};

interface AlertManagerProps {
  position?: 'top' | 'bottom';
  alignment?: 'left' | 'center' | 'right';
  maxAlerts?: number;
  className?: string;
}

export const AlertManager: React.FC<AlertManagerProps> = ({
  position = 'top',
  alignment = 'center',
  maxAlerts = 5,
  className = '',
}) => {
  const { alerts, removeAlert } = useAlerts();
  
  // Only show the most recent maxAlerts
  const visibleAlerts = alerts.slice(-maxAlerts);

  // Get position classes based on props
  const getPositionClasses = () => {
    const posClasses = position === 'top' ? 'top-4' : 'bottom-4';
    let alignClasses = 'left-1/2 transform -translate-x-1/2'; // Default center
    
    if (alignment === 'left') {
      alignClasses = 'left-4';
    } else if (alignment === 'right') {
      alignClasses = 'right-4';
    }
    
    return `fixed z-50 ${posClasses} ${alignClasses}`;
  };

  if (alerts.length === 0) return null;

  return (
    <div className={`${getPositionClasses()} flex flex-col gap-2 w-full max-w-md ${className}`}>
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Alert
              variant={getAlertVariant(alert.severity)}
              className={`${getAlertClass(alert.severity)} pr-10 relative`}
            >
              {getAlertIcon(alert.severity)}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                onClick={() => removeAlert(alert.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {alert.actions && (
                <div className="flex gap-2 mt-2">
                  {alert.actions}
                </div>
              )}
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

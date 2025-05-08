
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAlerts } from './AlertContext';
import { AlertItemComponent } from './AlertItem';

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
            <AlertItemComponent alert={alert} onRemove={removeAlert} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

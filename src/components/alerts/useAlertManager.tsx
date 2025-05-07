
import { useAlerts } from './AlertContext';
import { AlertSeverity } from './types';

export const useAlertManager = () => {
  const { addAlert, removeAlert, clearAlerts } = useAlerts();

  const showAlert = (
    title: string,
    description: string,
    severity: AlertSeverity,
    options?: {
      autoClose?: boolean;
      timeout?: number;
      actions?: React.ReactNode;
    }
  ) => {
    return addAlert({
      title,
      description,
      severity,
      ...options
    });
  };

  // Helper methods for common alert types
  const showError = (title: string, description: string, options?: any) => 
    showAlert(title, description, 'error', options);
    
  const showWarning = (title: string, description: string, options?: any) => 
    showAlert(title, description, 'warning', options);
  
  const showInfo = (title: string, description: string, options?: any) => 
    showAlert(title, description, 'info', options);
    
  const showSuccess = (title: string, description: string, options?: any) => 
    showAlert(title, description, 'success', options);

  return {
    showAlert,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    removeAlert,
    clearAlerts,
  };
};

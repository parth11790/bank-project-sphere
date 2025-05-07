
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAlertManager } from './useAlertManager';

export const AlertExample: React.FC = () => {
  const alerts = useAlertManager();
  
  const showSuccessAlert = () => {
    alerts.showSuccess(
      "Operation Successful", 
      "Your changes have been saved successfully."
    );
  };
  
  const showErrorAlert = () => {
    alerts.showError(
      "Operation Failed", 
      "There was an error processing your request. Please try again."
    );
  };
  
  const showWarningAlert = () => {
    alerts.showWarning(
      "Warning", 
      "This action may have unintended consequences.",
      { autoClose: false }
    );
  };
  
  const showInfoAlert = () => {
    alerts.showInfo(
      "Information", 
      "Your session will expire in 5 minutes.",
      { timeout: 10000 }
    );
  };
  
  const showAlertWithAction = () => {
    const actionButtons = (
      <>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => alerts.showInfo("Action Taken", "You clicked the action button")}
        >
          Take Action
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => alerts.clearAlerts()}
        >
          Dismiss All
        </Button>
      </>
    );
    
    alerts.showAlert(
      "Action Required", 
      "Please take action on this item.",
      "warning",
      { autoClose: false, actions: actionButtons }
    );
  };
  
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={showSuccessAlert} variant="default">Success Alert</Button>
      <Button onClick={showErrorAlert} variant="destructive">Error Alert</Button>
      <Button onClick={showWarningAlert} variant="outline">Warning Alert</Button>
      <Button onClick={showInfoAlert} variant="secondary">Info Alert</Button>
      <Button onClick={showAlertWithAction} variant="outline">Alert with Action</Button>
    </div>
  );
};

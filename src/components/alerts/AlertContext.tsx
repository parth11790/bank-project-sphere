
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlertItem, AlertContextType } from './types';

// Create the context with default values
const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => '',
  removeAlert: () => {},
  clearAlerts: () => {},
});

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // Add a new alert and return its ID
  const addAlert = (alert: Omit<AlertItem, 'id'>): string => {
    const id = uuidv4();
    const newAlert: AlertItem = { 
      ...alert, 
      id,
      autoClose: alert.autoClose ?? true,
      timeout: alert.timeout ?? 5000 // default timeout of 5 seconds
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto-remove the alert after timeout if autoClose is true
    if (newAlert.autoClose) {
      setTimeout(() => {
        removeAlert(id);
      }, newAlert.timeout);
    }

    return id;
  };

  // Remove a specific alert by ID
  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Clear all alerts
  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlerts = () => useContext(AlertContext);

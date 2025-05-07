
export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  autoClose?: boolean;
  timeout?: number;
  actions?: React.ReactNode;
}

export interface AlertContextType {
  alerts: AlertItem[];
  addAlert: (alert: Omit<AlertItem, 'id'>) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

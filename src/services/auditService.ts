
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName?: string;
  projectId?: string;
  participantId?: string;
  businessId?: string;
  action: string;
  category: 'form' | 'assignment' | 'document' | 'participant' | 'business' | 'admin' | 'navigation';
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

// Mock audit logs storage - in a real app, this would be stored in a database
let auditLogs: AuditLogEntry[] = [
  {
    id: 'audit_001',
    timestamp: '2024-01-15T10:30:00Z',
    userId: 'user_001',
    userName: 'John Smith',
    projectId: 'proj_001',
    action: 'form_submitted',
    category: 'form',
    details: {
      formType: 'tax_returns',
      participantId: 'part_001',
      formId: 'tax_001'
    }
  },
  {
    id: 'audit_002',
    timestamp: '2024-01-15T11:15:00Z',
    userId: 'admin_001',
    userName: 'Admin User',
    action: 'form_status_changed',
    category: 'admin',
    details: {
      formId: 'personal_financial_001',
      oldStatus: 'active',
      newStatus: 'inactive'
    }
  },
  {
    id: 'audit_003',
    timestamp: '2024-01-15T14:22:00Z',
    userId: 'user_002',
    userName: 'Jane Doe',
    projectId: 'proj_002',
    participantId: 'part_003',
    action: 'form_assigned',
    category: 'assignment',
    details: {
      formType: 'debt_summary',
      assignedTo: 'buyer',
      formId: 'debt_001'
    }
  },
  {
    id: 'audit_004',
    timestamp: '2024-01-15T16:45:00Z',
    userId: 'user_001',
    userName: 'John Smith',
    projectId: 'proj_001',
    action: 'document_uploaded',
    category: 'document',
    details: {
      documentType: 'balance_sheet',
      fileName: 'Q4_2023_Balance_Sheet.pdf',
      fileSize: '2.4MB'
    }
  }
];

export const logAuditEvent = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
  const auditEntry: AuditLogEntry = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };
  
  auditLogs.unshift(auditEntry);
  console.log('[AUDIT LOG]', auditEntry);
  
  // In a real app, this would send to the backend
  return auditEntry;
};

export const getAuditLogs = (filters?: {
  projectId?: string;
  userId?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}): AuditLogEntry[] => {
  let filteredLogs = [...auditLogs];
  
  if (filters?.projectId) {
    filteredLogs = filteredLogs.filter(log => log.projectId === filters.projectId);
  }
  
  if (filters?.userId) {
    filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
  }
  
  if (filters?.category) {
    filteredLogs = filteredLogs.filter(log => log.category === filters.category);
  }
  
  if (filters?.dateFrom) {
    filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.dateFrom!);
  }
  
  if (filters?.dateTo) {
    filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.dateTo!);
  }
  
  return filteredLogs.slice(0, filters?.limit || 100);
};

export const getProjectAuditSummary = (projectId: string) => {
  const projectLogs = getAuditLogs({ projectId });
  
  const summary = {
    totalActions: projectLogs.length,
    recentActions: projectLogs.slice(0, 10),
    actionsByCategory: projectLogs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    uniqueUsers: new Set(projectLogs.map(log => log.userId)).size,
    lastActivity: projectLogs[0]?.timestamp
  };
  
  return summary;
};

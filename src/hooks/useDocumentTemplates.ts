
import { useState } from 'react';
import { DocumentGatheringTemplate } from '@/types/documentTemplate';
import { toast } from 'sonner';

// Mock initial data
const initialTemplates: DocumentGatheringTemplate[] = [
  {
    id: '1',
    templateName: 'SBA 7(a) Standard - Small Loan',
    loanType: 'SBA 7(a)',
    amountMin: 50000,
    amountMax: 500000,
    participant: 'borrowing_business',
    forms: ['Personal Financial Statement', 'Business Financial Statement', 'Tax Returns'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'John Smith',
    isActive: true
  },
  {
    id: '2',
    templateName: 'SBA 7(a) Standard - Large Loan',
    loanType: 'SBA 7(a)',
    amountMin: 500001,
    amountMax: 5000000,
    participant: 'borrowing_business',
    forms: ['Personal Financial Statement', 'Business Financial Statement', 'Tax Returns', 'Business Plan'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'John Smith',
    isActive: true
  },
  {
    id: '3',
    templateName: 'Owner Requirements - All Loans',
    loanType: 'All Types',
    amountMin: 0,
    amountMax: 10000000,
    participant: 'owners',
    forms: ['Personal Financial Statement', 'Personal Guarantee', 'Background Check Authorization'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'Sarah Johnson',
    isActive: true
  },
  {
    id: '4',
    templateName: 'Seller Documentation - Business Sale',
    loanType: 'Business Acquisition',
    amountMin: 100000,
    amountMax: 5000000,
    participant: 'sellers',
    forms: ['Business Sale Agreement', 'Financial Statements', 'Asset Listing'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'Michael Brown',
    isActive: true
  }
];

export const useDocumentTemplates = () => {
  const [templates, setTemplates] = useState<DocumentGatheringTemplate[]>(initialTemplates);

  const addTemplate = (template: Omit<DocumentGatheringTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: DocumentGatheringTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTemplates(prev => [...prev, newTemplate]);
    toast.success(`Template "${template.templateName}" created successfully`);
    console.log(`[AUDIT] Document template created: ${newTemplate.id} by ${template.createdBy} at ${new Date().toISOString()}`);
  };

  const updateTemplate = (id: string, updates: Partial<DocumentGatheringTemplate>) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, ...updates, updatedAt: new Date().toISOString() }
        : template
    ));
    toast.success('Template updated successfully');
    console.log(`[AUDIT] Document template updated: ${id} at ${new Date().toISOString()}`);
  };

  const deleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    setTemplates(prev => prev.filter(template => template.id !== id));
    toast.success(`Template "${template?.templateName}" deleted successfully`);
    console.log(`[AUDIT] Document template deleted: ${id} at ${new Date().toISOString()}`);
  };

  return {
    templates,
    addTemplate,
    updateTemplate,
    deleteTemplate
  };
};

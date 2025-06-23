
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
    participantForms: {
      borrowing_business: ['Personal Financial Statement', 'Business Financial Statement', 'Tax Returns'],
      affiliated_business: ['Business Financial Statement', 'Tax Returns'],
      owners: ['Personal Financial Statement', 'Personal Guarantee'],
      sellers: [],
      acquisition_business: ['Personal Financial Statement', 'Personal Guarantee']
    },
    ownershipRanges: {
      affiliated_business: [
        {
          id: '1',
          min: 10,
          max: 50,
          forms: ['Business Certificate', 'Financial Disclosure']
        }
      ],
      owners: [
        {
          id: '2',
          min: 20,
          max: 49,
          forms: ['Background Check Authorization', 'Credit Report Authorization']
        },
        {
          id: '3',
          min: 50,
          max: 100,
          forms: ['Background Check Authorization', 'Credit Report Authorization', 'Personal Guarantee', 'Collateral Documentation']
        }
      ],
      sellers: [
        {
          id: '4',
          min: 25,
          max: 100,
          forms: ['Business Sale Agreement', 'Asset Valuation', 'Financial History']
        }
      ]
    },
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
    participantForms: {
      borrowing_business: ['Personal Financial Statement', 'Business Financial Statement', 'Tax Returns', 'Business Plan'],
      affiliated_business: ['Business Financial Statement', 'Tax Returns'],
      owners: ['Personal Financial Statement', 'Personal Guarantee', 'Background Check Authorization'],
      sellers: [],
      acquisition_business: ['Personal Financial Statement', 'Personal Guarantee', 'Background Check Authorization']
    },
    ownershipRanges: {
      affiliated_business: [
        {
          id: '5',
          min: 5,
          max: 30,
          forms: ['Enhanced Due Diligence', 'Regulatory Compliance Check']
        }
      ],
      owners: [
        {
          id: '6',
          min: 20,
          max: 100,
          forms: ['Enhanced Background Check', 'Financial History Analysis', 'Collateral Assessment']
        }
      ],
      sellers: [
        {
          id: '7',
          min: 15,
          max: 100,
          forms: ['Comprehensive Business Valuation', 'Legal Due Diligence', 'Environmental Assessment']
        }
      ]
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'John Smith',
    isActive: true
  },
  {
    id: '3',
    templateName: 'Business Acquisition Template',
    loanType: 'Business Acquisition',
    amountMin: 100000,
    amountMax: 5000000,
    participantForms: {
      borrowing_business: ['Personal Financial Statement', 'Business Plan'],
      affiliated_business: ['Business Financial Statement'],
      owners: ['Personal Financial Statement', 'Personal Guarantee', 'Background Check Authorization'],
      sellers: ['Business Sale Agreement', 'Financial Statements', 'Asset Listing'],
      acquisition_business: ['Personal Financial Statement', 'Personal Guarantee']
    },
    ownershipRanges: {
      affiliated_business: [
        {
          id: '8',
          min: 15,
          max: 75,
          forms: ['Acquisition Due Diligence', 'Integration Planning Documents']
        }
      ],
      owners: [
        {
          id: '9',
          min: 25,
          max: 100,
          forms: ['Acquisition Financing Documentation', 'Management Transition Plan']
        }
      ],
      sellers: [
        {
          id: '10',
          min: 50,
          max: 100,
          forms: ['Complete Business Records', 'Transition Documentation', 'Warranty and Indemnification']
        }
      ]
    },
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

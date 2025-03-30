
import { Project } from './types';

// Update projects to include multiple buyers per project, one seller per project
export const projects: Project[] = [
  {
    project_id: 'project_1',
    project_name: 'Main Street Acquisition',
    project_type: 'Business Acquisition',
    status: 'active',
    loan_types: [
      { type: 'SBA 7(a)', amount: 2000000, description: 'Standard SBA loan for business acquisition' },
      { type: 'Owner Financing', amount: 500000, description: 'Seller carry back financing' }
    ],
    loan_amount: 2500000,
    created_by: 'user_4',
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2023-05-20T14:30:00Z',
    city: 'Chicago',
    state: 'IL',
    participants: [
      { userId: 'user_1', role: 'buyer' },
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_19', role: 'buyer' },
      { userId: 'user_2', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
    ]
  },
  {
    project_id: 'project_2',
    project_name: 'Riverside Development',
    project_type: 'Commercial Real Estate',
    status: 'pending',
    loan_types: [
      { type: 'SBA 504', amount: 5000000, description: 'CDC/SBA loan for real estate acquisition' },
      { type: 'Conventional', amount: 1000000, description: 'Bank loan for additional funding' }
    ],
    loan_amount: 6000000,
    created_by: 'user_5',
    created_at: '2023-06-10T09:15:00Z',
    updated_at: '2023-07-05T11:45:00Z',
    city: 'Denver',
    state: 'CO',
    participants: [
      { userId: 'user_6', role: 'buyer' },
      { userId: 'user_8', role: 'buyer' },
      { userId: 'user_20', role: 'buyer' },
      { userId: 'user_21', role: 'buyer' },
      { userId: 'user_7', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_3',
    project_name: 'Harvest Valley Farms',
    project_type: 'Agricultural Business',
    status: 'active',
    loan_types: [
      { type: 'USDA Farm Loan', amount: 1200000, description: 'USDA guaranteed loan for agriculture' },
      { type: 'Equipment Financing', amount: 350000, description: 'Specialized equipment financing' },
      { type: 'Operating Line', amount: 150000, description: 'Line of credit for operations' }
    ],
    loan_amount: 1700000,
    created_by: 'user_9',
    created_at: '2023-08-22T14:30:00Z',
    updated_at: '2023-09-15T10:20:00Z',
    city: 'Boise',
    state: 'ID',
    participants: [
      { userId: 'user_11', role: 'buyer' },
      { userId: 'user_13', role: 'buyer' },
      { userId: 'user_22', role: 'buyer' },
      { userId: 'user_24', role: 'seller' },
      { userId: 'user_9', role: 'bank_manager' },
      { userId: 'user_5', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_4',
    project_name: 'Harbor View Hotel',
    project_type: 'Hospitality Acquisition',
    status: 'completed',
    loan_types: [
      { type: 'SBA 7(a)', amount: 4500000, description: 'SBA loan for hotel acquisition' },
      { type: 'Mezzanine Financing', amount: 1000000, description: 'Additional gap financing' },
      { type: 'FF&E Loan', amount: 500000, description: 'Furniture, fixtures & equipment financing' }
    ],
    loan_amount: 6000000,
    created_by: 'user_4',
    created_at: '2023-10-05T11:00:00Z',
    updated_at: '2023-11-18T16:45:00Z',
    city: 'Portland',
    state: 'OR',
    participants: [
      { userId: 'user_15', role: 'buyer' },
      { userId: 'user_23', role: 'buyer' },
      { userId: 'user_25', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_5',
    project_name: 'Maple Street Manufacturing',
    project_type: 'Manufacturing Expansion',
    status: 'active',
    loan_types: [
      { type: 'Industrial Development Bond', amount: 3000000, description: 'Tax-exempt bond for manufacturing' },
      { type: 'Equipment Financing', amount: 1200000, description: 'CNC machine and production line financing' },
      { type: 'Working Capital', amount: 800000, description: 'Operating capital for expansion' }
    ],
    loan_amount: 5000000,
    created_by: 'user_5',
    created_at: '2023-12-12T09:30:00Z',
    updated_at: '2024-01-20T13:40:00Z',
    city: 'Cleveland',
    state: 'OH',
    participants: [
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_26', role: 'seller' },
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
    ]
  }
];

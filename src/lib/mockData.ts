// Define mock data types
export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  bank_id?: string;
  otp_enabled?: boolean;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  owner_id: string;
  financial_data?: {
    [year: string]: {
      revenue: number;
      wages: number;
      cogs: number;
      gross_profit: number;
      other_expenses: number;
      total_noi: number;
      nom_percentage: number;
    }
  };
}

export interface LoanType {
  type: string;
  amount: number;
  description: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  loan_types: LoanType[];
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
  participants: { userId: string; role: string }[];
}

// Mock users - expanded list with more buyers and sellers
export const users: User[] = [
  { 
    user_id: 'user_1', 
    name: 'John Smith', 
    email: 'john@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_2', 
    name: 'Jane Doe', 
    email: 'jane@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_3', 
    name: 'Mark Johnson', 
    email: 'mark@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_4', 
    name: 'Sarah Williams', 
    email: 'sarah@bankexample.com', 
    role: 'bank_officer',
    bank_id: 'bank_1',
    otp_enabled: true
  },
  { 
    user_id: 'user_5', 
    name: 'Robert Brown', 
    email: 'robert@bankexample.com', 
    role: 'loan_specialist',
    bank_id: 'bank_1',
    otp_enabled: false
  },
  { 
    user_id: 'user_6', 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_7', 
    name: 'Michael Wilson', 
    email: 'michael@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_8', 
    name: 'Lisa Thompson', 
    email: 'lisa@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_9', 
    name: 'Thomas Moore', 
    email: 'thomas@bankexample.com', 
    role: 'bank_manager',
    bank_id: 'bank_1',
    otp_enabled: true
  },
  { 
    user_id: 'user_10', 
    name: 'Jessica Taylor', 
    email: 'jessica@bankexample.com', 
    role: 'loan_specialist',
    bank_id: 'bank_1',
    otp_enabled: false
  },
  { 
    user_id: 'user_11', 
    name: 'David Johnson', 
    email: 'david@example.com', 
    role: 'buyer',
    otp_enabled: true
  },
  { 
    user_id: 'user_12', 
    name: 'Amanda Lee', 
    email: 'amanda@example.com', 
    role: 'seller',
    otp_enabled: false
  },
  { 
    user_id: 'user_13', 
    name: 'Richard Martinez', 
    email: 'richard@example.com', 
    role: 'buyer',
    otp_enabled: true
  },
  { 
    user_id: 'user_14', 
    name: 'Jennifer Garcia', 
    email: 'jennifer@example.com', 
    role: 'seller',
    otp_enabled: false
  },
  { 
    user_id: 'user_15', 
    name: 'Christopher Davis', 
    email: 'chris@example.com', 
    role: 'buyer',
    otp_enabled: true
  },
  { 
    user_id: 'user_16', 
    name: 'Elizabeth Wilson', 
    email: 'elizabeth@bankexample.com', 
    role: 'bank_officer',
    bank_id: 'bank_1',
    otp_enabled: false
  },
  { 
    user_id: 'user_17', 
    name: 'Daniel Thomas', 
    email: 'daniel@bankexample.com', 
    role: 'loan_specialist',
    bank_id: 'bank_1',
    otp_enabled: true
  },
  { 
    user_id: 'user_18', 
    name: 'Michelle Anderson', 
    email: 'michelle@bankexample.com', 
    role: 'bank_manager',
    bank_id: 'bank_1',
    otp_enabled: false
  },

  { 
    user_id: 'user_19', 
    name: 'Alex Rodriguez', 
    email: 'alex@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_20', 
    name: 'Sophia Nguyen', 
    email: 'sophia@example.com', 
    role: 'buyer',
    otp_enabled: true
  },
  { 
    user_id: 'user_21', 
    name: 'William Parker', 
    email: 'william@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_22', 
    name: 'Olivia Chen', 
    email: 'olivia@example.com', 
    role: 'buyer',
    otp_enabled: true
  },
  { 
    user_id: 'user_23', 
    name: 'James Scott', 
    email: 'james@example.com', 
    role: 'buyer',
    otp_enabled: false
  },

  { 
    user_id: 'user_24', 
    name: 'Emma White', 
    email: 'emma@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_25', 
    name: 'Noah Johnson', 
    email: 'noah@example.com', 
    role: 'seller',
    otp_enabled: false
  },
  { 
    user_id: 'user_26', 
    name: 'Isabella Martinez', 
    email: 'isabella@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_27', 
    name: 'Liam Harris', 
    email: 'liam@example.com', 
    role: 'seller',
    otp_enabled: false
  },
];

// Expanded businesses list with more diversified data
export const businesses: Business[] = [
  {
    business_id: 'business_1',
    name: 'Acme Corporation',
    entity_type: 'LLC',
    owner_id: 'user_2',
    financial_data: {
      '2021': {
        revenue: 500000,
        wages: 150000,
        cogs: 200000,
        gross_profit: 300000,
        other_expenses: 50000,
        total_noi: 100000,
        nom_percentage: 20
      },
      '2022': {
        revenue: 600000,
        wages: 180000,
        cogs: 220000,
        gross_profit: 380000,
        other_expenses: 60000,
        total_noi: 140000,
        nom_percentage: 23
      }
    }
  },
  {
    business_id: 'business_2',
    name: 'XYZ Enterprises',
    entity_type: 'S-Corp',
    owner_id: 'user_7',
    financial_data: {
      '2021': {
        revenue: 750000,
        wages: 250000,
        cogs: 300000,
        gross_profit: 450000,
        other_expenses: 100000,
        total_noi: 100000,
        nom_percentage: 13
      },
      '2022': {
        revenue: 900000,
        wages: 300000,
        cogs: 350000,
        gross_profit: 550000,
        other_expenses: 120000,
        total_noi: 130000,
        nom_percentage: 14
      },
      '2023': {
        revenue: 980000,
        wages: 320000,
        cogs: 370000,
        gross_profit: 610000,
        other_expenses: 140000,
        total_noi: 150000,
        nom_percentage: 15
      }
    }
  },
  {
    business_id: 'business_3',
    name: 'Pacific Technologies',
    entity_type: 'C-Corp',
    owner_id: 'user_2',
    financial_data: {
      '2021': {
        revenue: 1200000,
        wages: 400000,
        cogs: 500000,
        gross_profit: 700000,
        other_expenses: 200000,
        total_noi: 100000,
        nom_percentage: 8
      },
      '2022': {
        revenue: 1350000,
        wages: 450000,
        cogs: 550000,
        gross_profit: 800000,
        other_expenses: 220000,
        total_noi: 130000,
        nom_percentage: 9.6
      },
      '2023': {
        revenue: 1500000,
        wages: 500000,
        cogs: 600000,
        gross_profit: 900000,
        other_expenses: 250000,
        total_noi: 150000,
        nom_percentage: 10
      }
    }
  },
  {
    business_id: 'business_4',
    name: 'Riverfront Dining',
    entity_type: 'LLC',
    owner_id: 'user_7',
    financial_data: {
      '2022': {
        revenue: 850000,
        wages: 300000,
        cogs: 350000,
        gross_profit: 500000,
        other_expenses: 100000,
        total_noi: 100000,
        nom_percentage: 11.8
      },
      '2023': {
        revenue: 920000,
        wages: 320000,
        cogs: 370000,
        gross_profit: 550000,
        other_expenses: 110000,
        total_noi: 120000,
        nom_percentage: 13
      }
    }
  },
  {
    business_id: 'business_5',
    name: 'Urban Coffee Roasters',
    entity_type: 'LLC',
    owner_id: 'user_12',
    financial_data: {
      '2022': {
        revenue: 420000,
        wages: 140000,
        cogs: 180000,
        gross_profit: 240000,
        other_expenses: 60000,
        total_noi: 40000,
        nom_percentage: 9.5
      },
      '2023': {
        revenue: 490000,
        wages: 160000,
        cogs: 200000,
        gross_profit: 290000,
        other_expenses: 70000,
        total_noi: 60000,
        nom_percentage: 12.2
      }
    }
  },
  {
    business_id: 'business_6',
    name: 'Mountain View Landscaping',
    entity_type: 'Sole Proprietorship',
    owner_id: 'user_13',
    financial_data: {
      '2022': {
        revenue: 380000,
        wages: 120000,
        cogs: 140000,
        gross_profit: 240000,
        other_expenses: 70000,
        total_noi: 50000,
        nom_percentage: 13.2
      },
      '2023': {
        revenue: 450000,
        wages: 140000,
        cogs: 160000,
        gross_profit: 290000,
        other_expenses: 80000,
        total_noi: 70000,
        nom_percentage: 15.5
      }
    }
  },
  {
    business_id: 'business_7',
    name: 'Sunset Bakery',
    entity_type: 'S-Corp',
    owner_id: 'user_14',
    financial_data: {
      '2021': {
        revenue: 340000,
        wages: 110000,
        cogs: 150000,
        gross_profit: 190000,
        other_expenses: 40000,
        total_noi: 40000,
        nom_percentage: 11.8
      },
      '2022': {
        revenue: 390000,
        wages: 130000,
        cogs: 170000,
        gross_profit: 220000,
        other_expenses: 50000,
        total_noi: 40000,
        nom_percentage: 10.3
      },
      '2023': {
        revenue: 430000,
        wages: 140000,
        cogs: 180000,
        gross_profit: 250000,
        other_expenses: 60000,
        total_noi: 50000,
        nom_percentage: 11.6
      }
    }
  },
  {
    business_id: 'business_8',
    name: 'Coastal Marine Tours',
    entity_type: 'LLC',
    owner_id: 'user_3',
    financial_data: {
      '2022': {
        revenue: 750000,
        wages: 200000,
        cogs: 300000,
        gross_profit: 450000,
        other_expenses: 120000,
        total_noi: 130000,
        nom_percentage: 17.3
      },
      '2023': {
        revenue: 880000,
        wages: 230000,
        cogs: 340000,
        gross_profit: 540000,
        other_expenses: 140000,
        total_noi: 170000,
        nom_percentage: 19.3
      }
    }
  },
  {
    business_id: 'business_9',
    name: 'Summit Auto Repair',
    entity_type: 'S-Corp',
    owner_id: 'user_11',
    financial_data: {
      '2021': {
        revenue: 620000,
        wages: 210000,
        cogs: 250000,
        gross_profit: 370000,
        other_expenses: 90000,
        total_noi: 70000,
        nom_percentage: 11.3
      },
      '2022': {
        revenue: 680000,
        wages: 230000,
        cogs: 270000,
        gross_profit: 410000,
        other_expenses: 100000,
        total_noi: 80000,
        nom_percentage: 11.8
      },
      '2023': {
        revenue: 710000,
        wages: 240000,
        cogs: 280000,
        gross_profit: 430000,
        other_expenses: 110000,
        total_noi: 80000,
        nom_percentage: 11.3
      }
    }
  },
  {
    business_id: 'business_10',
    name: 'Evergreen Medical Supplies',
    entity_type: 'C-Corp',
    owner_id: 'user_15',
    financial_data: {
      '2021': {
        revenue: 1800000,
        wages: 600000,
        cogs: 700000,
        gross_profit: 1100000,
        other_expenses: 300000,
        total_noi: 200000,
        nom_percentage: 11.1
      },
      '2022': {
        revenue: 2100000,
        wages: 700000,
        cogs: 800000,
        gross_profit: 1300000,
        other_expenses: 350000,
        total_noi: 250000,
        nom_percentage: 11.9
      },
      '2023': {
        revenue: 2400000,
        wages: 800000,
        cogs: 900000,
        gross_profit: 1500000,
        other_expenses: 400000,
        total_noi: 300000,
        nom_percentage: 12.5
      }
    }
  },
  {
    business_id: 'business_11',
    name: 'Northern Investments LLC',
    entity_type: 'LLC',
    owner_id: 'user_1',
    financial_data: {
      '2021': {
        revenue: 350000,
        wages: 90000,
        cogs: 120000,
        gross_profit: 230000,
        other_expenses: 40000,
        total_noi: 100000,
        nom_percentage: 28.5
      },
      '2022': {
        revenue: 420000,
        wages: 110000,
        cogs: 140000,
        gross_profit: 280000,
        other_expenses: 50000,
        total_noi: 120000,
        nom_percentage: 28.6
      },
      '2023': {
        revenue: 490000,
        wages: 130000,
        cogs: 160000,
        gross_profit: 330000,
        other_expenses: 60000,
        total_noi: 140000,
        nom_percentage: 28.6
      }
    }
  },
  {
    business_id: 'business_12',
    name: 'Elite Technology Solutions',
    entity_type: 'S-Corp',
    owner_id: 'user_3',
    financial_data: {
      '2021': {
        revenue: 870000,
        wages: 320000,
        cogs: 250000,
        gross_profit: 620000,
        other_expenses: 180000,
        total_noi: 120000,
        nom_percentage: 13.8
      },
      '2022': {
        revenue: 950000,
        wages: 350000,
        cogs: 270000,
        gross_profit: 680000,
        other_expenses: 200000,
        total_noi: 130000,
        nom_percentage: 13.7
      },
      '2023': {
        revenue: 1050000,
        wages: 380000,
        cogs: 300000,
        gross_profit: 750000,
        other_expenses: 220000,
        total_noi: 150000,
        nom_percentage: 14.3
      }
    }
  },
  {
    business_id: 'business_13',
    name: 'Meadow Valley Farms',
    entity_type: 'Partnership',
    owner_id: 'user_6',
    financial_data: {
      '2022': {
        revenue: 580000,
        wages: 150000,
        cogs: 220000,
        gross_profit: 360000,
        other_expenses: 80000,
        total_noi: 130000,
        nom_percentage: 22.4
      },
      '2023': {
        revenue: 650000,
        wages: 170000,
        cogs: 240000,
        gross_profit: 410000,
        other_expenses: 90000,
        total_noi: 150000,
        nom_percentage: 23.1
      }
    }
  },
  {
    business_id: 'business_14',
    name: 'Harbor View Hospitality',
    entity_type: 'C-Corp',
    owner_id: 'user_8',
    financial_data: {
      '2021': {
        revenue: 2200000,
        wages: 700000,
        cogs: 800000,
        gross_profit: 1400000,
        other_expenses: 350000,
        total_noi: 350000,
        nom_percentage: 15.9
      },
      '2022': {
        revenue: 2500000,
        wages: 800000,
        cogs: 900000,
        gross_profit: 1600000,
        other_expenses: 400000,
        total_noi: 400000,
        nom_percentage: 16
      },
      '2023': {
        revenue: 2800000,
        wages: 900000,
        cogs: 1000000,
        gross_profit: 1800000,
        other_expenses: 450000,
        total_noi: 450000,
        nom_percentage: 16.1
      }
    }
  },
  {
    business_id: 'business_15',
    name: 'Advanced Manufacturing Co.',
    entity_type: 'LLC',
    owner_id: 'user_11',
    financial_data: {
      '2021': {
        revenue: 3500000,
        wages: 1200000,
        cogs: 1500000,
        gross_profit: 2000000,
        other_expenses: 500000,
        total_noi: 300000,
        nom_percentage: 8.6
      },
      '2022': {
        revenue: 3800000,
        wages: 1300000,
        cogs: 1600000,
        gross_profit: 2200000,
        other_expenses: 550000,
        total_noi: 350000,
        nom_percentage: 9.2
      },
      '2023': {
        revenue: 4200000,
        wages: 1400000,
        cogs: 1700000,
        gross_profit: 2500000,
        other_expenses: 600000,
        total_noi: 500000,
        nom_percentage: 11.9
      }
    }
  },
  {
    business_id: 'business_16',
    name: 'Granite Peak Investments',
    entity_type: 'LLC',
    owner_id: 'user_13',
    financial_data: {
      '2021': {
        revenue: 920000,
        wages: 280000,
        cogs: 320000,
        gross_profit: 600000,
        other_expenses: 180000,
        total_noi: 140000,
        nom_percentage: 15.2
      },
      '2022': {
        revenue: 1050000,
        wages: 320000,
        cogs: 350000,
        gross_profit: 700000,
        other_expenses: 210000,
        total_noi: 170000,
        nom_percentage: 16.2
      },
      '2023': {
        revenue: 1200000,
        wages: 360000,
        cogs: 400000,
        gross_profit: 800000,
        other_expenses: 240000,
        total_noi: 200000,
        nom_percentage: 16.7
      }
    }
  },
  {
    business_id: 'business_17',
    name: 'Quantum Software Solutions',
    entity_type: 'S-Corp',
    owner_id: 'user_15',
    financial_data: {
      '2021': {
        revenue: 1800000,
        wages: 650000,
        cogs: 400000,
        gross_profit: 1400000,
        other_expenses: 320000,
        total_noi: 430000,
        nom_percentage: 23.9
      },
      '2022': {
        revenue: 2300000,
        wages: 850000,
        cogs: 500000,
        gross_profit: 1800000,
        other_expenses: 420000,
        total_noi: 530000,
        nom_percentage: 23
      },
      '2023': {
        revenue: 2900000,
        wages: 1050000,
        cogs: 600000,
        gross_profit: 2300000,
        other_expenses: 550000,
        total_noi: 700000,
        nom_percentage: 24.1
      }
    }
  },
  {
    business_id: 'business_18',
    name: 'BlueSky Logistics',
    entity_type: 'C-Corp',
    owner_id: 'user_19',
    financial_data: {
      '2022': {
        revenue: 4200000,
        wages: 1300000,
        cogs: 1900000,
        gross_profit: 2300000,
        other_expenses: 600000,
        total_noi: 400000,
        nom_percentage: 9.5
      },
      '2023': {
        revenue: 4800000,
        wages: 1500000,
        cogs: 2100000,
        gross_profit: 2700000,
        other_expenses: 700000,
        total_noi: 500000,
        nom_percentage: 10.4
      }
    }
  },
  {
    business_id: 'business_19',
    name: 'Meridian Healthcare Group',
    entity_type: 'LLC',
    owner_id: 'user_20',
    financial_data: {
      '2021': {
        revenue: 3100000,
        wages: 1400000,
        cogs: 900000,
        gross_profit: 2200000,
        other_expenses: 450000,
        total_noi: 350000,
        nom_percentage: 11.3
      },
      '2022': {
        revenue: 3400000,
        wages: 1550000,
        cogs: 950000,
        gross_profit: 2450000,
        other_expenses: 500000,
        total_noi: 400000,
        nom_percentage: 11.8
      },
      '2023': {
        revenue: 3800000,
        wages: 1700000,
        cogs: 1050000,
        gross_profit: 2750000,
        other_expenses: 550000,
        total_noi: 500000,
        nom_percentage: 13.2
      }
    }
  },
  {
    business_id: 'business_20',
    name: 'Evergreen Properties',
    entity_type: 'LLC',
    owner_id: 'user_21',
    financial_data: {
      '2022': {
        revenue: 1900000,
        wages: 350000,
        cogs: 650000,
        gross_profit: 1250000,
        other_expenses: 320000,
        total_noi: 580000,
        nom_percentage: 30.5
      },
      '2023': {
        revenue: 2200000,
        wages: 400000,
        cogs: 750000,
        gross_profit: 1450000,
        other_expenses: 370000,
        total_noi: 680000,
        nom_percentage: 30.9
      }
    }
  },
  {
    business_id: 'business_21',
    name: 'Artisan Craft Brewing',
    entity_type: 'S-Corp',
    owner_id: 'user_22',
    financial_data: {
      '2021': {
        revenue: 820000,
        wages: 240000,
        cogs: 350000,
        gross_profit: 470000,
        other_expenses: 120000,
        total_noi: 110000,
        nom_percentage: 13.4
      },
      '2022': {
        revenue: 970000,
        wages: 290000,
        cogs: 390000,
        gross_profit: 580000,
        other_expenses: 150000,
        total_noi: 140000,
        nom_percentage: 14.4
      },
      '2023': {
        revenue: 1120000,
        wages: 330000,
        cogs: 440000,
        gross_profit: 680000,
        other_expenses: 180000,
        total_noi: 170000,
        nom_percentage: 15.2
      }
    }
  },
  {
    business_id: 'business_22',
    name: 'Summit Financial Advisors',
    entity_type: 'LLC',
    owner_id: 'user_23',
    financial_data: {
      '2021': {
        revenue: 1250000,
        wages: 580000,
        cogs: 150000,
        gross_profit: 1100000,
        other_expenses: 220000,
        total_noi: 300000,
        nom_percentage: 24
      },
      '2022': {
        revenue: 1450000,
        wages: 670000,
        cogs: 180000,
        gross_profit: 1270000,
        other_expenses: 250000,
        total_noi: 350000,
        nom_percentage: 24.1
      },
      '2023': {
        revenue: 1680000,
        wages: 780000,
        cogs: 200000,
        gross_profit: 1480000,
        other_expenses: 300000,
        total_noi: 400000,
        nom_percentage: 23.8
      }
    }
  },
  {
    business_id: 'business_23',
    name: 'Coastal Retail Group',
    entity_type: 'C-Corp',
    owner_id: 'user_24',
    financial_data: {
      '2021': {
        revenue: 5800000,
        wages: 1800000,
        cogs: 2600000,
        gross_profit: 3200000,
        other_expenses: 900000,
        total_noi: 500000,
        nom_percentage: 8.6
      },
      '2022': {
        revenue: 6300000,
        wages: 1950000,
        cogs: 2800000,
        gross_profit: 3500000,
        other_expenses: 1000000,
        total_noi: 550000,
        nom_percentage: 8.7
      },
      '2023': {
        revenue: 6800000,
        wages: 2100000,
        cogs: 3000000,
        gross_profit: 3800000,
        other_expenses: 1100000,
        total_noi: 600000,
        nom_percentage: 8.8
      }
    }
  },
  {
    business_id: 'business_24',
    name: 'Heritage Manufacturing',
    entity_type: 'S-Corp',
    owner_id: 'user_25',
    financial_data: {
      '2021': {
        revenue: 7200000,
        wages: 2400000,
        cogs: 3300000,
        gross_profit: 3900000,
        other_expenses: 950000,
        total_noi: 550000,
        nom_percentage: 7.6
      },
      '2022': {
        revenue: 7800000,
        wages: 2600000,
        cogs: 3500000,
        gross_profit: 4300000,
        other_expenses: 1050000,
        total_noi: 650000,
        nom_percentage: 8.3
      },
      '2023': {
        revenue: 8300000,
        wages: 2800000,
        cogs: 3700000,
        gross_profit: 4600000,
        other_expenses: 1150000,
        total_noi: 650000,
        nom_percentage: 7.8
      }
    }
  },
  {
    business_id: 'business_25',
    name: 'Alpine Outdoor Equipment',
    entity_type: 'LLC',
    owner_id: 'user_26',
    financial_data: {
      '2022': {
        revenue: 2800000,
        wages: 650000,
        cogs: 1300000,
        gross_profit: 1500000,
        other_expenses: 450000,
        total_noi: 400000,
        nom_percentage: 14.3
      },
      '2023': {
        revenue: 3200000,
        wages: 750000,
        cogs: 1500000,
        gross_profit: 1700000,
        other_expenses: 500000,
        total_noi: 450000,
        nom_percentage: 14.1
      }
    }
  },
  {
    business_id: 'business_26',
    name: 'Urban Restaurant Holdings',
    entity_type: 'LLC',
    owner_id: 'user_27',
    financial_data: {
      '2021': {
        revenue: 3900000,
        wages: 1300000,
        cogs: 1600000,
        gross_profit: 2300000,
        other_expenses: 800000,
        total_noi: 200000,
        nom_percentage: 5.1
      },
      '2022': {
        revenue: 4300000,
        wages: 1450000,
        cogs: 1750000,
        gross_profit: 2550000,
        other_expenses: 900000,
        total_noi: 200000,
        nom_percentage: 4.7
      },
      '2023': {
        revenue: 4800000,
        wages: 1600000,
        cogs: 1950000,
        gross_profit: 2850000,
        other_expenses: 1000000,
        total_noi: 250000,
        nom_percentage: 5.2
      }
    }
  }
];

// Update projects to include multiple buyers per project, one seller per project
export const projects: Project[] = [
  {
    project_id: 'project_1',
    project_name: 'Main Street Acquisition',
    project_type: 'Business Acquisition',
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

// Utility functions
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.user_id === userId);
};

export const getBusinessById = (businessId: string): Business | undefined => {
  return businesses.find(business => business.business_id === businessId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find(project => project.project_id === projectId);
};

// Mock data for UseOfProceedsTable
export const mockUseOfProceedsColumns = [
  { column_id: 'col_1', column_name: 'Total' },
  { column_id: 'col_2', column_name: 'Phase 1' },
  { column_id: 'col_3', column_name: 'Phase 2' }
];

export const mockUseOfProceedsRows = [
  { row_id: 'row_1', row_name: 'LAND & BUILDING', overall_category: 'Land' },
  { row_id: 'row_2', row_name: 'CONSTRUCTION', overall_category: 'Construction' },
  { row_id: 'row_3', row_name: 'EQUIPMENT', overall_category: 'Furniture Fixtures and Equipment' },
  { row_id: 'row_4', row_name: 'WORKING CAPITAL', overall_category: 'Working Capital' },
  { row_id: 'row_5', row_name: 'TOTAL', overall_category: '' }
];

// Function for bank lookup
export const getBankById = (bankId: string) => {
  return {
    bank_id: bankId,
    name: `Bank ${bankId}`,
    location: 'New York, NY'
  };
};

// Mock function for use of proceeds data
export const getUseOfProceedsForProject = (projectId: string) => {
  // Just return some sample data for demonstration
  return [
    { id: 1, overall_category: 'Land', row_name: 'LAND & BUILDING', value: 500000 },
    { id: 2, overall_category: 'Construction', row_name: 'CONSTRUCTION', value: 1000000 },
    { id: 3, overall_category: 'Furniture Fixtures and Equipment', row_name: 'EQUIPMENT', value: 300000 },
    { id: 4, overall_category: 'Working Capital', row_name: 'WORKING CAPITAL', value: 200000 }
  ];
};

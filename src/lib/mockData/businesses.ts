
import { Business } from './types';

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
  // First half of businesses
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

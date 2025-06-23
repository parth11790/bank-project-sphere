export interface BusinessTaxReturnData {
  business_id: string;
  business_name: string;
  entity_type: 'LLC' | 'S-Corp' | 'C-Corp' | 'Partnership';
  years: {
    [year: string]: {
      grossReceipts: number;
      costOfGoodsSold: number;
      grossProfit: number;
      officerCompensation: number;
      salariesWages: number;
      repairsDeductions: number;
      badDebts: number;
      rentsExpenses: number;
      taxesLicenses: number;
      interestExpense: number;
      charitableContributions: number;
      depreciationDepletion: number;
      amortizationExp: number;
      advertisingExpenses: number;
      pensionBenefits: number;
      employeeBenefits: number;
      otherDeductions: number;
      totalDeductions: number;
      netIncome: number;
      depreciationAddBack: number;
      amortizationAddBack: number;
      cashDistributions: number;
      operatingCashFlow: number;
    };
  };
}

export const businessTaxReturnsData: BusinessTaxReturnData[] = [
  {
    business_id: "business_1",
    business_name: "Pacific Northwest Retail LLC",
    entity_type: "LLC",
    years: {
      "2023": {
        grossReceipts: 2850000,
        costOfGoodsSold: 1425000,
        grossProfit: 1425000,
        officerCompensation: 0,
        salariesWages: 385000,
        repairsDeductions: 28000,
        badDebts: 12000,
        rentsExpenses: 156000,
        taxesLicenses: 35000,
        interestExpense: 42000,
        charitableContributions: 8000,
        depreciationDepletion: 85000,
        amortizationExp: 15000,
        advertisingExpenses: 65000,
        pensionBenefits: 22000,
        employeeBenefits: 48000,
        otherDeductions: 125000,
        totalDeductions: 1026000,
        netIncome: 399000,
        depreciationAddBack: 85000,
        amortizationAddBack: 15000,
        cashDistributions: 180000,
        operatingCashFlow: 319000
      },
      "2022": {
        grossReceipts: 2650000,
        costOfGoodsSold: 1325000,
        grossProfit: 1325000,
        officerCompensation: 0,
        salariesWages: 358000,
        repairsDeductions: 24000,
        badDebts: 18000,
        rentsExpenses: 144000,
        taxesLicenses: 32000,
        interestExpense: 38000,
        charitableContributions: 6000,
        depreciationDepletion: 78000,
        amortizationExp: 14000,
        advertisingExpenses: 58000,
        pensionBenefits: 20000,
        employeeBenefits: 42000,
        otherDeductions: 115000,
        totalDeductions: 947000,
        netIncome: 378000,
        depreciationAddBack: 78000,
        amortizationAddBack: 14000,
        cashDistributions: 165000,
        operatingCashFlow: 305000
      },
      "2021": {
        grossReceipts: 2450000,
        costOfGoodsSold: 1225000,
        grossProfit: 1225000,
        officerCompensation: 0,
        salariesWages: 325000,
        repairsDeductions: 22000,
        badDebts: 25000,
        rentsExpenses: 132000,
        taxesLicenses: 28000,
        interestExpense: 35000,
        charitableContributions: 5000,
        depreciationDepletion: 72000,
        amortizationExp: 12000,
        advertisingExpenses: 52000,
        pensionBenefits: 18000,
        employeeBenefits: 38000,
        otherDeductions: 105000,
        totalDeductions: 869000,
        netIncome: 356000,
        depreciationAddBack: 72000,
        amortizationAddBack: 12000,
        cashDistributions: 150000,
        operatingCashFlow: 290000
      }
    }
  },
  {
    business_id: "business_2",
    business_name: "TechFlow Solutions Inc.",
    entity_type: "S-Corp",
    years: {
      "2023": {
        grossReceipts: 4250000,
        costOfGoodsSold: 850000,
        grossProfit: 3400000,
        officerCompensation: 425000,
        salariesWages: 1850000,
        repairsDeductions: 45000,
        badDebts: 35000,
        rentsExpenses: 280000,
        taxesLicenses: 68000,
        interestExpense: 25000,
        charitableContributions: 15000,
        depreciationDepletion: 125000,
        amortizationExp: 85000,
        advertisingExpenses: 185000,
        pensionBenefits: 95000,
        employeeBenefits: 125000,
        otherDeductions: 185000,
        totalDeductions: 3343000,
        netIncome: 57000,
        depreciationAddBack: 125000,
        amortizationAddBack: 85000,
        cashDistributions: 95000,
        operatingCashFlow: 172000
      },
      "2022": {
        grossReceipts: 3850000,
        costOfGoodsSold: 770000,
        grossProfit: 3080000,
        officerCompensation: 385000,
        salariesWages: 1685000,
        repairsDeductions: 38000,
        badDebts: 42000,
        rentsExpenses: 265000,
        taxesLicenses: 58000,
        interestExpense: 22000,
        charitableContributions: 12000,
        depreciationDepletion: 115000,
        amortizationExp: 78000,
        advertisingExpenses: 165000,
        pensionBenefits: 85000,
        employeeBenefits: 115000,
        otherDeductions: 165000,
        totalDeductions: 3030000,
        netIncome: 50000,
        depreciationAddBack: 115000,
        amortizationAddBack: 78000,
        cashDistributions: 85000,
        operatingCashFlow: 158000
      },
      "2021": {
        grossReceipts: 3450000,
        costOfGoodsSold: 690000,
        grossProfit: 2760000,
        officerCompensation: 345000,
        salariesWages: 1485000,
        repairsDeductions: 32000,
        badDebts: 38000,
        rentsExpenses: 245000,
        taxesLicenses: 52000,
        interestExpense: 28000,
        charitableContributions: 10000,
        depreciationDepletion: 105000,
        amortizationExp: 65000,
        advertisingExpenses: 145000,
        pensionBenefits: 75000,
        employeeBenefits: 95000,
        otherDeductions: 145000,
        totalDeductions: 2665000,
        netIncome: 95000,
        depreciationAddBack: 105000,
        amortizationAddBack: 65000,
        cashDistributions: 75000,
        operatingCashFlow: 190000
      }
    }
  },
  {
    business_id: "business_3",
    business_name: "Mountain View Manufacturing Corp",
    entity_type: "C-Corp",
    years: {
      "2023": {
        grossReceipts: 8750000,
        costOfGoodsSold: 5250000,
        grossProfit: 3500000,
        officerCompensation: 650000,
        salariesWages: 1850000,
        repairsDeductions: 125000,
        badDebts: 45000,
        rentsExpenses: 185000,
        taxesLicenses: 95000,
        interestExpense: 185000,
        charitableContributions: 25000,
        depreciationDepletion: 285000,
        amortizationExp: 65000,
        advertisingExpenses: 145000,
        pensionBenefits: 125000,
        employeeBenefits: 185000,
        otherDeductions: 225000,
        totalDeductions: 3990000,
        netIncome: -490000,
        depreciationAddBack: 285000,
        amortizationAddBack: 65000,
        cashDistributions: 0,
        operatingCashFlow: -140000
      },
      "2022": {
        grossReceipts: 8250000,
        costOfGoodsSold: 4950000,
        grossProfit: 3300000,
        officerCompensation: 585000,
        salariesWages: 1685000,
        repairsDeductions: 115000,
        badDebts: 52000,
        rentsExpenses: 175000,
        taxesLicenses: 85000,
        interestExpense: 165000,
        charitableContributions: 20000,
        depreciationDepletion: 275000,
        amortizationExp: 58000,
        advertisingExpenses: 135000,
        pensionBenefits: 115000,
        employeeBenefits: 165000,
        otherDeductions: 205000,
        totalDeductions: 3635000,
        netIncome: -335000,
        depreciationAddBack: 275000,
        amortizationAddBack: 58000,
        cashDistributions: 0,
        operatingCashFlow: -2000
      },
      "2021": {
        grossReceipts: 7850000,
        costOfGoodsSold: 4710000,
        grossProfit: 3140000,
        officerCompensation: 525000,
        salariesWages: 1550000,
        repairsDeductions: 105000,
        badDebts: 48000,
        rentsExpenses: 165000,
        taxesLicenses: 78000,
        interestExpense: 155000,
        charitableContributions: 15000,
        depreciationDepletion: 265000,
        amortizationExp: 52000,
        advertisingExpenses: 125000,
        pensionBenefits: 105000,
        employeeBenefits: 155000,
        otherDeductions: 185000,
        totalDeductions: 3333000,
        netIncome: -193000,
        depreciationAddBack: 265000,
        amortizationAddBack: 52000,
        cashDistributions: 0,
        operatingCashFlow: 124000
      }
    }
  },
  {
    business_id: "business_4",
    business_name: "Coastal Consulting Partners",
    entity_type: "Partnership",
    years: {
      "2023": {
        grossReceipts: 1850000,
        costOfGoodsSold: 0,
        grossProfit: 1850000,
        officerCompensation: 0,
        salariesWages: 485000,
        repairsDeductions: 15000,
        badDebts: 8000,
        rentsExpenses: 125000,
        taxesLicenses: 25000,
        interestExpense: 12000,
        charitableContributions: 5000,
        depreciationDepletion: 45000,
        amortizationExp: 25000,
        advertisingExpenses: 85000,
        pensionBenefits: 35000,
        employeeBenefits: 65000,
        otherDeductions: 185000,
        totalDeductions: 1115000,
        netIncome: 735000,
        depreciationAddBack: 45000,
        amortizationAddBack: 25000,
        cashDistributions: 525000,
        operatingCashFlow: 280000
      },
      "2022": {
        grossReceipts: 1685000,
        costOfGoodsSold: 0,
        grossProfit: 1685000,
        officerCompensation: 0,
        salariesWages: 425000,
        repairsDeductions: 12000,
        badDebts: 15000,
        rentsExpenses: 115000,
        taxesLicenses: 22000,
        interestExpense: 10000,
        charitableContributions: 3000,
        depreciationDepletion: 38000,
        amortizationExp: 22000,
        advertisingExpenses: 75000,
        pensionBenefits: 28000,
        employeeBenefits: 55000,
        otherDeductions: 165000,
        totalDeductions: 985000,
        netIncome: 700000,
        depreciationAddBack: 38000,
        amortizationAddBack: 22000,
        cashDistributions: 485000,
        operatingCashFlow: 275000
      },
      "2021": {
        grossReceipts: 1545000,
        costOfGoodsSold: 0,
        grossProfit: 1545000,
        officerCompensation: 0,
        salariesWages: 385000,
        repairsDeductions: 10000,
        badDebts: 18000,
        rentsExpenses: 105000,
        taxesLicenses: 18000,
        interestExpense: 8000,
        charitableContributions: 2000,
        depreciationDepletion: 32000,
        amortizationExp: 18000,
        advertisingExpenses: 65000,
        pensionBenefits: 25000,
        employeeBenefits: 48000,
        otherDeductions: 145000,
        totalDeductions: 879000,
        netIncome: 666000,
        depreciationAddBack: 32000,
        amortizationAddBack: 18000,
        cashDistributions: 445000,
        operatingCashFlow: 271000
      }
    }
  },
  {
    business_id: "business_5",
    business_name: "Urban Dining Group LLC",
    entity_type: "LLC",
    years: {
      "2023": {
        grossReceipts: 3250000,
        costOfGoodsSold: 1137500,
        grossProfit: 2112500,
        officerCompensation: 0,
        salariesWages: 975000,
        repairsDeductions: 85000,
        badDebts: 25000,
        rentsExpenses: 390000,
        taxesLicenses: 45000,
        interestExpense: 65000,
        charitableContributions: 8000,
        depreciationDepletion: 125000,
        amortizationExp: 35000,
        advertisingExpenses: 195000,
        pensionBenefits: 45000,
        employeeBenefits: 85000,
        otherDeductions: 165000,
        totalDeductions: 2243000,
        netIncome: -130500,
        depreciationAddBack: 125000,
        amortizationAddBack: 35000,
        cashDistributions: 0,
        operatingCashFlow: 29500
      },
      "2022": {
        grossReceipts: 2850000,
        costOfGoodsSold: 997500,
        grossProfit: 1852500,
        officerCompensation: 0,
        salariesWages: 855000,
        repairsDeductions: 75000,
        badDebts: 35000,
        rentsExpenses: 342000,
        taxesLicenses: 38000,
        interestExpense: 58000,
        charitableContributions: 5000,
        depreciationDepletion: 115000,
        amortizationExp: 28000,
        advertisingExpenses: 165000,
        pensionBenefits: 38000,
        employeeBenefits: 75000,
        otherDeductions: 145000,
        totalDeductions: 1974000,
        netIncome: -121500,
        depreciationAddBack: 115000,
        amortizationAddBack: 28000,
        cashDistributions: 0,
        operatingCashFlow: 21500
      },
      "2021": {
        grossReceipts: 2450000,
        costOfGoodsSold: 857500,
        grossProfit: 1592500,
        officerCompensation: 0,
        salariesWages: 735000,
        repairsDeductions: 65000,
        badDebts: 42000,
        rentsExpenses: 294000,
        taxesLicenses: 32000,
        interestExpense: 52000,
        charitableContributions: 3000,
        depreciationDepletion: 105000,
        amortizationExp: 22000,
        advertisingExpenses: 135000,
        pensionBenefits: 32000,
        employeeBenefits: 65000,
        otherDeductions: 125000,
        totalDeductions: 1707000,
        netIncome: -114500,
        depreciationAddBack: 105000,
        amortizationAddBack: 22000,
        cashDistributions: 0,
        operatingCashFlow: 12500
      }
    }
  }
];

// Utility function to get business tax data by business ID
export const getBusinessTaxDataById = (businessId: string): BusinessTaxReturnData | undefined => {
  return businessTaxReturnsData.find(data => data.business_id === businessId);
};


export interface IndividualTaxReturnData {
  participant_id: string;
  participant_name: string;
  years: {
    [year: string]: {
      wages: number;
      interestDividends: number;
      businessIncome: number;
      capitalGains: number;
      otherIncome: number;
      adjustedGrossIncome: number;
      itemizedDeductions: number;
      taxableIncome: number;
      federalTaxWithheld: number;
      estimatedTaxPayments: number;
      refundableCredits: number;
      totalPayments: number;
      balanceDue: number;
      refund: number;
    };
  };
}

export const individualTaxReturnsData: IndividualTaxReturnData[] = [
  {
    participant_id: "part_1",
    participant_name: "Michael Chen",
    years: {
      "2023": {
        wages: 185000,
        interestDividends: 12500,
        businessIncome: 45000,
        capitalGains: 8500,
        otherIncome: 3200,
        adjustedGrossIncome: 254200,
        itemizedDeductions: 28500,
        taxableIncome: 225700,
        federalTaxWithheld: 38500,
        estimatedTaxPayments: 12000,
        refundableCredits: 2500,
        totalPayments: 53000,
        balanceDue: 0,
        refund: 1250
      },
      "2022": {
        wages: 175000,
        interestDividends: 9800,
        businessIncome: 38000,
        capitalGains: 15200,
        otherIncome: 2800,
        adjustedGrossIncome: 240800,
        itemizedDeductions: 26800,
        taxableIncome: 214000,
        federalTaxWithheld: 35500,
        estimatedTaxPayments: 10500,
        refundableCredits: 2200,
        totalPayments: 48200,
        balanceDue: 2850,
        refund: 0
      },
      "2021": {
        wages: 165000,
        interestDividends: 8200,
        businessIncome: 32000,
        capitalGains: 6800,
        otherIncome: 1500,
        adjustedGrossIncome: 213500,
        itemizedDeductions: 24500,
        taxableIncome: 189000,
        federalTaxWithheld: 32800,
        estimatedTaxPayments: 8500,
        refundableCredits: 1800,
        totalPayments: 43100,
        balanceDue: 0,
        refund: 850
      }
    }
  },
  {
    participant_id: "part_2", 
    participant_name: "Sarah Johnson",
    years: {
      "2023": {
        wages: 125000,
        interestDividends: 5500,
        businessIncome: 0,
        capitalGains: 3200,
        otherIncome: 1800,
        adjustedGrossIncome: 135500,
        itemizedDeductions: 18500,
        taxableIncome: 117000,
        federalTaxWithheld: 22500,
        estimatedTaxPayments: 3500,
        refundableCredits: 1200,
        totalPayments: 27200,
        balanceDue: 0,
        refund: 2850
      },
      "2022": {
        wages: 118000,
        interestDividends: 4800,
        businessIncome: 0,
        capitalGains: 2500,
        otherIncome: 1200,
        adjustedGrossIncome: 126500,
        itemizedDeductions: 16800,
        taxableIncome: 109700,
        federalTaxWithheld: 21200,
        estimatedTaxPayments: 2800,
        refundableCredits: 1100,
        totalPayments: 25100,
        balanceDue: 0,
        refund: 1950
      },
      "2021": {
        wages: 112000,
        interestDividends: 3900,
        businessIncome: 0,
        capitalGains: 1800,
        otherIncome: 900,
        adjustedGrossIncome: 118600,
        itemizedDeductions: 15200,
        taxableIncome: 103400,
        federalTaxWithheld: 19800,
        estimatedTaxPayments: 2200,
        refundableCredits: 950,
        totalPayments: 22950,
        balanceDue: 0,
        refund: 1650
      }
    }
  },
  {
    participant_id: "part_3",
    participant_name: "David Rodriguez", 
    years: {
      "2023": {
        wages: 295000,
        interestDividends: 25500,
        businessIncome: 125000,
        capitalGains: 45800,
        otherIncome: 8500,
        adjustedGrossIncome: 499800,
        itemizedDeductions: 65000,
        taxableIncome: 434800,
        federalTaxWithheld: 85500,
        estimatedTaxPayments: 35000,
        refundableCredits: 0,
        totalPayments: 120500,
        balanceDue: 18500,
        refund: 0
      },
      "2022": {
        wages: 285000,
        interestDividends: 22800,
        businessIncome: 98000,
        capitalGains: 38200,
        otherIncome: 6500,
        adjustedGrossIncome: 450500,
        itemizedDeductions: 58500,
        taxableIncome: 392000,
        federalTaxWithheld: 78500,
        estimatedTaxPayments: 28000,
        refundableCredits: 0,
        totalPayments: 106500,
        balanceDue: 12800,
        refund: 0
      },
      "2021": {
        wages: 275000,
        interestDividends: 18500,
        businessIncome: 85000,
        capitalGains: 28900,
        otherIncome: 4200,
        adjustedGrossIncome: 411600,
        itemizedDeductions: 52000,
        taxableIncome: 359600,
        federalTaxWithheld: 72500,
        estimatedTaxPayments: 22000,
        refundableCredits: 0,
        totalPayments: 94500,
        balanceDue: 8950,
        refund: 0
      }
    }
  }
];

// Utility function to get individual tax data by participant ID
export const getIndividualTaxDataById = (participantId: string): IndividualTaxReturnData | undefined => {
  return individualTaxReturnsData.find(data => data.participant_id === participantId);
};

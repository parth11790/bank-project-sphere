
export interface IndividualTaxReturnData {
  participant_id: string;
  name: string;
  years: {
    [year: string]: {
      adjustedGrossIncome: number;
      householdMembers: number;
      wages: number;
      interestDividend: number;
      alimonyReceived: number;
      iraDistributions: number;
      pensionsAnnuities: number;
      socialSecurityBenefits: number;
      scheduleCIncome: number;
      scheduleCDepreciation: number;
      scheduleCInterest: number;
      scheduleERentalIncome: number;
      scheduleERentalInterest: number;
      scheduleERentalDepreciation: number;
      scheduleFIncome: number;
      scheduleFInterest: number;
      scheduleFDepreciation: number;
      partnershipDistributions: number;
      capitalContributions: number;
      otherCashIncome: number;
      federalStateTaxes: number;
      otherExpenses: number;
    };
  };
}

export const individualTaxReturnsData: IndividualTaxReturnData[] = [
  {
    participant_id: "participant_1",
    name: "John Thompson",
    years: {
      "2023": {
        adjustedGrossIncome: 185000,
        householdMembers: 4,
        wages: 165000,
        interestDividend: 8500,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 45000,
        scheduleCDepreciation: 12000,
        scheduleCInterest: 2800,
        scheduleERentalIncome: 28000,
        scheduleERentalInterest: 5200,
        scheduleERentalDepreciation: 8500,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 15000,
        capitalContributions: -25000,
        otherCashIncome: 8000,
        federalStateTaxes: 42000,
        otherExpenses: 18500
      },
      "2022": {
        adjustedGrossIncome: 172000,
        householdMembers: 4,
        wages: 158000,
        interestDividend: 6200,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 38000,
        scheduleCDepreciation: 11500,
        scheduleCInterest: 2600,
        scheduleERentalIncome: 26400,
        scheduleERentalInterest: 4800,
        scheduleERentalDepreciation: 8200,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 12000,
        capitalContributions: -20000,
        otherCashIncome: 6500,
        federalStateTaxes: 38500,
        otherExpenses: 16800
      },
      "2021": {
        adjustedGrossIncome: 168000,
        householdMembers: 4,
        wages: 155000,
        interestDividend: 5800,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 32000,
        scheduleCDepreciation: 10800,
        scheduleCInterest: 2400,
        scheduleERentalIncome: 25200,
        scheduleERentalInterest: 4600,
        scheduleERentalDepreciation: 7900,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 10000,
        capitalContributions: -15000,
        otherCashIncome: 5200,
        federalStateTaxes: 36800,
        otherExpenses: 15200
      }
    }
  },
  {
    participant_id: "participant_2",
    name: "Sarah Mitchell",
    years: {
      "2023": {
        adjustedGrossIncome: 245000,
        householdMembers: 2,
        wages: 195000,
        interestDividend: 15000,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 12000,
        socialSecurityBenefits: 0,
        scheduleCIncome: 85000,
        scheduleCDepreciation: 18000,
        scheduleCInterest: 4200,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 35000,
        capitalContributions: -45000,
        otherCashIncome: 12000,
        federalStateTaxes: 68000,
        otherExpenses: 25000
      },
      "2022": {
        adjustedGrossIncome: 232000,
        householdMembers: 2,
        wages: 185000,
        interestDividend: 12500,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 11500,
        socialSecurityBenefits: 0,
        scheduleCIncome: 78000,
        scheduleCDepreciation: 16500,
        scheduleCInterest: 3800,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 32000,
        capitalContributions: -40000,
        otherCashIncome: 10500,
        federalStateTaxes: 62000,
        otherExpenses: 22500
      },
      "2021": {
        adjustedGrossIncome: 218000,
        householdMembers: 2,
        wages: 175000,
        interestDividend: 11000,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 11000,
        socialSecurityBenefits: 0,
        scheduleCIncome: 72000,
        scheduleCDepreciation: 15000,
        scheduleCInterest: 3500,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 28000,
        capitalContributions: -35000,
        otherCashIncome: 9500,
        federalStateTaxes: 58000,
        otherExpenses: 20000
      }
    }
  },
  {
    participant_id: "participant_3",
    name: "Michael Chen",
    years: {
      "2023": {
        adjustedGrossIncome: 125000,
        householdMembers: 3,
        wages: 95000,
        interestDividend: 3200,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 45000,
        scheduleCDepreciation: 8500,
        scheduleCInterest: 1800,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 0,
        capitalContributions: 0,
        otherCashIncome: 5000,
        federalStateTaxes: 28000,
        otherExpenses: 12000
      },
      "2022": {
        adjustedGrossIncome: 118000,
        householdMembers: 3,
        wages: 92000,
        interestDividend: 2800,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 38000,
        scheduleCDepreciation: 7800,
        scheduleCInterest: 1600,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 0,
        capitalContributions: 0,
        otherCashIncome: 4200,
        federalStateTaxes: 25500,
        otherExpenses: 11000
      },
      "2021": {
        adjustedGrossIncome: 112000,
        householdMembers: 3,
        wages: 88000,
        interestDividend: 2500,
        alimonyReceived: 0,
        iraDistributions: 0,
        pensionsAnnuities: 0,
        socialSecurityBenefits: 0,
        scheduleCIncome: 35000,
        scheduleCDepreciation: 7200,
        scheduleCInterest: 1500,
        scheduleERentalIncome: 0,
        scheduleERentalInterest: 0,
        scheduleERentalDepreciation: 0,
        scheduleFIncome: 0,
        scheduleFInterest: 0,
        scheduleFDepreciation: 0,
        partnershipDistributions: 0,
        capitalContributions: 0,
        otherCashIncome: 3800,
        federalStateTaxes: 23500,
        otherExpenses: 10200
      }
    }
  }
];

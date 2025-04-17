
import { useState, useCallback } from 'react';

interface LoanPayment {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
}

export const useLoanCalculator = () => {
  // Calculate loan payment using the standard amortization formula
  const calculateLoanPayment = useCallback((
    principal: number,
    annualInterestRate: number,
    amortizationMonths: number
  ): LoanPayment => {
    // Convert annual interest rate to monthly
    const monthlyRate = annualInterestRate / 100 / 12;
    
    // Calculate monthly payment using the amortization formula
    let monthlyPayment = 0;
    
    if (monthlyRate === 0) {
      // For 0% interest loans, simply divide the principal by the term
      monthlyPayment = principal / amortizationMonths;
    } else {
      // Standard amortization formula: PMT = P * r * (1+r)^n / ((1+r)^n - 1)
      monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, amortizationMonths)) / 
        (Math.pow(1 + monthlyRate, amortizationMonths) - 1);
    }
    
    const totalPayments = monthlyPayment * amortizationMonths;
    const totalInterest = totalPayments - principal;
    
    return {
      monthlyPayment,
      totalPayments,
      totalInterest
    };
  }, []);

  return {
    calculateLoanPayment
  };
};

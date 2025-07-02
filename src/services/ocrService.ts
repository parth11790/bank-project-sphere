import { toast } from 'sonner';

export interface ParsedFormData {
  [fieldName: string]: string;
}

export interface OCRResult {
  success: boolean;
  data?: ParsedFormData;
  error?: string;
}

// Mock OCR service - in production, this would integrate with services like:
// - Tesseract.js for client-side OCR
// - AWS Textract, Google Vision API, or Azure Form Recognizer for server-side
// - Specialized tax document parsing services
class OCRService {
  
  // Parse Business Tax Returns
  async parseBusinessTaxReturn(file: File, year: string): Promise<OCRResult> {
    toast.loading('Parsing tax return document...', { id: 'ocr-processing' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data based on common tax form fields
      const mockParsedData: ParsedFormData = {
        [`grossReceipts_${year}`]: '1450000',
        [`costOfGoodsSold_${year}`]: '875000',
        [`totalDeductions_${year}`]: '325000',
        [`netIncome_${year}`]: '250000',
        [`depreciation_${year}`]: '45000',
        [`amortization_${year}`]: '12000',
        [`officersCompensation_${year}`]: '180000',
        [`rentExpense_${year}`]: '85000',
        [`interestExpense_${year}`]: '28000'
      };
      
      toast.success('Document parsed successfully! Review auto-filled values.', { id: 'ocr-processing' });
      
      return {
        success: true,
        data: mockParsedData
      };
    } catch (error) {
      toast.error('Failed to parse document. Please enter values manually.', { id: 'ocr-processing' });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Parse Individual Tax Returns
  async parseIndividualTaxReturn(file: File, year: string): Promise<OCRResult> {
    toast.loading('Parsing tax return document...', { id: 'ocr-processing' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Mock parsed data based on 1040 form fields
      const mockParsedData: ParsedFormData = {
        [`adjustedGrossIncome_${year}`]: '165000',
        [`wages_${year}`]: '145000',
        [`interestDividend_${year}`]: '3200',
        [`scheduleCIncome_${year}`]: '28000',
        [`scheduleCDepreciation_${year}`]: '8500',
        [`federalStateTaxes_${year}`]: '32000',
        [`householdMembers_${year}`]: '3'
      };
      
      toast.success('Document parsed successfully! Review auto-filled values.', { id: 'ocr-processing' });
      
      return {
        success: true,
        data: mockParsedData
      };
    } catch (error) {
      toast.error('Failed to parse document. Please enter values manually.', { id: 'ocr-processing' });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Parse Financial Statements
  async parseFinancialStatement(file: File): Promise<OCRResult> {
    toast.loading('Parsing financial statement...', { id: 'ocr-processing' });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock parsed data for balance sheet or P&L
      const mockParsedData: ParsedFormData = {
        'totalAssets': '2450000',
        'totalLiabilities': '1180000',
        'equity': '1270000',
        'revenue': '3250000',
        'expenses': '2890000',
        'netIncome': '360000'
      };
      
      toast.success('Financial statement parsed successfully!', { id: 'ocr-processing' });
      
      return {
        success: true,
        data: mockParsedData
      };
    } catch (error) {
      toast.error('Failed to parse financial statement.', { id: 'ocr-processing' });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Determine document type and parse accordingly
  async parseDocument(file: File, formType: string, year?: string): Promise<OCRResult> {
    const fileName = file.name.toLowerCase();
    
    // Determine parsing method based on form type and file name
    if (formType === 'Business Tax Returns' || fileName.includes('1120') || fileName.includes('tax')) {
      return this.parseBusinessTaxReturn(file, year || '2023');
    } else if (formType === 'Tax Returns' || fileName.includes('1040')) {
      return this.parseIndividualTaxReturn(file, year || '2023');
    } else if (fileName.includes('balance') || fileName.includes('financial') || fileName.includes('statement')) {
      return this.parseFinancialStatement(file);
    } else {
      // Generic document parsing
      return this.parseFinancialStatement(file);
    }
  }
}

export const ocrService = new OCRService();
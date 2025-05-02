
import { CustomizationLevel, DropdownField } from '../dropdownTypes';

export const environmentalDropdownFields: DropdownField[] = [
  {
    id: 'environmentalReviewType',
    label: 'Environmental Review Type',
    description: 'Types of environmental reviews required for commercial real estate (Based on SOP 50 10 8, Section A, Ch 5, E)',
    customizationLevel: 'SBA Defined',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Environmental Questionnaire (EQ)',
      'Records Search w/ Risk Assessment (RSRA)',
      'Transaction Screen Assessment (TSA)',
      'Phase I ESA',
      'Phase II ESA',
      'Remediation Plan Review',
      'No Review Required'
    ]
  },
  {
    id: 'environmentalReviewStatus',
    label: 'Environmental Review Status',
    description: 'Current status of environmental review process',
    customizationLevel: 'Lender Customizable',
    module: 'Application Processing & Underwriting',
    initialValues: [
      'Pending Determination',
      'EQ Completed - OK',
      'RSRA Completed - Low Risk',
      'RSRA Completed - Elevated/High Risk (Phase I Req\'d)',
      'TSA Completed - OK',
      'TSA Completed - Further Action Req\'d',
      'Phase I Completed - OK',
      'Phase I Completed - Phase II Req\'d',
      'Phase II Completed - OK',
      'Phase II Completed - Remediation Req\'d',
      'Remediation Plan Submitted to SBA',
      'Remediation Ongoing',
      'Remediation Complete - NFA Received',
      'SBA Concurrence Pending',
      'SBA Concurrence Received'
    ]
  }
];

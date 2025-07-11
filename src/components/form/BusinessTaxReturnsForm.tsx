import React, { useState } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import BusinessTaxReturnHeader from './business/BusinessTaxReturnHeader';
import BusinessTaxReturnTableHeader from './business/BusinessTaxReturnTableHeader';
import BusinessTaxReturnRow from './business/BusinessTaxReturnRow';
import BusinessTaxSectionHeader from './business/BusinessTaxSectionHeader';
import CustomAddBackManager from './business/CustomAddBackManager';
import { fieldNotes, formFields } from './business/businessTaxFieldConfig';
import EnhancedDocumentUpload from './EnhancedDocumentUpload';

interface CustomAddBackRow {
  id: string;
  label: string;
  fieldName: string;
}

interface BusinessTaxReturnsFormProps {
  formValues: Record<string, string>;
  calculatedValues: {
    grossIncome: number;
    netIncome: number;
    totalDeductions: number;
    grossProfit: number;
    grossMargin: number;
    operatingCashFlow: number;
  };
  onInputChange: (field: string, value: string) => void;
}

const BusinessTaxReturnsForm: React.FC<BusinessTaxReturnsFormProps> = ({
  formValues,
  calculatedValues,
  onInputChange
}) => {
  const [selectedYears, setSelectedYears] = useState<string[]>(['2023', '2022', '2021']);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [customAddBackRows, setCustomAddBackRows] = useState<CustomAddBackRow[]>([]);
  const availableYears = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];

  const handleYearChange = (index: number, year: string) => {
    const newYears = [...selectedYears];
    newYears[index] = year;
    setSelectedYears(newYears);
  };

  const addYear = () => {
    const nextAvailableYear = availableYears.find(year => !selectedYears.includes(year));
    if (nextAvailableYear && selectedYears.length < 8) {
      setSelectedYears([...selectedYears, nextAvailableYear]);
    }
  };

  const removeYear = (index: number) => {
    if (selectedYears.length > 1) {
      const newYears = selectedYears.filter((_, i) => i !== index);
      setSelectedYears(newYears);
    }
  };

  const handleFileUpload = (year: string, file: File | null) => {
    setUploadedFiles(prev => ({
      ...prev,
      [year]: file
    }));
  };

  const handleOCRDataParsed = (year: string) => (data: Record<string, string>) => {
    // Apply parsed data to form values
    Object.entries(data).forEach(([fieldName, value]) => {
      if (fieldName.endsWith(`_${year}`)) {
        onInputChange(fieldName, value);
      }
    });
  };

  const handleAddCustomRow = (row: CustomAddBackRow) => {
    setCustomAddBackRows(prev => [...prev, row]);
  };

  const handleRemoveCustomRow = (id: string) => {
    setCustomAddBackRows(prev => prev.filter(row => row.id !== id));
  };

  // Group fields by section
  const regularFields = formFields.filter(field => !field.isSection && field.fieldName !== 'operatingCashFlow');
  const addBackFields = formFields.filter(field => field.isSection === 'addback');
  const cashFlowFields = formFields.filter(field => field.fieldName === 'operatingCashFlow');

  return (
    <Card>
      <BusinessTaxReturnHeader 
        selectedYears={selectedYears}
        onAddYear={addYear}
      />
      <CardContent>
        <div className="space-y-6">
          <Table>
            <BusinessTaxReturnTableHeader 
              selectedYears={selectedYears}
              availableYears={availableYears}
              uploadedFiles={uploadedFiles}
              onYearChange={handleYearChange}
              onRemoveYear={removeYear}
              onFileUpload={handleFileUpload}
            />
            <TableBody>
              {regularFields.map((field) => (
                <BusinessTaxReturnRow
                  key={field.fieldName}
                  fieldName={field.fieldName}
                  label={field.label}
                  selectedYears={selectedYears}
                  formValues={formValues}
                  calculatedValues={calculatedValues}
                  fieldNotes={fieldNotes}
                  onInputChange={onInputChange}
                  isIncome={field.isIncome}
                  isExpense={field.isExpense}
                  isCalculated={field.isCalculated}
                  category={field.category}
                />
              ))}
              
              {(addBackFields.length > 0 || customAddBackRows.length > 0) && (
                <>
                  <BusinessTaxSectionHeader 
                    title="Add back / Adjustments" 
                    colSpan={selectedYears.length + 2}
                  />
                  {addBackFields.map((field) => (
                    <BusinessTaxReturnRow
                      key={field.fieldName}
                      fieldName={field.fieldName}
                      label={field.label}
                      selectedYears={selectedYears}
                      formValues={formValues}
                      calculatedValues={calculatedValues}
                      fieldNotes={fieldNotes}
                      onInputChange={onInputChange}
                      isIncome={field.isIncome}
                      isExpense={field.isExpense}
                      isCalculated={field.isCalculated}
                      category={field.category}
                    />
                  ))}
                  {customAddBackRows.map((customRow) => (
                    <BusinessTaxReturnRow
                      key={customRow.id}
                      fieldName={customRow.fieldName}
                      label={customRow.label}
                      selectedYears={selectedYears}
                      formValues={formValues}
                      calculatedValues={calculatedValues}
                      fieldNotes={{ [customRow.fieldName]: 'Custom add-back adjustment for cash flow analysis' }}
                      onInputChange={onInputChange}
                      isIncome={true}
                      isExpense={false}
                      isCalculated={false}
                      category="Adjustments"
                    />
                  ))}
                </>
              )}

              {/* Operating Cash Flow section - moved after add-back adjustments */}
              {cashFlowFields.map((field) => (
                <BusinessTaxReturnRow
                  key={field.fieldName}
                  fieldName={field.fieldName}
                  label={field.label}
                  selectedYears={selectedYears}
                  formValues={formValues}
                  calculatedValues={calculatedValues}
                  fieldNotes={fieldNotes}
                  onInputChange={onInputChange}
                  isIncome={field.isIncome}
                  isExpense={field.isExpense}
                  isCalculated={field.isCalculated}
                  category={field.category}
                />
              ))}
            </TableBody>
          </Table>
          
          <CustomAddBackManager
            customRows={customAddBackRows}
            onAddRow={handleAddCustomRow}
            onRemoveRow={handleRemoveCustomRow}
          />

          {/* Enhanced document upload with OCR for each year */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Upload & Auto-Fill</h3>
            <div className="grid gap-4">
              {selectedYears.map((year) => (
                <EnhancedDocumentUpload
                  key={`enhanced-upload-${year}`}
                  file={uploadedFiles[year] || null}
                  setFile={(file) => handleFileUpload(year, file)}
                  formType="Business Tax Returns"
                  year={year}
                  onDataParsed={handleOCRDataParsed(year)}
                  title={`${year} Tax Return Document`}
                  description={`Upload ${year} business tax return to auto-fill form fields`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessTaxReturnsForm;

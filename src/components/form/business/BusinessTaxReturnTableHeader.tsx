
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Upload } from 'lucide-react';

interface BusinessTaxReturnTableHeaderProps {
  selectedYears: string[];
  availableYears: string[];
  uploadedFiles: Record<string, File | null>;
  onYearChange: (index: number, year: string) => void;
  onRemoveYear: (index: number) => void;
  onFileUpload: (year: string, file: File | null) => void;
}

const BusinessTaxReturnTableHeader: React.FC<BusinessTaxReturnTableHeaderProps> = ({
  selectedYears,
  availableYears,
  uploadedFiles,
  onYearChange,
  onRemoveYear,
  onFileUpload
}) => {
  const renderUploadCell = (year: string) => {
    return (
      <TableHead className="text-center p-2">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-2 text-center">
          <input
            type="file"
            id={`business-tax-return-${year}`}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => onFileUpload(year, e.target.files?.[0] || null)}
            className="hidden"
          />
          <label
            htmlFor={`business-tax-return-${year}`}
            className="cursor-pointer flex flex-col items-center gap-1"
          >
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {uploadedFiles[year] ? uploadedFiles[year]?.name?.substring(0, 10) + '...' : 'Upload'}
            </span>
          </label>
        </div>
      </TableHead>
    );
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/3">Field</TableHead>
        {selectedYears.map((year, index) => (
          <TableHead key={year} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Select value={year} onValueChange={(value) => onYearChange(index, value)}>
                <SelectTrigger className="w-full font-bold text-blue-600 border-none shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((availableYear) => (
                    <SelectItem key={availableYear} value={availableYear}>
                      {availableYear}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedYears.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveYear(index)}
                  className="h-6 w-6 p-0 text-destructive"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              )}
            </div>
          </TableHead>
        ))}
      </TableRow>
      
      {/* Document Upload Row */}
      <TableRow className="bg-muted/50">
        <TableHead className="font-medium">Business Tax Return Documents</TableHead>
        {selectedYears.map((year) => (
          <TableHead key={`upload-${year}`} className="text-center p-2">
            {renderUploadCell(year)}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default BusinessTaxReturnTableHeader;

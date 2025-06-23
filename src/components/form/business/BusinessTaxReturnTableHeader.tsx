
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

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
  const handleFileChange = (year: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileUpload(year, file);
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-32 font-bold">Category</TableHead>
        <TableHead className="w-1/3 font-bold">Field</TableHead>
        {selectedYears.map((year, index) => (
          <TableHead key={year} className="text-center min-w-[150px]">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <Select value={year} onValueChange={(value) => onYearChange(index, value)}>
                  <SelectTrigger className="w-20 h-8 text-xs">
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
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveYear(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <label htmlFor={`file-upload-${year}`} className="cursor-pointer">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <Upload className="h-3 w-3" />
                    <span>Upload</span>
                  </div>
                </label>
                <input
                  id={`file-upload-${year}`}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(year, e)}
                  className="hidden"
                />
                {uploadedFiles[year] && (
                  <div className="text-xs text-green-600 truncate w-full text-center">
                    {uploadedFiles[year]!.name.substring(0, 15)}...
                  </div>
                )}
              </div>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default BusinessTaxReturnTableHeader;

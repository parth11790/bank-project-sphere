
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

interface BusinessTaxSectionHeaderProps {
  title: string;
  colSpan: number;
}

const BusinessTaxSectionHeader: React.FC<BusinessTaxSectionHeaderProps> = ({ title, colSpan }) => {
  return (
    <TableRow className="bg-primary/5 border-b-2 border-primary/20">
      <TableCell 
        colSpan={colSpan} 
        className="font-bold text-primary text-center py-3 text-sm uppercase tracking-wide"
      >
        {title}
      </TableCell>
    </TableRow>
  );
};

export default BusinessTaxSectionHeader;

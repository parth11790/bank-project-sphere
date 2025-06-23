
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

interface BusinessTaxSectionHeaderProps {
  title: string;
  colSpan: number;
}

const BusinessTaxSectionHeader: React.FC<BusinessTaxSectionHeaderProps> = ({
  title,
  colSpan
}) => {
  return (
    <TableRow className="bg-muted/50">
      <TableCell colSpan={colSpan} className="font-bold text-lg p-4 text-center">
        {title}
      </TableCell>
    </TableRow>
  );
};

export default BusinessTaxSectionHeader;


import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

const IncomeStatementAnalysis: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="bg-muted/50 py-4">
        <div className="font-semibold mb-2">Income Statement Analysis</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Revenue trends:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Increasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Decreasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Consistent
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Inconsistent
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">COGS:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Increasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Decreasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Consistent
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Inconsistent
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Operating expenses:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Increasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Decreasing
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Consistent
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" /> Inconsistent
              </label>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default IncomeStatementAnalysis;

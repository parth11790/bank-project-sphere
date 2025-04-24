
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface LoanSetting {
  id: string;
  loanType: string;
  amountMin: number;
  amountMax: number;
  interestRate: number;
  term: number;
}

interface LoanSettingsListProps {
  settings: LoanSetting[];
  onDeleteSetting: (id: string) => void;
}

const LoanSettingsList = ({ settings, onDeleteSetting }: LoanSettingsListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Current Loan Settings</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount Range</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell>{setting.loanType}</TableCell>
                <TableCell>${setting.amountMin.toLocaleString()} - ${setting.amountMax.toLocaleString()}</TableCell>
                <TableCell>{setting.interestRate}%</TableCell>
                <TableCell>{setting.term} years</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteSetting(setting.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoanSettingsList;

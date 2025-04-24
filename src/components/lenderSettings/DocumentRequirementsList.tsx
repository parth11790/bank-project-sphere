
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

interface DocumentRequirement {
  id: string;
  loanType: string;
  participantType: string;
  formName: string;
}

interface DocumentRequirementsListProps {
  requirements: DocumentRequirement[];
  onDeleteRequirement: (id: string) => void;
}

const DocumentRequirementsList = ({ requirements, onDeleteRequirement }: DocumentRequirementsListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Current Document Requirements</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Type</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.loanType}</TableCell>
                <TableCell>{form.participantType}</TableCell>
                <TableCell>{form.formName}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDeleteRequirement(form.id)}
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

export default DocumentRequirementsList;

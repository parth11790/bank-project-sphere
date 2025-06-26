
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Trash2, Eye, History } from 'lucide-react';
import { SavedPreApprovalLetter } from './usePreApprovalLetter';
import { toast } from 'sonner';

interface PreApprovalLetterHistoryProps {
  letters: SavedPreApprovalLetter[];
  onDelete: (letterId: string) => Promise<boolean>;
  onDownload: (letterContent: string, applicantName: string, date: string) => void;
}

export const PreApprovalLetterHistory: React.FC<PreApprovalLetterHistoryProps> = ({
  letters,
  onDelete,
  onDownload
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (letterId: string) => {
    if (window.confirm('Are you sure you want to delete this pre-approval letter? This action cannot be undone.')) {
      try {
        const success = await onDelete(letterId);
        if (success) {
          toast.success('Letter deleted successfully');
        } else {
          toast.error('Failed to delete letter');
        }
      } catch (error) {
        toast.error('Error deleting letter');
      }
    }
  };

  const handlePreview = (letter: SavedPreApprovalLetter) => {
    // Create a modal or new window to show the letter content
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Pre-Approval Letter - ${letter.applicant_name}</title>
            <style>
              body { font-family: 'Courier New', monospace; padding: 20px; white-space: pre-wrap; }
            </style>
          </head>
          <body>${letter.letter_content}</body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-amber-500" />
          <CardTitle>Letter History</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Previously generated pre-approval letters for compliance and audit purposes
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Generated</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Loans Included</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {letters.map((letter) => (
                <TableRow key={letter.letter_id}>
                  <TableCell className="font-mono text-sm">
                    {formatDate(letter.generated_date)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {letter.applicant_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatCurrency(letter.total_loan_amount)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {letter.loans_included.map((loan, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {loan.loan_type}: {formatCurrency(loan.amount)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(letter)}
                        title="Preview Letter"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(
                          letter.letter_content,
                          letter.applicant_name,
                          letter.generated_date.split('T')[0]
                        )}
                        title="Download Letter"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(letter.letter_id)}
                        title="Delete Letter"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Eye, ChevronDown, ChevronUp, FileText, User, Users, Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DocumentRequirement {
  id: string;
  loanType: string;
  participantType: string;
  formName: string;
  loanAmountMin?: number;
  loanAmountMax?: number;
  description?: string;
  isRequired?: boolean;
  documentGenerationType?: string[];
}

interface DocumentRequirementsListProps {
  requirements: DocumentRequirement[];
  onDeleteRequirement: (id: string) => void;
  onViewRequirement?: (requirement: DocumentRequirement) => void;
}

const DocumentRequirementsList = ({ 
  requirements, 
  onDeleteRequirement,
  onViewRequirement
}: DocumentRequirementsListProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getParticipantIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'borrower':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'seller':
        return <Building className="h-4 w-4 text-amber-500" />;
      case 'buyer':
        return <User className="h-4 w-4 text-green-500" />;
      case 'guarantor':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Current Document Requirements</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Loan Type</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirements.map((form) => (
              <React.Fragment key={form.id}>
                <TableRow className="hover:bg-muted/50">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleRow(form.id)}
                    >
                      {expandedRows[form.id] ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell>{form.loanType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getParticipantIcon(form.participantType)}
                      {form.participantType}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {form.formName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDeleteRequirement(form.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                      {onViewRequirement && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewRequirement(form)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedRows[form.id] && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-muted/30 p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Loan Amount Range</h4>
                            <p className="text-sm">
                              ${form.loanAmountMin?.toLocaleString() || '0'} - ${form.loanAmountMax?.toLocaleString() || 'No limit'}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-2">Required</h4>
                            <Badge variant={form.isRequired ? "default" : "outline"}>
                              {form.isRequired ? 'Required' : 'Optional'}
                            </Badge>
                          </div>
                        </div>
                        
                        {form.description && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{form.description}</p>
                          </div>
                        )}
                        
                        {form.documentGenerationType && form.documentGenerationType.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Used For Document Generation</h4>
                            <div className="flex flex-wrap gap-2">
                              {form.documentGenerationType.map((docType, idx) => (
                                <TooltipProvider key={idx}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        {docType}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">Used for {docType} generation</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentRequirementsList;

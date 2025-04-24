
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, ChevronDown, ChevronUp, FileCheck, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface LoanSetting {
  id: string;
  loanType: string;
  amountMin: number;
  amountMax: number;
  interestRate: number;
  term: number;
  amortization?: number;
  softCostPercentage?: number;
  requiredForms?: {
    borrower: string[];
    buyer?: string[];
    seller?: string[];
    guarantor?: string[];
  };
  requiredDocuments?: {
    creditCheck?: boolean;
    backgroundCheck?: boolean;
    bankruptcyReport?: boolean;
    underwritingDocuments?: boolean;
    closingReport?: boolean;
  };
}

interface LoanSettingsListProps {
  settings: LoanSetting[];
  onDeleteSetting: (id: string) => void;
  onViewDetails?: (setting: LoanSetting) => void;
}

const LoanSettingsList = ({ settings, onDeleteSetting, onViewDetails }: LoanSettingsListProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Current Loan Settings</h3>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount Range</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.map((setting) => (
              <React.Fragment key={setting.id}>
                <TableRow className="hover:bg-muted/50">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleRow(setting.id)}
                    >
                      {expandedRows[setting.id] ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell>{setting.loanType}</TableCell>
                  <TableCell>${setting.amountMin.toLocaleString()} - ${setting.amountMax.toLocaleString()}</TableCell>
                  <TableCell>{setting.interestRate}%</TableCell>
                  <TableCell>{setting.term} years</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDeleteSetting(setting.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                      {onViewDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewDetails(setting)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedRows[setting.id] && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/30 p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Additional Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Amortization:</div>
                              <div>{setting.amortization || '-'} months</div>
                              <div>Soft Costs:</div>
                              <div>{setting.softCostPercentage || '-'}%</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-2">Required Document Generation</h4>
                            <div className="flex flex-wrap gap-2">
                              {setting.requiredDocuments?.creditCheck && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Credit Check
                                </Badge>
                              )}
                              {setting.requiredDocuments?.backgroundCheck && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Background Check
                                </Badge>
                              )}
                              {setting.requiredDocuments?.bankruptcyReport && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Bankruptcy Report
                                </Badge>
                              )}
                              {setting.requiredDocuments?.underwritingDocuments && (
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Underwriting Docs
                                </Badge>
                              )}
                              {setting.requiredDocuments?.closingReport && (
                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                  <FileCheck className="h-3 w-3 mr-1" />
                                  Closing Report
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Required Forms By Participant</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-1">Borrower</h5>
                              <div className="space-y-1">
                                {setting.requiredForms?.borrower?.map((form, idx) => (
                                  <div key={idx} className="text-xs bg-muted/50 p-1 px-2 rounded-sm flex items-center">
                                    <FileText className="h-3 w-3 mr-1 text-muted-foreground" /> {form}
                                  </div>
                                ))}
                                {!setting.requiredForms?.borrower?.length && (
                                  <div className="text-xs text-muted-foreground">No forms required</div>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-1">Seller</h5>
                              <div className="space-y-1">
                                {setting.requiredForms?.seller?.map((form, idx) => (
                                  <div key={idx} className="text-xs bg-muted/50 p-1 px-2 rounded-sm flex items-center">
                                    <FileText className="h-3 w-3 mr-1 text-muted-foreground" /> {form}
                                  </div>
                                ))}
                                {!setting.requiredForms?.seller?.length && (
                                  <div className="text-xs text-muted-foreground">No forms required</div>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-medium text-muted-foreground mb-1">Buyer</h5>
                              <div className="space-y-1">
                                {setting.requiredForms?.buyer?.map((form, idx) => (
                                  <div key={idx} className="text-xs bg-muted/50 p-1 px-2 rounded-sm flex items-center">
                                    <FileText className="h-3 w-3 mr-1 text-muted-foreground" /> {form}
                                  </div>
                                ))}
                                {!setting.requiredForms?.buyer?.length && (
                                  <div className="text-xs text-muted-foreground">No forms required</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
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

export default LoanSettingsList;

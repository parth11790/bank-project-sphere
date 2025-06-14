
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Save, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const LoanDetails = () => {
  const navigate = useNavigate();
  const { projectId, loanId } = useParams();
  
  // Basic loan information
  const [loanType, setLoanType] = useState('SBA 504 Debenture');
  const [amount, setAmount] = useState('475000');
  const [term, setTerm] = useState('300');
  const [interestRate, setInterestRate] = useState('4.50');
  const [purpose, setPurpose] = useState('Real estate acquisition');
  const [sbaGuaranty, setSbaGuaranty] = useState('40');
  const [sbaGuarantyFee, setSbaGuarantyFee] = useState('N/A');
  const [status, setStatus] = useState('Underwriting');

  // Loan conditions and covenants
  const [conditions, setConditions] = useState([
    {
      id: '1',
      type: 'Closing Condition',
      description: 'Phase I Environmental Report',
      status: 'Satisfied',
      dueDate: null,
      completedDate: new Date('2025-04-19'),
      notes: ''
    },
    {
      id: '2',
      type: 'Closing Condition',
      description: 'Real estate appraisal',
      status: 'Satisfied',
      dueDate: null,
      completedDate: new Date('2025-04-21'),
      notes: ''
    },
    {
      id: '3',
      type: 'Covenant',
      description: 'Annual financial statement submission',
      status: 'Pending',
      dueDate: null,
      completedDate: null,
      notes: ''
    }
  ]);

  // Important dates
  const [closingDate, setClosingDate] = useState(null);
  const [firstDisbursement, setFirstDisbursement] = useState('Not yet disbursed');
  const [finalDisbursement, setFinalDisbursement] = useState('Not yet fully disbursed');

  const isNewLoan = loanId === 'new';

  const handleSave = () => {
    console.log('Saving loan details...');
    navigate(`/project/${projectId}`);
  };

  const addCondition = () => {
    const newCondition = {
      id: Date.now().toString(),
      type: 'Closing Condition',
      description: '',
      status: 'Pending',
      dueDate: null,
      completedDate: null,
      notes: ''
    };
    setConditions([...conditions, newCondition]);
  };

  const updateCondition = (id: string, field: string, value: any) => {
    setConditions(conditions.map(condition => 
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(`/project/${projectId}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {isNewLoan ? 'New Loan' : `${loanType}`}
              </h1>
              <p className="text-muted-foreground">
                Project ID: {projectId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={status === 'Underwriting' ? 'secondary' : 'default'}>
              {status}
            </Badge>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Basic Loan Information */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
            <CardDescription>Basic loan details and terms</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term (months)</Label>
              <Input
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Enter term in months"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Real estate acquisition">Real estate acquisition</SelectItem>
                  <SelectItem value="Business acquisition">Business acquisition</SelectItem>
                  <SelectItem value="Equipment financing">Equipment financing</SelectItem>
                  <SelectItem value="Working capital">Working capital</SelectItem>
                  <SelectItem value="Manufacturing expansion">Manufacturing expansion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sba-guaranty">SBA Guaranty (%)</Label>
              <Input
                id="sba-guaranty"
                value={sbaGuaranty}
                onChange={(e) => setSbaGuaranty(e.target.value)}
                placeholder="Enter SBA guaranty percentage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sba-guaranty-fee">SBA Guaranty Fee</Label>
              <Input
                id="sba-guaranty-fee"
                value={sbaGuarantyFee}
                onChange={(e) => setSbaGuarantyFee(e.target.value)}
                placeholder="Enter SBA guaranty fee"
              />
            </div>
          </CardContent>
        </Card>

        {/* Loan Conditions and Covenants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Loan Conditions and Covenants</CardTitle>
                <CardDescription>Track closing conditions and ongoing covenants</CardDescription>
              </div>
              <Button onClick={addCondition} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Condition
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conditions.map((condition) => (
                  <TableRow key={condition.id}>
                    <TableCell>
                      <Select 
                        value={condition.type} 
                        onValueChange={(value) => updateCondition(condition.id, 'type', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Closing Condition">Closing Condition</SelectItem>
                          <SelectItem value="Covenant">Covenant</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={condition.description}
                        onChange={(e) => updateCondition(condition.id, 'description', e.target.value)}
                        placeholder="Enter description"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={condition.status} 
                        onValueChange={(value) => updateCondition(condition.id, 'status', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Satisfied">Satisfied</SelectItem>
                          <SelectItem value="Waived">Waived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={condition.dueDate ? format(condition.dueDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => updateCondition(condition.id, 'dueDate', e.target.value ? new Date(e.target.value) : null)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={condition.completedDate ? format(condition.completedDate, 'yyyy-MM-dd') : ''}
                        onChange={(e) => updateCondition(condition.id, 'completedDate', e.target.value ? new Date(e.target.value) : null)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={condition.notes}
                        onChange={(e) => updateCondition(condition.id, 'notes', e.target.value)}
                        placeholder="Add notes"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card>
          <CardHeader>
            <CardTitle>Important Dates</CardTitle>
            <CardDescription>Key milestones and disbursement information</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Closing Date</Label>
              <Input
                type="date"
                value={closingDate ? format(closingDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setClosingDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>

            <div className="space-y-2">
              <Label>First Disbursement</Label>
              <Input
                value={firstDisbursement}
                onChange={(e) => setFirstDisbursement(e.target.value)}
                placeholder="Enter first disbursement info"
              />
            </div>

            <div className="space-y-2">
              <Label>Final Disbursement</Label>
              <Input
                value={finalDisbursement}
                onChange={(e) => setFinalDisbursement(e.target.value)}
                placeholder="Enter final disbursement info"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default LoanDetails;

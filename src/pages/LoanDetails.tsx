
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
import { projects } from '@/lib/mockData/projects';

const LoanDetails = () => {
  const navigate = useNavigate();
  const { projectId, loanId } = useParams();
  
  // Get project data
  const project = projects.find(p => p.project_id === projectId);
  
  // Basic loan information
  const [loanType, setLoanType] = useState('7(a) PLP');
  const [loanAmount, setLoanAmount] = useState('850000');
  const [sbaGuarantyFee, setSbaGuarantyFee] = useState('25000.00');
  const [lobOriginationFee, setLobOriginationFee] = useState('2000.00');
  
  // Index and Adjustment
  const [index, setIndex] = useState('Wall Street Journal');
  const [adjustment, setAdjustment] = useState('Adjusts every 5 years');
  
  // Rates
  const [uwRate, setUwRate] = useState('7.75');
  const [actualRate, setActualRate] = useState('7.50');
  const [asOfDate, setAsOfDate] = useState('9/18/25');
  
  // Terms
  const [loanTerm, setLoanTerm] = useState('10');
  const [interestOnly, setInterestOnly] = useState('1');
  const [amortization, setAmortization] = useState('119');
  const [pmtFreq, setPmtFreq] = useState('Monthly');
  const [accrual, setAccrual] = useState('365');
  
  // Spread and Interest Rate
  const [spread, setSpread] = useState('3.00');
  const [intRate, setIntRate] = useState('10.75');
  
  // Payments
  const [uwRatePayment, setUwRatePayment] = useState('17807.29');
  const [actualPayment, setActualPayment] = useState('17625.15');
  const [interestOnlyPayment, setInterestOnlyPayment] = useState('11375.00');
  
  // Notes and Prepayment
  const [notes, setNotes] = useState('Two interest rates have been shown above: the actual rate and the UW rate. The UW rate is being pulled into cash flow analysis to show a more conservative scenario in a rising rate environment. The Actual Rate will be used for all Closing documents.');
  const [prepaymentPenalty, setPrepaymentPenalty] = useState('');
  
  // Legacy fields
  const [purpose, setPurpose] = useState('Real estate acquisition');
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

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'default';
      default: return 'secondary';
    }
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
                {isNewLoan ? 'New Loan' : (project?.project_name || 'Unknown Project')}
              </h1>
              <p className="text-muted-foreground">
                Project ID: {projectId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusVariant(project?.status || 'pending')}>
              {project?.status ? project.status.charAt(0).toUpperCase() + project.status.slice(1) : 'Pending'}
            </Badge>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Enhanced Loan Information */}
        <Card>
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
            <CardDescription>Comprehensive loan details and terms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Loan Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan-type">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7(a) PLP">7(a) PLP</SelectItem>
                    <SelectItem value="SBA 7(a)">SBA 7(a)</SelectItem>
                    <SelectItem value="SBA 504 Debenture">SBA 504 Debenture</SelectItem>
                    <SelectItem value="Commercial Real Estate">Commercial Real Estate</SelectItem>
                    <SelectItem value="Business Acquisition">Business Acquisition</SelectItem>
                    <SelectItem value="Equipment Financing">Equipment Financing</SelectItem>
                    <SelectItem value="Working Capital">Working Capital</SelectItem>
                    <SelectItem value="Line of Credit">Line of Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-amount">Loan Amount ($)</Label>
                <Input
                  id="loan-amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
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

              <div className="space-y-2">
                <Label htmlFor="lob-origination-fee">LOB Origination Fee</Label>
                <Input
                  id="lob-origination-fee"
                  value={lobOriginationFee}
                  onChange={(e) => setLobOriginationFee(e.target.value)}
                  placeholder="Enter LOB origination fee"
                />
              </div>
            </div>

            {/* Index and Adjustment Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="index">Index</Label>
                <Select value={index} onValueChange={setIndex}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wall Street Journal">Wall Street Journal</SelectItem>
                    <SelectItem value="Prime Rate">Prime Rate</SelectItem>
                    <SelectItem value="LIBOR">LIBOR</SelectItem>
                    <SelectItem value="SOFR">SOFR</SelectItem>
                    <SelectItem value="Treasury">Treasury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustment">Adjustment</Label>
                <Select value={adjustment} onValueChange={setAdjustment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Adjusts every 5 years">Adjusts every 5 years</SelectItem>
                    <SelectItem value="Adjusts annually">Adjusts annually</SelectItem>
                    <SelectItem value="Fixed rate">Fixed rate</SelectItem>
                    <SelectItem value="Adjusts every 3 years">Adjusts every 3 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rates Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uw-rate">UW Rate (%)</Label>
                <Input
                  id="uw-rate"
                  value={uwRate}
                  onChange={(e) => setUwRate(e.target.value)}
                  placeholder="Enter UW rate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual-rate">Actual Rate (%)</Label>
                <Input
                  id="actual-rate"
                  value={actualRate}
                  onChange={(e) => setActualRate(e.target.value)}
                  placeholder="Enter actual rate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="as-of-date">As of Date</Label>
                <Input
                  id="as-of-date"
                  value={asOfDate}
                  onChange={(e) => setAsOfDate(e.target.value)}
                  placeholder="MM/DD/YY"
                />
              </div>
            </div>

            {/* Terms Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan-term">Loan Term (in yrs)</Label>
                <Input
                  id="loan-term"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="Years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest-only">Interest Only (months)</Label>
                <Input
                  id="interest-only"
                  value={interestOnly}
                  onChange={(e) => setInterestOnly(e.target.value)}
                  placeholder="Months"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amortization">Amortization (months - Excluding I/O months)</Label>
                <Input
                  id="amortization"
                  value={amortization}
                  onChange={(e) => setAmortization(e.target.value)}
                  placeholder="Months"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pmt-freq">Pmt Freq.</Label>
                <Select value={pmtFreq} onValueChange={setPmtFreq}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Accrual Row */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accrual">Accrual</Label>
                <Select value={accrual} onValueChange={setAccrual}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="365">365</SelectItem>
                    <SelectItem value="360">360</SelectItem>
                    <SelectItem value="Actual/365">Actual/365</SelectItem>
                    <SelectItem value="30/360">30/360</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interest Rates and Payments Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="spread">Spread (%)</Label>
                  <Input
                    id="spread"
                    value={spread}
                    onChange={(e) => setSpread(e.target.value)}
                    placeholder="Spread"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spread-2">Spread (%)</Label>
                  <Input
                    id="spread-2"
                    value={spread}
                    onChange={(e) => setSpread(e.target.value)}
                    placeholder="Spread"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="int-rate">Int. Rate (%)</Label>
                  <Input
                    id="int-rate"
                    value={intRate}
                    onChange={(e) => setIntRate(e.target.value)}
                    placeholder="Interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="int-rate-2">Int. Rate (%)</Label>
                  <Input
                    id="int-rate-2"
                    value={intRate}
                    onChange={(e) => setIntRate(e.target.value)}
                    placeholder="Interest rate"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="uw-rate-payment">UW Rate Payment</Label>
                  <Input
                    id="uw-rate-payment"
                    value={uwRatePayment}
                    onChange={(e) => setUwRatePayment(e.target.value)}
                    placeholder="UW rate payment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actual-payment">Actual Payment</Label>
                  <Input
                    id="actual-payment"
                    value={actualPayment}
                    onChange={(e) => setActualPayment(e.target.value)}
                    placeholder="Actual payment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-only-payment">Interest Only Payment</Label>
                  <Input
                    id="interest-only-payment"
                    value={interestOnlyPayment}
                    onChange={(e) => setInterestOnlyPayment(e.target.value)}
                    placeholder="Interest only payment"
                  />
                </div>
              </div>
            </div>

            {/* Legacy Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="status-select">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Underwriting">Underwriting</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Declined">Declined</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes about the loan"
                className="min-h-24"
              />
            </div>

            {/* Prepayment Penalty Section */}
            <div className="space-y-2">
              <Label htmlFor="prepayment-penalty">Prepayment Penalty</Label>
              <Textarea
                id="prepayment-penalty"
                value={prepaymentPenalty}
                onChange={(e) => setPrepaymentPenalty(e.target.value)}
                placeholder="Enter prepayment penalty details"
                className="min-h-20"
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

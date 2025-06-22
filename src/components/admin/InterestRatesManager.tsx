
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Plus, TrendingUp, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

interface PrimeRateRecord {
  id: string;
  rate: number;
  effectiveDate: string;
  enteredBy: string;
  enteredAt: string;
  source: string;
}

export const InterestRatesManager = () => {
  const [newPrimeRate, setNewPrimeRate] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Mock historical data
  const [primeRateHistory, setPrimeRateHistory] = useState<PrimeRateRecord[]>([
    {
      id: '1',
      rate: 8.50,
      effectiveDate: '2024-03-20',
      enteredBy: 'John Smith',
      enteredAt: '2024-03-20T10:30:00Z',
      source: 'Wall Street Journal'
    },
    {
      id: '2',
      rate: 8.25,
      effectiveDate: '2024-02-15',
      enteredBy: 'Sarah Johnson',
      enteredAt: '2024-02-15T14:20:00Z',
      source: 'Wall Street Journal'
    },
    {
      id: '3',
      rate: 8.00,
      effectiveDate: '2024-01-10',
      enteredBy: 'Michael Brown',
      enteredAt: '2024-01-10T09:15:00Z',
      source: 'Wall Street Journal'
    },
    {
      id: '4',
      rate: 7.75,
      effectiveDate: '2023-12-05',
      enteredBy: 'Emily Davis',
      enteredAt: '2023-12-05T16:45:00Z',
      source: 'Wall Street Journal'
    },
    {
      id: '5',
      rate: 7.50,
      effectiveDate: '2023-11-20',
      enteredBy: 'David Wilson',
      enteredAt: '2023-11-20T11:30:00Z',
      source: 'Wall Street Journal'
    }
  ]);

  const currentPrimeRate = primeRateHistory[0]; // Most recent rate

  const handleAddPrimeRate = () => {
    if (!newPrimeRate.trim()) {
      toast.error('Please enter a prime rate value');
      return;
    }

    const rate = parseFloat(newPrimeRate);
    if (isNaN(rate) || rate <= 0 || rate > 25) {
      toast.error('Please enter a valid rate between 0 and 25%');
      return;
    }

    if (!effectiveDate) {
      toast.error('Please select an effective date');
      return;
    }

    const newRecord: PrimeRateRecord = {
      id: Date.now().toString(),
      rate,
      effectiveDate,
      enteredBy: 'Current User', // In real app, this would come from auth
      enteredAt: new Date().toISOString(),
      source: 'Wall Street Journal'
    };

    // Add to beginning of array (most recent first)
    setPrimeRateHistory(prev => [newRecord, ...prev]);
    setNewPrimeRate('');
    setEffectiveDate(new Date().toISOString().split('T')[0]);
    
    toast.success(`Prime rate updated to ${rate}%`);
    console.log(`[AUDIT] Prime rate updated: ${rate}% effective ${effectiveDate} by Current User at ${new Date().toISOString()}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Interest Rates Management</h2>
        <p className="text-muted-foreground">
          Manage prime rates from the Wall Street Journal. Current rates are used for loan calculations and pricing.
        </p>
      </div>

      {/* Current Rate Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Current Prime Rate
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.wsj.com/market-data/bonds/moneyrates', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              WSJ Market Data
            </Button>
          </div>
          <CardDescription>
            Latest prime rate effective as of {formatDate(currentPrimeRate.effectiveDate)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-primary">
              {currentPrimeRate.rate.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Effective: {formatDate(currentPrimeRate.effectiveDate)}</div>
              <div>Updated by: {currentPrimeRate.enteredBy}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Rate Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Update Prime Rate
          </CardTitle>
          <CardDescription>
            Enter a new prime rate from the Wall Street Journal market data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prime-rate">Prime Rate (%)</Label>
              <Input
                id="prime-rate"
                type="number"
                step="0.01"
                min="0"
                max="25"
                placeholder="8.50"
                value={newPrimeRate}
                onChange={(e) => setNewPrimeRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effective-date">Effective Date</Label>
              <Input
                id="effective-date"
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddPrimeRate} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Rate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Rates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Prime Rate History
          </CardTitle>
          <CardDescription>
            Historical prime rates with audit trail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rate</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Entered By</TableHead>
                  <TableHead>Date Entered</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {primeRateHistory.map((record, index) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-bold text-lg">
                      {record.rate.toFixed(2)}%
                    </TableCell>
                    <TableCell>{formatDate(record.effectiveDate)}</TableCell>
                    <TableCell>{record.enteredBy}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateTime(record.enteredAt)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.source}</Badge>
                    </TableCell>
                    <TableCell>
                      {index === 0 ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Current</Badge>
                      ) : (
                        <Badge variant="secondary">Historical</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { MultiSelectFormField } from './MultiSelectFormField';
import { OwnershipRange } from '@/types/documentTemplate';
import { getFormsByEntityType } from '@/lib/utils/formCategorization';

interface OwnershipRangeManagerProps {
  participantType: string;
  participantLabel: string;
  ranges: OwnershipRange[];
  onChange: (ranges: OwnershipRange[]) => void;
}

const availableForms = getFormsByEntityType('All');

export const OwnershipRangeManager = ({ 
  participantType, 
  participantLabel, 
  ranges, 
  onChange 
}: OwnershipRangeManagerProps) => {
  const addRange = () => {
    const newRange: OwnershipRange = {
      id: Date.now().toString(),
      min: 0,
      max: 100,
      forms: []
    };
    onChange([...ranges, newRange]);
  };

  const updateRange = (rangeId: string, updates: Partial<OwnershipRange>) => {
    const updatedRanges = ranges.map(range => 
      range.id === rangeId ? { ...range, ...updates } : range
    );
    onChange(updatedRanges);
  };

  const removeRange = (rangeId: string) => {
    onChange(ranges.filter(range => range.id !== rangeId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{participantLabel} - Ownership Ranges</CardTitle>
          <Button onClick={addRange} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Range
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ranges.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No ownership ranges defined. Click "Add Range" to create one.
          </p>
        ) : (
          ranges.map((range, index) => (
            <Card key={range.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">Range {index + 1}</Badge>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={range.min}
                        onChange={(e) => updateRange(range.id, { min: Number(e.target.value) })}
                        className="w-20"
                        placeholder="0"
                      />
                      <span className="text-sm text-muted-foreground">% to</span>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={range.max}
                        onChange={(e) => updateRange(range.id, { max: Number(e.target.value) })}
                        className="w-20"
                        placeholder="100"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => removeRange(range.id)} 
                    size="sm" 
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Forms for {range.min}% - {range.max}% ownership:
                  </Label>
                  <MultiSelectFormField
                    value={range.forms}
                    onChange={(forms) => updateRange(range.id, { forms })}
                    options={availableForms}
                    placeholder={`Select forms for ${range.min}% - ${range.max}% ownership...`}
                    participantType={participantType}
                    showEntityTypeFilter={true}
                  />
                  {range.forms.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {range.forms.length} form(s) selected for this ownership range
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};

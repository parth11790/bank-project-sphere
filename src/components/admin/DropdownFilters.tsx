
import React from 'react';
import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomizationLevel } from '@/lib/mockData/dropdownFields';

interface DropdownFiltersProps {
  filterLevel: CustomizationLevel | 'All';
  onFilterChange: (value: CustomizationLevel | 'All') => void;
}

export const DropdownFilters = ({ filterLevel, onFilterChange }: DropdownFiltersProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select
        value={filterLevel}
        onValueChange={(value) => onFilterChange(value as CustomizationLevel | 'All')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Levels</SelectItem>
          <SelectItem value="SBA Defined">SBA Defined</SelectItem>
          <SelectItem value="Lender Customizable">Lender Customizable</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

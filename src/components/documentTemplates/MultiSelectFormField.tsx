import React, { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getFormsByEntityType, getFormEntityType, getEntityTypeForParticipant } from '@/lib/utils/formCategorization';

interface MultiSelectFormFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder?: string;
  entityTypeFilter?: 'Business' | 'Individual' | 'All';
  showEntityTypeFilter?: boolean;
  participantType?: string;
}

export const MultiSelectFormField: React.FC<MultiSelectFormFieldProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select forms...',
  entityTypeFilter = 'All',
  showEntityTypeFilter = true,
  participantType
}) => {
  const [open, setOpen] = useState(false);
  
  // Use participant type to determine default entity filter if provided
  const defaultEntityFilter = participantType 
    ? getEntityTypeForParticipant(participantType)
    : entityTypeFilter;
    
  const [localEntityFilter, setLocalEntityFilter] = useState<'Business' | 'Individual' | 'All'>(defaultEntityFilter);

  // Filter options based on entity type
  const filteredOptions = useMemo(() => {
    if (localEntityFilter === 'All') {
      return options;
    }
    const allowedForms = getFormsByEntityType(localEntityFilter);
    return options.filter(option => allowedForms.includes(option));
  }, [options, localEntityFilter]);

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((item) => item !== optionValue));
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className="space-y-2">
      {showEntityTypeFilter && (
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">Filter by Entity Type:</Label>
          <Select value={localEntityFilter} onValueChange={(val) => setLocalEntityFilter(val as 'Business' | 'Individual' | 'All')}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Forms</SelectItem>
              <SelectItem value="Business">Business Forms</SelectItem>
              <SelectItem value="Individual">Individual Forms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {value.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                <>
                  {value.slice(0, 2).map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="text-xs"
                    >
                      {item}
                      <button
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(item);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {value.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{value.length - 2} more
                    </Badge>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              {value.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="hover:bg-muted rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search forms..." />
            <CommandEmpty>No forms found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    className="flex items-center gap-2"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value.includes(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="flex-1">{option}</span>
                      <Badge variant="outline" className="text-xs">
                        {getFormEntityType(option)}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {value.length > 0 && (
        <div className="text-xs text-muted-foreground">
          {value.length} form{value.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
};

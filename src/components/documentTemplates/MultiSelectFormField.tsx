
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

interface MultiSelectFormFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder?: string;
}

export const MultiSelectFormField = ({
  value,
  onChange,
  options,
  placeholder = "Select forms..."
}: MultiSelectFormFieldProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (formName: string) => {
    const newValue = value.includes(formName)
      ? value.filter(v => v !== formName)
      : [...value, formName];
    onChange(newValue);
  };

  const handleRemove = (formName: string) => {
    onChange(value.filter(v => v !== formName));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0 ? `${value.length} forms selected` : placeholder}
            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search forms..." />
            <CommandList>
              <CommandEmpty>No forms found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value.includes(option) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((formName) => (
            <Badge key={formName} variant="secondary" className="text-xs">
              {formName}
              <button
                type="button"
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                onClick={() => handleRemove(formName)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

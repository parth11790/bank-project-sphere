
export type CustomizationLevel = 'SBA Defined' | 'SBA Influenced' | 'Lender Customizable';

export interface DropdownField {
  id: string;
  label: string;
  description: string;
  customizationLevel: CustomizationLevel;
  module: string;
  initialValues: string[];
}

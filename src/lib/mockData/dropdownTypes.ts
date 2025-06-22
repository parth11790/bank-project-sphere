
export type CustomizationLevel = 'SBA Defined' | 'Lender Customizable';

export interface DropdownField {
  id: string;
  label: string;
  description: string;
  customizationLevel: CustomizationLevel;
  module: string;
  initialValues: string[];
}

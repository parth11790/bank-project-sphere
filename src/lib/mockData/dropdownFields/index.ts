
import { intakeDropdownFields } from './intake';
import { processingDropdownFields } from './processing';
import { useOfProceedsDropdownFields } from './useOfProceeds';
import { environmentalDropdownFields } from './environmental';
import { documentationDropdownFields } from './documentation';
import { administrationDropdownFields } from './administration';
import { DropdownField } from '../dropdownTypes';

// Combine all dropdown fields into a single array
export const sbaDropdownFields: DropdownField[] = [
  ...intakeDropdownFields,
  ...processingDropdownFields,
  ...useOfProceedsDropdownFields,
  ...environmentalDropdownFields,
  ...documentationDropdownFields,
  ...administrationDropdownFields
];

// Re-export the types from the types file
export { CustomizationLevel, DropdownField } from '../dropdownTypes';

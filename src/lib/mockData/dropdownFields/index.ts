
import { intakeDropdownFields } from './intake';
import { processingDropdownFields } from './processing';
import { useOfProceedsDropdownFields } from './useOfProceeds';
import { environmentalDropdownFields } from './environmental';
import { documentationDropdownFields } from './documentation';
import { administrationDropdownFields } from './administration';
import { reportingDropdownFields } from './reporting';
import { auditTrailDropdownFields } from './auditTrail';
import { DropdownField } from '../dropdownTypes';

// Combine all dropdown fields into a single array
export const sbaDropdownFields: DropdownField[] = [
  ...intakeDropdownFields,
  ...processingDropdownFields,
  ...useOfProceedsDropdownFields,
  ...environmentalDropdownFields,
  ...documentationDropdownFields,
  ...administrationDropdownFields,
  ...reportingDropdownFields,
  ...auditTrailDropdownFields
];

// Re-export the types from the types file - using export type for isolatedModules
export type { CustomizationLevel, DropdownField } from '../dropdownTypes';

import { intakeDropdownFields } from './intake';
import { processingDropdownFields } from './processing';
import { documentationDropdownFields } from './documentation';
import { useOfProceedsDropdownFields } from './useOfProceeds';
import { reportingDropdownFields } from './reporting';
import { administrationDropdownFields } from './administration';
import { environmentalDropdownFields } from './environmental';
import { auditTrailDropdownFields } from './auditTrail';
import { fundingPurposeDropdownFields } from './fundingPurpose';

export const sbaDropdownFields = [
  ...intakeDropdownFields,
  ...processingDropdownFields,
  ...documentationDropdownFields,
  ...useOfProceedsDropdownFields,
  ...reportingDropdownFields,
  ...administrationDropdownFields,
  ...environmentalDropdownFields,
  ...auditTrailDropdownFields,
  ...fundingPurposeDropdownFields
];

export type { CustomizationLevel, DropdownField } from '../dropdownTypes';

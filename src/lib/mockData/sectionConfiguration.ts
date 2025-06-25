export interface FieldConfiguration {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'date' | 'number' | 'checkbox' | 'radio' | 'file';
  label: string;
  required: boolean;
  visible: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  defaultValue?: string;
}

export interface SectionConfiguration {
  id: string;
  name: string;
  description: string;
  category: 'individual' | 'business';
  visible: boolean;
  order: number;
  fields: FieldConfiguration[];
}

export const sectionConfigurations: SectionConfiguration[] = [
  // Individual Sections
  {
    id: 'basic_information',
    name: 'Basic Information & Address',
    description: 'Core personal details and contact information including name, email, phone, and residential address',
    category: 'individual',
    visible: true,
    order: 1,
    fields: [
      {
        id: 'first_name',
        name: 'first_name',
        type: 'text',
        label: 'First Name',
        required: true,
        visible: true,
        placeholder: 'Enter first name'
      },
      {
        id: 'last_name',
        name: 'last_name',
        type: 'text',
        label: 'Last Name',
        required: true,
        visible: true,
        placeholder: 'Enter last name'
      },
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        visible: true,
        placeholder: 'Enter email address'
      },
      {
        id: 'primary_phone',
        name: 'primary_phone',
        type: 'phone',
        label: 'Primary Phone',
        required: true,
        visible: true,
        placeholder: '(555) 123-4567'
      },
      {
        id: 'primary_phone_type',
        name: 'primary_phone_type',
        type: 'select',
        label: 'Phone Type',
        required: true,
        visible: true,
        options: ['cell', 'home', 'work']
      },
      {
        id: 'street_address',
        name: 'street_address',
        type: 'text',
        label: 'Street Address',
        required: true,
        visible: true,
        placeholder: '123 Main Street'
      },
      {
        id: 'city',
        name: 'city',
        type: 'text',
        label: 'City',
        required: true,
        visible: true,
        placeholder: 'Enter city'
      },
      {
        id: 'state',
        name: 'state',
        type: 'text',
        label: 'State',
        required: true,
        visible: true,
        placeholder: 'CA'
      },
      {
        id: 'zip_code',
        name: 'zip_code',
        type: 'text',
        label: 'ZIP Code',
        required: true,
        visible: true,
        placeholder: '12345'
      }
    ]
  },
  {
    id: 'personal_details',
    name: 'Personal Details',
    description: 'Sensitive personal information including date of birth, SSN, marital status, and legal obligations',
    category: 'individual',
    visible: true,
    order: 2,
    fields: [
      {
        id: 'date_of_birth',
        name: 'date_of_birth',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        visible: true
      },
      {
        id: 'ssn',
        name: 'ssn',
        type: 'text',
        label: 'Social Security Number',
        required: true,
        visible: true,
        placeholder: 'XXX-XX-XXXX'
      },
      {
        id: 'marital_status',
        name: 'marital_status',
        type: 'select',
        label: 'Marital Status',
        required: true,
        visible: true,
        options: ['married', 'unmarried', 'divorced', 'widowed']
      },
      {
        id: 'liable_for_alimony',
        name: 'liable_for_alimony',
        type: 'select',
        label: 'Liable for Alimony',
        required: true,
        visible: true,
        options: ['yes', 'no']
      },
      {
        id: 'delinquent_child_support',
        name: 'delinquent_child_support',
        type: 'select',
        label: 'Delinquent Child Support',
        required: true,
        visible: true,
        options: ['yes', 'no']
      }
    ]
  },
  {
    id: 'forms_assignment',
    name: 'Forms Assignment',
    description: 'Assignment and management of required documentation and forms for the individual participant',
    category: 'individual',
    visible: true,
    order: 3,
    fields: [
      {
        id: 'assigned_forms',
        name: 'assigned_forms',
        type: 'checkbox',
        label: 'Assigned Forms',
        required: false,
        visible: true
      }
    ]
  },
  {
    id: 'business_ownership',
    name: 'Business Ownership',
    description: 'Individual ownership stake and percentage in business entities related to the loan application',
    category: 'individual',
    visible: true,
    order: 4,
    fields: [
      {
        id: 'business_ownership_percentage',
        name: 'business_ownership_percentage',
        type: 'number',
        label: 'Ownership Percentage',
        required: false,
        visible: true,
        placeholder: '0-100'
      }
    ]
  },
  // Business Sections
  {
    id: 'business_basic_info',
    name: 'Business Basic Information',
    description: 'Essential business identification including legal name, DBA, business structure, and federal tax ID',
    category: 'business',
    visible: true,
    order: 1,
    fields: [
      {
        id: 'legal_business_name',
        name: 'legal_business_name',
        type: 'text',
        label: 'Legal Business Name',
        required: true,
        visible: true,
        placeholder: 'Enter legal business name'
      },
      {
        id: 'dba_name',
        name: 'dba_name',
        type: 'text',
        label: 'DBA Name',
        required: false,
        visible: true,
        placeholder: 'Doing Business As'
      },
      {
        id: 'business_type',
        name: 'business_type',
        type: 'select',
        label: 'Business Type',
        required: true,
        visible: true,
        options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship']
      },
      {
        id: 'ein',
        name: 'ein',
        type: 'text',
        label: 'EIN',
        required: true,
        visible: true,
        placeholder: 'XX-XXXXXXX'
      },
      {
        id: 'business_phone',
        name: 'business_phone',
        type: 'phone',
        label: 'Business Phone',
        required: true,
        visible: true,
        placeholder: '(555) 123-4567'
      }
    ]
  },
  {
    id: 'business_address',
    name: 'Business Address',
    description: 'Physical location and mailing address of the business operations and headquarters',
    category: 'business',
    visible: true,
    order: 2,
    fields: [
      {
        id: 'business_street_address',
        name: 'business_street_address',
        type: 'text',
        label: 'Street Address',
        required: true,
        visible: true,
        placeholder: '123 Business Street'
      },
      {
        id: 'business_city',
        name: 'business_city',
        type: 'text',
        label: 'City',
        required: true,
        visible: true,
        placeholder: 'Enter city'
      },
      {
        id: 'business_state',
        name: 'business_state',
        type: 'text',
        label: 'State',
        required: true,
        visible: true,
        placeholder: 'CA'
      },
      {
        id: 'business_zip',
        name: 'business_zip',
        type: 'text',
        label: 'ZIP Code',
        required: true,
        visible: true,
        placeholder: '12345'
      }
    ]
  },
  {
    id: 'business_ownership_structure',
    name: 'Ownership Structure',
    description: 'Detailed breakdown of business ownership percentages and stakeholder information',
    category: 'business',
    visible: true,
    order: 3,
    fields: [
      {
        id: 'total_ownership_percentage',
        name: 'total_ownership_percentage',
        type: 'number',
        label: 'Total Ownership Percentage',
        required: true,
        visible: true,
        placeholder: '100'
      }
    ]
  }
];

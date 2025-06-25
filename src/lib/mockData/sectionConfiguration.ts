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
  category: 'individual' | 'business' | 'both';
  visible: boolean;
  order: number;
  fields: FieldConfiguration[];
}

export const sectionConfigurations: SectionConfiguration[] = [
  // Business Sections
  {
    id: 'business_information',
    name: 'Business Information',
    description: 'This section captures information about the business. Business Name, Entity Type, EIN, Date Established, Industry/NAICS Code, Business Description, Business Address, city, state, Zip Code, Phone Number, Email Address, Website',
    category: 'business',
    visible: true,
    order: 1,
    fields: [
      {
        id: 'business_name',
        name: 'business_name',
        type: 'text',
        label: 'Business Name',
        required: true,
        visible: true,
        placeholder: 'Enter business name'
      },
      {
        id: 'entity_type',
        name: 'entity_type',
        type: 'select',
        label: 'Entity Type',
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
        id: 'date_established',
        name: 'date_established',
        type: 'date',
        label: 'Date Established',
        required: true,
        visible: true
      },
      {
        id: 'industry_naics_code',
        name: 'industry_naics_code',
        type: 'text',
        label: 'Industry/NAICS Code',
        required: true,
        visible: true,
        placeholder: 'Enter NAICS code'
      },
      {
        id: 'business_description',
        name: 'business_description',
        type: 'textarea',
        label: 'Business Description',
        required: true,
        visible: true,
        placeholder: 'Describe your business'
      },
      {
        id: 'business_address',
        name: 'business_address',
        type: 'text',
        label: 'Business Address',
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
      },
      {
        id: 'business_phone',
        name: 'business_phone',
        type: 'phone',
        label: 'Phone Number',
        required: true,
        visible: true,
        placeholder: '(555) 123-4567'
      },
      {
        id: 'business_email',
        name: 'business_email',
        type: 'email',
        label: 'Email Address',
        required: true,
        visible: true,
        placeholder: 'business@example.com'
      },
      {
        id: 'website',
        name: 'website',
        type: 'text',
        label: 'Website',
        required: false,
        visible: true,
        placeholder: 'www.business.com'
      }
    ]
  },
  {
    id: 'business_ownership',
    name: 'Business Ownership',
    description: 'This section only appears on business entity pages. This section provides information of individuals and businesses who own the business. Entity Type, Ownership %, Name, Title, Email Address',
    category: 'business',
    visible: true,
    order: 2,
    fields: [
      {
        id: 'entity_type',
        name: 'entity_type',
        type: 'select',
        label: 'Entity Type',
        required: true,
        visible: true,
        options: ['Individual', 'Business']
      },
      {
        id: 'ownership_percentage',
        name: 'ownership_percentage',
        type: 'number',
        label: 'Ownership %',
        required: true,
        visible: true,
        placeholder: '0-100'
      },
      {
        id: 'owner_name',
        name: 'owner_name',
        type: 'text',
        label: 'Name',
        required: true,
        visible: true,
        placeholder: 'Enter owner name'
      },
      {
        id: 'title',
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
        visible: true,
        placeholder: 'Enter title'
      },
      {
        id: 'email_address',
        name: 'email_address',
        type: 'email',
        label: 'Email Address',
        required: true,
        visible: true,
        placeholder: 'owner@example.com'
      }
    ]
  },
  {
    id: 'personal_information',
    name: 'Personal Information',
    description: 'This section captures personal information of an individual. First Name, Middle Name, Last Name, Date of Birth, Social Security Number, Phone, Home Address (street, city, state, zip), Mailing Address (if different), Email Address',
    category: 'individual',
    visible: true,
    order: 3,
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
        id: 'middle_name',
        name: 'middle_name',
        type: 'text',
        label: 'Middle Name',
        required: false,
        visible: true,
        placeholder: 'Enter middle name'
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
        id: 'phone',
        name: 'phone',
        type: 'phone',
        label: 'Phone',
        required: true,
        visible: true,
        placeholder: '(555) 123-4567'
      },
      {
        id: 'home_street',
        name: 'home_street',
        type: 'text',
        label: 'Home Address (Street)',
        required: true,
        visible: true,
        placeholder: '123 Main Street'
      },
      {
        id: 'home_city',
        name: 'home_city',
        type: 'text',
        label: 'City',
        required: true,
        visible: true,
        placeholder: 'Enter city'
      },
      {
        id: 'home_state',
        name: 'home_state',
        type: 'text',
        label: 'State',
        required: true,
        visible: true,
        placeholder: 'CA'
      },
      {
        id: 'home_zip',
        name: 'home_zip',
        type: 'text',
        label: 'ZIP Code',
        required: true,
        visible: true,
        placeholder: '12345'
      },
      {
        id: 'mailing_address_different',
        name: 'mailing_address_different',
        type: 'checkbox',
        label: 'Mailing Address (if different)',
        required: false,
        visible: true
      },
      {
        id: 'email_address',
        name: 'email_address',
        type: 'email',
        label: 'Email Address',
        required: true,
        visible: true,
        placeholder: 'individual@example.com'
      }
    ]
  },
  {
    id: 'personal_details',
    name: 'Personal Details',
    description: 'This section captures additional personal information of an individual. Marital Status (married/unmarried/divorced/separated/widowed), Number of Dependents, Liable for Alimony (yes/no), Delinquent Child Support (yes/no)',
    category: 'individual',
    visible: true,
    order: 4,
    fields: [
      {
        id: 'marital_status',
        name: 'marital_status',
        type: 'select',
        label: 'Marital Status',
        required: true,
        visible: true,
        options: ['married', 'unmarried', 'divorced', 'separated', 'widowed']
      },
      {
        id: 'number_of_dependents',
        name: 'number_of_dependents',
        type: 'number',
        label: 'Number of Dependents',
        required: false,
        visible: true,
        placeholder: '0'
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
    id: 'affiliated_business_ownership',
    name: 'Affiliated Business Ownership',
    description: 'This section shows what other businesses are owned by respective participant such as owners and acquisition business. Tabular layout of information. Content redirects to affiliated business page. Entity Type, Ownership %, Name, Title, Email Address',
    category: 'both',
    visible: true,
    order: 5,
    fields: [
      {
        id: 'affiliated_entity_type',
        name: 'affiliated_entity_type',
        type: 'select',
        label: 'Entity Type',
        required: true,
        visible: true,
        options: ['Individual', 'Business']
      },
      {
        id: 'affiliated_ownership_percentage',
        name: 'affiliated_ownership_percentage',
        type: 'number',
        label: 'Ownership %',
        required: true,
        visible: true,
        placeholder: '0-100'
      },
      {
        id: 'affiliated_name',
        name: 'affiliated_name',
        type: 'text',
        label: 'Name',
        required: true,
        visible: true,
        placeholder: 'Enter name'
      },
      {
        id: 'affiliated_title',
        name: 'affiliated_title',
        type: 'text',
        label: 'Title',
        required: true,
        visible: true,
        placeholder: 'Enter title'
      },
      {
        id: 'affiliated_email',
        name: 'affiliated_email',
        type: 'email',
        label: 'Email Address',
        required: true,
        visible: true,
        placeholder: 'affiliated@example.com'
      }
    ]
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'This section provides a list of forms respective entity is assigned to fill out',
    category: 'both',
    visible: true,
    order: 6,
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
  }
];

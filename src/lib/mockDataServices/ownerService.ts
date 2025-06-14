
import { PersonalInformationFormValues } from '@/components/participants/forms/schemas/personalInformationSchema';

// Mock personal information data for owners
export const getOwnerPersonalInformation = (ownerId: string): PersonalInformationFormValues => {
  const ownerMockData: Record<string, PersonalInformationFormValues> = {
    // Project 1 Owners
    'owner_1_1': {
      // Personal Information
      first_name: 'Maria',
      middle_name: 'Elena',
      last_name: 'Rodriguez',
      date_of_birth: new Date('1985-03-15'),
      social_security_number: '123-45-6789',
      primary_phone: '(415) 555-0123',
      primary_phone_type: 'cell',
      secondary_phone: '(415) 555-0456',
      secondary_phone_type: 'work',
      email_address: 'maria.rodriguez@gmail.com',
      home_address: '1234 Valencia Street',
      home_city: 'San Francisco',
      home_state: 'CA',
      home_zip_code: '94110',
      mailing_address: '1234 Valencia Street',
      mailing_city: 'San Francisco',
      mailing_state: 'CA',
      mailing_zip_code: '94110',
      marital_status: 'married',
      spouse_name: 'Carlos Rodriguez',
      dependents_count: 2,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',

      // Education
      education: [
        {
          school_name: 'UC Berkeley',
          degree_certification: 'Bachelor of Arts',
          area_of_study: 'Business Administration',
          start_date: new Date('2003-08-15'),
          end_date: new Date('2007-05-20'),
          graduated: true
        },
        {
          school_name: 'San Francisco Culinary Institute',
          degree_certification: 'Culinary Arts Certificate',
          area_of_study: 'Restaurant Management',
          start_date: new Date('2008-01-10'),
          end_date: new Date('2008-12-15'),
          graduated: true
        }
      ],

      // Employment History
      employment_history: [
        {
          employer_name: 'Golden Gate Bistro LLC',
          position_title: 'Managing Partner',
          start_date: new Date('2009-03-15'),
          end_date: undefined,
          current_position: true,
          responsibilities: 'Oversee daily operations, manage staff of 24, handle vendor relationships, ensure quality standards',
          annual_salary: 125000,
          reason_for_leaving: ''
        },
        {
          employer_name: 'Bay Area Restaurant Group',
          position_title: 'Assistant Manager',
          start_date: new Date('2007-06-01'),
          end_date: new Date('2009-02-28'),
          current_position: false,
          responsibilities: 'Supervised front-of-house operations, managed inventory, trained new staff',
          annual_salary: 58000,
          reason_for_leaving: 'Career advancement opportunity'
        }
      ],

      // Professional References
      professional_references: [
        {
          reference_name: 'James Chen',
          relationship: 'Former Supervisor',
          phone_number: '(415) 555-7890',
          email_address: 'jchen@bayarearestaurants.com'
        },
        {
          reference_name: 'Sarah Martinez',
          relationship: 'Business Partner',
          phone_number: '(415) 555-9876',
          email_address: 'smartinez@foodservice.com'
        },
        {
          reference_name: 'David Kim',
          relationship: 'Vendor/Supplier',
          phone_number: '(415) 555-4567',
          email_address: 'dkim@premiumsupply.com'
        }
      ],

      // Business Ownership
      business_ownership: [
        {
          business_name: 'Golden Gate Bistro LLC',
          ownership_percentage: 45,
          role_title: 'Managing Member',
          start_date: new Date('2009-03-15'),
          current_ownership: true
        }
      ],

      // Military Service
      military_service: 'no',

      // Background Questions
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    },

    'owner_1_2': {
      first_name: 'Carlos',
      middle_name: 'Antonio',
      last_name: 'Martinez',
      date_of_birth: new Date('1982-07-22'),
      social_security_number: '234-56-7890',
      primary_phone: '(415) 555-0124',
      primary_phone_type: 'cell',
      email_address: 'carlos.martinez@gmail.com',
      home_address: '5678 Mission Street',
      home_city: 'San Francisco',
      home_state: 'CA',
      home_zip_code: '94112',
      mailing_address: '5678 Mission Street',
      mailing_city: 'San Francisco',
      mailing_state: 'CA',
      mailing_zip_code: '94112',
      marital_status: 'married',
      spouse_name: 'Maria Rodriguez',
      dependents_count: 2,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',

      education: [
        {
          school_name: 'San Francisco State University',
          degree_certification: 'Bachelor of Science',
          area_of_study: 'Hospitality Management',
          start_date: new Date('2000-08-20'),
          end_date: new Date('2004-05-15'),
          graduated: true
        }
      ],

      employment_history: [
        {
          employer_name: 'Golden Gate Bistro LLC',
          position_title: 'Operations Partner',
          start_date: new Date('2009-03-15'),
          current_position: true,
          responsibilities: 'Kitchen operations, menu development, supplier negotiations, cost control',
          annual_salary: 95000,
          reason_for_leaving: ''
        }
      ],

      professional_references: [
        {
          reference_name: 'Linda Foster',
          relationship: 'Former Manager',
          phone_number: '(415) 555-2345',
          email_address: 'lfoster@hospitalitygroup.com'
        },
        {
          reference_name: 'Roberto Silva',
          relationship: 'Industry Colleague',
          phone_number: '(415) 555-6789',
          email_address: 'rsilva@chefassociation.org'
        },
        {
          reference_name: 'Anna Thompson',
          relationship: 'Supplier',
          phone_number: '(415) 555-3456',
          email_address: 'athompson@freshproduce.com'
        }
      ],

      business_ownership: [
        {
          business_name: 'Golden Gate Bistro LLC',
          ownership_percentage: 35,
          role_title: 'Operations Partner',
          start_date: new Date('2009-03-15'),
          current_ownership: true
        }
      ],

      military_service: 'no',
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    },

    // Project 2 Owners
    'owner_2_1': {
      first_name: 'David',
      middle_name: 'Wei',
      last_name: 'Chen',
      date_of_birth: new Date('1988-11-08'),
      social_security_number: '345-67-8901',
      primary_phone: '(512) 555-0234',
      primary_phone_type: 'cell',
      email_address: 'david.chen@innovatetech.com',
      home_address: '1200 South Lamar Blvd, Unit 101',
      home_city: 'Austin',
      home_state: 'TX',
      home_zip_code: '78704',
      mailing_address: '1200 South Lamar Blvd, Unit 101',
      mailing_city: 'Austin',
      mailing_state: 'TX',
      mailing_zip_code: '78704',
      marital_status: 'unmarried',
      dependents_count: 0,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',

      education: [
        {
          school_name: 'University of Texas at Austin',
          degree_certification: 'Master of Science',
          area_of_study: 'Computer Science',
          start_date: new Date('2010-08-25'),
          end_date: new Date('2012-05-15'),
          graduated: true
        },
        {
          school_name: 'University of Texas at Austin',
          degree_certification: 'Bachelor of Science',
          area_of_study: 'Computer Engineering',
          start_date: new Date('2006-08-20'),
          end_date: new Date('2010-05-10'),
          graduated: true
        }
      ],

      employment_history: [
        {
          employer_name: 'InnovateTech Solutions Inc.',
          position_title: 'CEO & Founder',
          start_date: new Date('2020-06-10'),
          current_position: true,
          responsibilities: 'Strategic planning, product development, team leadership, investor relations',
          annual_salary: 185000,
          reason_for_leaving: ''
        },
        {
          employer_name: 'Google',
          position_title: 'Senior Software Engineer',
          start_date: new Date('2015-03-01'),
          end_date: new Date('2020-05-30'),
          current_position: false,
          responsibilities: 'Led development of AI-powered features, managed team of 8 engineers',
          annual_salary: 165000,
          reason_for_leaving: 'Started own company'
        }
      ],

      professional_references: [
        {
          reference_name: 'Jennifer Walsh',
          relationship: 'Former Manager at Google',
          phone_number: '(650) 555-1234',
          email_address: 'jwalsh@google.com'
        },
        {
          reference_name: 'Mark Stevens',
          relationship: 'Investor/Advisor',
          phone_number: '(512) 555-7890',
          email_address: 'mstevens@techventures.com'
        },
        {
          reference_name: 'Dr. Patricia Kim',
          relationship: 'University Professor',
          phone_number: '(512) 555-4567',
          email_address: 'pkim@utexas.edu'
        }
      ],

      business_ownership: [
        {
          business_name: 'InnovateTech Solutions Inc.',
          ownership_percentage: 51,
          role_title: 'CEO & Founder',
          start_date: new Date('2020-06-10'),
          current_ownership: true
        }
      ],

      military_service: 'no',
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    },

    // Project 3 Owners  
    'owner_3_1': {
      first_name: 'Robert',
      middle_name: 'James',
      last_name: 'Johnson',
      date_of_birth: new Date('1975-04-12'),
      social_security_number: '456-78-9012',
      primary_phone: '(214) 555-0345',
      primary_phone_type: 'cell',
      secondary_phone: '(214) 555-0999',
      secondary_phone_type: 'work',
      email_address: 'rjohnson@precisionmfg.com',
      home_address: '3456 Oak Lawn Ave',
      home_city: 'Dallas',
      home_state: 'TX',
      home_zip_code: '75219',
      mailing_address: '3456 Oak Lawn Ave',
      mailing_city: 'Dallas',
      mailing_state: 'TX',
      mailing_zip_code: '75219',
      marital_status: 'married',
      spouse_name: 'Jennifer Johnson',
      dependents_count: 3,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'yes',

      education: [
        {
          school_name: 'Texas A&M University',
          degree_certification: 'Master of Business Administration',
          area_of_study: 'Operations Management',
          start_date: new Date('1995-08-20'),
          end_date: new Date('1997-05-15'),
          graduated: true
        },
        {
          school_name: 'University of Texas at Dallas',
          degree_certification: 'Bachelor of Science',
          area_of_study: 'Mechanical Engineering',
          start_date: new Date('1993-08-25'),
          end_date: new Date('1997-05-10'),
          graduated: true
        }
      ],

      employment_history: [
        {
          employer_name: 'Precision Manufacturing Corp',
          position_title: 'President & CEO',
          start_date: new Date('1998-11-20'),
          current_position: true,
          responsibilities: 'Executive leadership, strategic planning, major client relationships, M&A activities',
          annual_salary: 275000,
          reason_for_leaving: ''
        }
      ],

      professional_references: [
        {
          reference_name: 'William Foster',
          relationship: 'Board Member',
          phone_number: '(214) 555-8888',
          email_address: 'wfoster@texasindustrial.com'
        },
        {
          reference_name: 'Margaret Davis',
          relationship: 'Major Client',
          phone_number: '(469) 555-2222',
          email_address: 'mdavis@aerospacetech.com'
        },
        {
          reference_name: 'Charles Wilson',
          relationship: 'Industry Partner',
          phone_number: '(214) 555-6666',
          email_address: 'cwilson@manufacturingalliance.org'
        }
      ],

      business_ownership: [
        {
          business_name: 'Precision Manufacturing Corp',
          ownership_percentage: 55,
          role_title: 'President & CEO',
          start_date: new Date('1998-11-20'),
          current_ownership: true
        },
        {
          business_name: 'Texas Industrial Holdings',
          ownership_percentage: 25,
          role_title: 'Board Member',
          start_date: new Date('2010-03-01'),
          current_ownership: true
        }
      ],

      military_service: 'yes',
      military_service_details: {
        branch: 'Army',
        start_date: new Date('1997-06-01'),
        end_date: new Date('2001-05-31'),
        rank: 'Captain',
        discharge_type: 'Honorable'
      },

      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'yes'
    },

    // Project 4 Owners
    'owner_4_1': {
      first_name: 'Sarah',
      middle_name: 'Elizabeth',
      last_name: 'Williams',
      date_of_birth: new Date('1980-09-30'),
      social_security_number: '567-89-0123',
      primary_phone: '(602) 555-0456',
      primary_phone_type: 'cell',
      email_address: 'swilliams@desertfamilymed.com',
      home_address: '1234 North Scottsdale Road',
      home_city: 'Phoenix',
      home_state: 'AZ',
      home_zip_code: '85016',
      mailing_address: '1234 North Scottsdale Road',
      mailing_city: 'Phoenix',
      mailing_state: 'AZ',
      mailing_zip_code: '85016',
      marital_status: 'married',
      spouse_name: 'Michael Williams',
      dependents_count: 2,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',

      education: [
        {
          school_name: 'University of Arizona College of Medicine',
          degree_certification: 'Doctor of Medicine',
          area_of_study: 'Family Medicine',
          start_date: new Date('2002-08-15'),
          end_date: new Date('2006-05-20'),
          graduated: true
        },
        {
          school_name: 'Arizona State University',
          degree_certification: 'Bachelor of Science',
          area_of_study: 'Biology',
          start_date: new Date('1998-08-20'),
          end_date: new Date('2002-05-15'),
          graduated: true
        }
      ],

      employment_history: [
        {
          employer_name: 'Desert Family Medical Group',
          position_title: 'Lead Physician & Managing Partner',
          start_date: new Date('2010-07-01'),
          current_position: true,
          responsibilities: 'Patient care, practice management, staff supervision, quality assurance',
          annual_salary: 285000,
          reason_for_leaving: ''
        },
        {
          employer_name: 'Phoenix General Hospital',
          position_title: 'Resident Physician',
          start_date: new Date('2006-07-01'),
          end_date: new Date('2010-06-30'),
          current_position: false,
          responsibilities: 'Patient care, clinical rotations, emergency medicine',
          annual_salary: 58000,
          reason_for_leaving: 'Completed residency program'
        }
      ],

      professional_references: [
        {
          reference_name: 'Dr. Michael Rodriguez',
          relationship: 'Former Supervising Physician',   
          phone_number: '(602) 555-7777',
          email_address: 'mrodriguez@phoenixgeneral.com'
        },
        {
          reference_name: 'Dr. Lisa Chen',
          relationship: 'Medical Colleague',
          phone_number: '(602) 555-5555',
          email_address: 'lchen@arizonamedical.org'
        },
        {
          reference_name: 'Nancy Foster',
          relationship: 'Practice Administrator',
          phone_number: '(602) 555-3333',
          email_address: 'nfoster@medicalpractice.com'
        }
      ],

      business_ownership: [
        {
          business_name: 'Desert Family Medical Group',
          ownership_percentage: 60,
          role_title: 'Lead Physician & Managing Partner',
          start_date: new Date('2010-07-01'),
          current_ownership: true
        }
      ],

      military_service: 'no',
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    },

    // Project 5 Owners
    'owner_5_1': {
      first_name: 'Jennifer',
      middle_name: 'Marie',
      last_name: 'Martinez',
      date_of_birth: new Date('1983-12-05'),
      social_security_number: '678-90-1234',
      primary_phone: '(206) 555-0567',
      primary_phone_type: 'cell',
      secondary_phone: '(206) 555-0890',
      secondary_phone_type: 'work',
      email_address: 'jmartinez@pnwretail.com',
      home_address: '1500 Pike Place',
      home_city: 'Seattle',
      home_state: 'WA',
      home_zip_code: '98101',
      mailing_address: '1500 Pike Place',
      mailing_city: 'Seattle',
      mailing_state: 'WA',
      mailing_zip_code: '98101',
      marital_status: 'separated',
      dependents_count: 1,
      liable_for_alimony: 'no',
      delinquent_child_support: 'no',
      us_government_employee: 'no',
      us_citizen: 'yes',
      assets_in_trust: 'no',

      education: [
        {
          school_name: 'University of Washington',
          degree_certification: 'Master of Business Administration',
          area_of_study: 'Retail Management',
          start_date: new Date('2008-08-20'),
          end_date: new Date('2010-05-15'),
          graduated: true
        },
        {
          school_name: 'Western Washington University',
          degree_certification: 'Bachelor of Arts',
          area_of_study: 'Marketing',
          start_date: new Date('2001-08-25'),
          end_date: new Date('2005-05-20'),
          graduated: true
        }
      ],

      employment_history: [
        {
          employer_name: 'Pacific Northwest Retail LLC',
          position_title: 'Founder & CEO',
          start_date: new Date('2018-09-03'),
          current_position: true,
          responsibilities: 'Strategic vision, brand development, expansion planning, investor relations',
          annual_salary: 145000,
          reason_for_leaving: ''
        },
        {
          employer_name: 'REI Co-op',
          position_title: 'Regional Manager',
          start_date: new Date('2012-04-01'),
          end_date: new Date('2018-08-31'),
          current_position: false,
          responsibilities: 'Managed 8 store locations, inventory planning, staff development',
          annual_salary: 95000,
          reason_for_leaving: 'Started own business'
        }
      ],

      professional_references: [
        {
          reference_name: 'Tom Harrison',
          relationship: 'Former Regional Director at REI',
          phone_number: '(206) 555-1111',
          email_address: 'tharrison@rei.com'
        },
        {
          reference_name: 'Susan Park',
          relationship: 'Business Mentor',
          phone_number: '(206) 555-2222',
          email_address: 'spark@seattlebusiness.org'
        },
        {
          reference_name: 'Robert Chen',
          relationship: 'Supplier Partner',
          phone_number: '(206) 555-9999',
          email_address: 'rchen@outdoorgear.com'
        }
      ],

      business_ownership: [
        {
          business_name: 'Pacific Northwest Retail LLC',
          ownership_percentage: 40,
          role_title: 'Founder & CEO',
          start_date: new Date('2018-09-03'),
          current_ownership: true
        }
      ],

      military_service: 'no',
      declared_bankrupt: 'no',
      criminal_charges: 'no',
      federal_debt_delinquent: 'no',
      unsatisfied_judgments: 'no',
      foreclosure_party: 'no',
      business_failure: 'no',
      pledged_property: 'no'
    }
  };

  // Return the mock data for the requested owner, or default values if not found
  return ownerMockData[ownerId] || {
    first_name: '',
    last_name: '',
    date_of_birth: new Date(),
    social_security_number: '',
    primary_phone: '',
    primary_phone_type: 'cell',
    email_address: '',
    home_address: '',
    home_city: '',
    home_state: '',
    home_zip_code: '',
    mailing_address: '',
    mailing_city: '',
    mailing_state: '',
    mailing_zip_code: '',
    marital_status: 'unmarried',
    dependents_count: 0,
    liable_for_alimony: 'no',
    delinquent_child_support: 'no',
    us_government_employee: 'no',
    us_citizen: 'yes',
    assets_in_trust: 'no',
    education: [{ school_name: '', degree_certification: '', area_of_study: '', start_date: new Date() }],
    employment_history: [{ employer_name: '', position_title: '', start_date: new Date(), responsibilities: '', reason_for_leaving: '' }],
    professional_references: [
      { reference_name: '', relationship: '', phone_number: '', email_address: '' },
      { reference_name: '', relationship: '', phone_number: '', email_address: '' },
      { reference_name: '', relationship: '', phone_number: '', email_address: '' }
    ],
    business_ownership: [],
    military_service: 'no',
    declared_bankrupt: 'no',
    criminal_charges: 'no',
    federal_debt_delinquent: 'no',
    unsatisfied_judgments: 'no',
    foreclosure_party: 'no',
    business_failure: 'no',
    pledged_property: 'no'
  };
};

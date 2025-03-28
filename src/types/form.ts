
export interface Form {
  form_id: string;
  name: string;
}

export interface FormTemplate {
  form_id: string;
  name: string;
  entity_type: string;
}

export interface Document {
  document_id: string;
  name: string;
  entity_type?: string;
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a Form
export function isForm(obj: any): obj is Form {
  return 'form_id' in obj && 'name' in obj;
}

// Type guard to check if an object is a FormTemplate
export function isFormTemplate(obj: any): obj is FormTemplate {
  return 'form_id' in obj && 'name' in obj && 'entity_type' in obj;
}

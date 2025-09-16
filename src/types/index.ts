export type FieldType = 'numeric' | 'string' | 'multi-line' | 'boolean' | 'date' | 'enum';

export interface Option {
  value: string | number;
  label: string;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  default?: any;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  options?: Option[]; // for enum
}

export interface ButtonConfig {
  id: string;
  text: string;
  type?: 'submit' | 'button' | 'reset';
}

export interface FormConfig {
  title?: string;
  fields: FieldConfig[];
  buttons?: ButtonConfig[];
}

export interface FormData {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface JsonValidationError {
  line?: number;
  column?: number;
  message: string;
}

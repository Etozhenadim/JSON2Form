import React from 'react';
import { FieldConfig, ValidationError } from '../../types';

interface FieldCheckboxProps {
  field: FieldConfig;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: ValidationError;
}

const FieldCheckbox: React.FC<FieldCheckboxProps> = ({ field, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={field.id}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={`h-4 w-4 text-[#007acc] focus:outline-none border-[#3e3e42] bg-[#3c3c3c] rounded ${
            error ? 'border-[#be1100]' : ''
          }`}
          required={field.required}
        />
        <label 
          htmlFor={field.id} 
          className="ml-2 block text-sm font-medium text-[#cccccc]"
        >
          {field.label}
          {field.required && <span className="text-[#f48771] ml-1">*</span>}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-[#f48771]">{error.message}</p>
      )}
    </div>
  );
};

export default FieldCheckbox;

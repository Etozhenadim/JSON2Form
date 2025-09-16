import React from 'react';
import { FieldConfig, ValidationError } from '../../types';

interface FieldEnumProps {
  field: FieldConfig;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: ValidationError;
}

const FieldEnum: React.FC<FieldEnumProps> = ({ field, value, onChange, error }) => {
  if (!field.options || field.options.length === 0) {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#cccccc] mb-1">
          {field.label}
          {field.required && <span className="text-[#f48771] ml-1">*</span>}
        </label>
        <div className="p-3 bg-[#5a1d1d] border border-[#be1100] rounded-md">
          <p className="text-sm text-[#f48771]">
            ⚠️ Enum field requires options. Please add options to the configuration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block text-sm font-medium text-[#cccccc] mb-2">
          {field.label}
          {field.required && <span className="text-[#f48771] ml-1">*</span>}
        </legend>
        <div className="space-y-2">
          {field.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`${field.id}-${index}`}
                name={field.id}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className={`h-4 w-4 text-[#007acc] focus:outline-none border-[#3e3e42] bg-[#3c3c3c] ${
                  error ? 'border-[#be1100]' : ''
                }`}
                required={field.required}
              />
                <label 
                  htmlFor={`${field.id}-${index}`} 
                  className="ml-2 block text-sm text-[#cccccc]"
                >
                  {option.label}
                </label>
            </div>
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="mt-1 text-sm text-[#f48771]">{error.message}</p>
      )}
    </div>
  );
};

export default FieldEnum;

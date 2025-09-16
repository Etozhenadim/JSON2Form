import React from 'react';
import { FieldConfig, ValidationError } from '../../types';

interface FieldNumberProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: ValidationError;
}

const FieldNumber: React.FC<FieldNumberProps> = ({ field, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={field.id} 
        className="block text-sm font-medium text-[#cccccc] mb-1"
      >
        {field.label}
        {field.required && <span className="text-[#f48771] ml-1">*</span>}
      </label>
      <input
        type="number"
        id={field.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        className={`w-full px-3 py-2 border rounded-md shadow-sm bg-[#3c3c3c] text-white placeholder-[#969696] focus:outline-none ${
          error ? 'border-[#be1100]' : 'border-[#3e3e42]'
        }`}
        required={field.required}
      />
      {error && (
        <p className="mt-1 text-sm text-[#f48771]">{error.message}</p>
      )}
    </div>
  );
};

export default FieldNumber;

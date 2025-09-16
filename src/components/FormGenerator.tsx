import React, { useState, useEffect } from 'react';
import { FormConfig, FormData, ValidationError } from '../types';
import { validateForm, getDefaultValue } from '../utils/validators';
import FieldText from './fields/FieldText';
import FieldTextArea from './fields/FieldTextArea';
import FieldNumber from './fields/FieldNumber';
import FieldCheckbox from './fields/FieldCheckbox';
import FieldDate from './fields/FieldDate';
import FieldEnum from './fields/FieldEnum';
import FormButtons from './FormButtons';

interface FormGeneratorProps {
  config: FormConfig;
  onSubmit?: (data: FormData) => void;
  onButtonClick?: (buttonId: string) => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ 
  config, 
  onSubmit, 
  onButtonClick 
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Инициализация значений по умолчанию
  useEffect(() => {
    const initialData: FormData = {};
    config.fields.forEach(field => {
      initialData[field.id] = getDefaultValue(field);
    });
    setFormData(initialData);
    setErrors([]);
  }, [config]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Очищаем ошибку для этого поля при изменении
    setErrors(prev => prev.filter(error => error.field !== fieldId));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const validationErrors = validateForm(config, formData);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      onSubmit?.(formData);
    }
    setIsSubmitting(false);
  };

  const handleReset = () => {
    const resetData: FormData = {};
    config.fields.forEach(field => {
      resetData[field.id] = getDefaultValue(field);
    });
    setFormData(resetData);
    setErrors([]);
  };

  const handleButtonClick = (buttonId: string) => {
    onButtonClick?.(buttonId);
  };

  const getFieldError = (fieldId: string): ValidationError | undefined => {
    return errors.find(error => error.field === fieldId);
  };

  const renderField = (field: any) => {
    const value = formData[field.id];
    const error = getFieldError(field.id);

    switch (field.type) {
      case 'string':
        return (
          <FieldText
            key={field.id}
            field={field}
            value={value || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      case 'multi-line':
        return (
          <FieldTextArea
            key={field.id}
            field={field}
            value={value || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      case 'numeric':
        return (
          <FieldNumber
            key={field.id}
            field={field}
            value={value || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      case 'boolean':
        return (
          <FieldCheckbox
            key={field.id}
            field={field}
            value={value || false}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      case 'date':
        return (
          <FieldDate
            key={field.id}
            field={field}
            value={value || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      case 'enum':
        return (
          <FieldEnum
            key={field.id}
            field={field}
            value={value || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        );
      default:
        return (
          <div key={field.id} className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              ⚠️ Unknown field type: {field.type}
            </p>
          </div>
        );
    }
  };

  if (!config || !config.fields) {
    return (
      <div className="p-6 bg-[#252526] rounded-lg border border-[#3e3e42]">
        <p className="text-[#cccccc]">No form configuration provided.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form className="bg-[#252526] shadow-sm rounded-lg p-4 sm:p-6 border border-[#3e3e42]">
        {config.title && (
          <h1 className="text-2xl font-bold text-white mb-6">{config.title}</h1>
        )}
        
        <div className="space-y-4">
          {config.fields.map(renderField)}
        </div>

        {config.buttons && config.buttons.length > 0 && (
          <FormButtons
            buttons={config.buttons}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onButtonClick={handleButtonClick}
            disabled={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default FormGenerator;

import { FormConfig, FieldConfig, ValidationError, JsonValidationError } from '../types';

// JSON валидация
export const validateJson = (jsonString: string): { isValid: boolean; error?: JsonValidationError; config?: FormConfig } => {
  try {
    const parsed = JSON.parse(jsonString);
    return { isValid: true, config: parsed };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON';
    const match = message.match(/position (\d+)/);
    const position = match ? parseInt(match[1]) : 0;
    
    // Приблизительный расчет строки и колонки
    const lines = jsonString.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    return {
      isValid: false,
      error: {
        line,
        column,
        message: `JSON Error: ${message}`
      }
    };
  }
};

// Валидация схемы конфигурации
export const validateConfigSchema = (config: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config || typeof config !== 'object') {
    errors.push('Configuration must be an object');
    return { isValid: false, errors };
  }

  if (config.title && typeof config.title !== 'string') {
    errors.push('Title must be a string');
  }

  if (!Array.isArray(config.fields)) {
    errors.push('Fields must be an array');
    return { isValid: false, errors };
  }

  config.fields.forEach((field: any, index: number) => {
    if (!field.id || typeof field.id !== 'string') {
      errors.push(`Field ${index}: id is required and must be a string`);
    }
    if (!field.type || !['numeric', 'string', 'multi-line', 'boolean', 'date', 'enum'].includes(field.type)) {
      errors.push(`Field ${index}: type must be one of: numeric, string, multi-line, boolean, date, enum`);
    }
    if (!field.label || typeof field.label !== 'string') {
      errors.push(`Field ${index}: label is required and must be a string`);
    }
    if (field.type === 'enum' && (!field.options || !Array.isArray(field.options))) {
      errors.push(`Field ${index}: enum type requires options array`);
    }
  });

  if (config.buttons && Array.isArray(config.buttons)) {
    config.buttons.forEach((button: any, index: number) => {
      if (!button.id || typeof button.id !== 'string') {
        errors.push(`Button ${index}: id is required and must be a string`);
      }
      if (!button.text || typeof button.text !== 'string') {
        errors.push(`Button ${index}: text is required and must be a string`);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
};

// Валидация значений полей формы
export const validateField = (field: FieldConfig, value: any): ValidationError | null => {
  const { type, required, min, max, minLength, maxLength } = field;

  // Проверка обязательности
  if (required && (value === undefined || value === null || value === '')) {
    return {
      field: field.id,
      message: `${field.label} is required`
    };
  }

  // Если поле не заполнено и не обязательно, пропускаем валидацию
  if (value === undefined || value === null || value === '') {
    return null;
  }

  switch (type) {
    case 'numeric':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return { field: field.id, message: `${field.label} must be a valid number` };
      }
      if (min !== undefined && numValue < min) {
        return { field: field.id, message: `${field.label} must be at least ${min}` };
      }
      if (max !== undefined && numValue > max) {
        return { field: field.id, message: `${field.label} must be at most ${max}` };
      }
      break;

    case 'string':
    case 'multi-line':
      const strValue = String(value);
      if (minLength !== undefined && strValue.length < minLength) {
        return { field: field.id, message: `${field.label} must be at least ${minLength} characters` };
      }
      if (maxLength !== undefined && strValue.length > maxLength) {
        return { field: field.id, message: `${field.label} must be at most ${maxLength} characters` };
      }
      break;

    case 'date':
      const dateValue = new Date(value);
      if (isNaN(dateValue.getTime())) {
        return { field: field.id, message: `${field.label} must be a valid date` };
      }
      break;

    case 'boolean':
      if (typeof value !== 'boolean') {
        return { field: field.id, message: `${field.label} must be true or false` };
      }
      break;

    case 'enum':
      if (field.options && !field.options.some(option => option.value === value)) {
        return { field: field.id, message: `${field.label} must be one of the available options` };
      }
      break;
  }

  return null;
};

// Валидация всей формы
export const validateForm = (config: FormConfig, formData: { [key: string]: any }): ValidationError[] => {
  const errors: ValidationError[] = [];

  config.fields.forEach(field => {
    const error = validateField(field, formData[field.id]);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};

// Получение значения по умолчанию для поля
export const getDefaultValue = (field: FieldConfig): any => {
  if (field.default !== undefined) {
    // Проверяем соответствие типа значения типу поля
    switch (field.type) {
      case 'numeric':
        return typeof field.default === 'number' ? field.default : Number(field.default);
      case 'boolean':
        return Boolean(field.default);
      case 'date':
        return field.default;
      case 'string':
      case 'multi-line':
        return String(field.default);
      case 'enum':
        return field.default;
      default:
        return field.default;
    }
  }

  // Возвращаем значения по умолчанию для каждого типа
  switch (field.type) {
    case 'numeric':
      return '';
    case 'string':
    case 'multi-line':
      return '';
    case 'boolean':
      return false;
    case 'date':
      return '';
    case 'enum':
      return field.options?.[0]?.value || '';
    default:
      return '';
  }
};

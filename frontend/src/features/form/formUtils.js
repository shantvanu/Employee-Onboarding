// src/features/form/formUtils.js

// Build default values out of schema
export const buildDefaultValues = (schema) => {
  const values = {};
  schema.fields.forEach((field) => {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'select':
      case 'date':
        values[field.name] = '';
        break;
      case 'number':
        values[field.name] = '';
        break;
      case 'multi-select':
        values[field.name] = [];
        break;
      case 'switch':
        values[field.name] = false;
        break;
      default:
        values[field.name] = '';
    }
  });
  return values;
};

// Build simple client-side validators based on schema rules
export const buildValidator = (field) => {
  const rules = field.validations || {};
  const required = field.required;

  return ({ value }) => {
    const v = value;

    if (required) {
      if (
        field.type === 'multi-select' &&
        Array.isArray(v) &&
        v.length === 0
      ) {
        return 'This field is required';
      }
      if (
        v === '' || v === null || v === undefined || (typeof v === 'string' && v.trim() === '')
      ) {
        return 'This field is required';
      }
    }

    if (field.type === 'text' || field.type === 'textarea') {
      if (rules.minLength && v && v.trim && v.trim().length < rules.minLength) {
        return `Minimum length is ${rules.minLength}`;
      }
      if (rules.maxLength && v && v.trim && v.trim().length > rules.maxLength) {
        return `Maximum length is ${rules.maxLength}`;
      }
      if (rules.regex && v) {
        const re = new RegExp(rules.regex);
        if (!re.test(v)) return 'Invalid format';
      }
    }

    if (field.type === 'number') {
      if (v !== '' && v !== null && v !== undefined) {
        const num = Number(v);
        if (Number.isNaN(num)) return 'Must be a number';
        if (rules.min !== undefined && num < rules.min) {
          return `Minimum value is ${rules.min}`;
        }
        if (rules.max !== undefined && num > rules.max) {
          return `Maximum value is ${rules.max}`;
        }
      }
    }

    if (field.type === 'date' && v) {
      if (rules.minDate) {
        const d = new Date(v);
        const min = new Date(rules.minDate);
        if (d < min) return `Date must be on or after ${rules.minDate}`;
      }
      if (rules.maxDate) {
        const d = new Date(v);
        const max = new Date(rules.maxDate);
        max.setHours(23, 59, 59, 999); // End of day
        if (d > max) return `Date cannot be in the future`;
      }
    }

    if (field.type === 'multi-select' && Array.isArray(v)) {
      if (rules.minSelected && v.length < rules.minSelected) {
        return `Select at least ${rules.minSelected} options`;
      }
      if (rules.maxSelected && v.length > rules.maxSelected) {
        return `Select at most ${rules.maxSelected} options`;
      }
    }

    return undefined;
  };
};

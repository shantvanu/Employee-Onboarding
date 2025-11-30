// src/validation/formValidator.js
const formSchema = require('../schema/formSchema');

const isEmpty = (value) =>
  value === undefined || value === null || (typeof value === 'string' && value.trim() === '') || value === '';

function validateSubmission(data) {
  const errors = {};

  for (const field of formSchema.fields) {
    const { name, type, required, validations = {}, options = [] } = field;
    const value = data[name];

    // Required validation
    if (required) {
      if (type === 'multi-select') {
        if (!Array.isArray(value) || value.length === 0) {
          errors[name] = 'This field is required';
          continue;
        }
      } else if (isEmpty(value)) {
        errors[name] = 'This field is required';
        continue;
      }
    }

    // Skip further validation if optional & empty
    if (!required && isEmpty(value)) continue;

    // Text / Textarea
    if (type === 'text' || type === 'textarea') {
      const str = String(value || '');
      const trimmed = str.trim();
      if (validations.minLength && trimmed.length < validations.minLength) {
        errors[name] = `Minimum length is ${validations.minLength}`;
      }
      if (validations.maxLength && trimmed.length > validations.maxLength) {
        errors[name] = `Maximum length is ${validations.maxLength}`;
      }
      if (validations.regex) {
        const regex = new RegExp(validations.regex);
        if (!regex.test(trimmed)) {
          errors[name] = 'Invalid format';
        }
      }
    }

    // Number
    if (type === 'number') {
      const num = Number(value);
      if (isNaN(num)) {
        errors[name] = 'Must be a number';
      }
      if (validations.min !== undefined && num < validations.min) {
        errors[name] = `Minimum value is ${validations.min}`;
      }
      if (validations.max !== undefined && num > validations.max) {
        errors[name] = `Maximum value is ${validations.max}`;
      }
    }

    // Select
    if (type === 'select') {
      const allowed = options.map((o) => o.value);
      if (!allowed.includes(value)) {
        errors[name] = 'Invalid selection';
      }
    }

    // Multi-select
    if (type === 'multi-select') {
      if (!Array.isArray(value)) {
        errors[name] = 'Invalid selection';
        continue;
      }
      const allowed = options.map((o) => o.value);
      if (value.some((v) => !allowed.includes(v))) {
        errors[name] = 'Invalid selection';
      }
      if (
        validations.minSelected &&
        value.length < validations.minSelected
      ) {
        errors[name] = `Select at least ${validations.minSelected}`;
      }
      if (
        validations.maxSelected &&
        value.length > validations.maxSelected
      ) {
        errors[name] = `Select at most ${validations.maxSelected}`;
      }
    }

    // Date
    if (type === 'date') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        errors[name] = 'Invalid date';
      }
      if (validations.minDate) {
        const minDate = new Date(validations.minDate);
        if (date < minDate) {
          errors[name] = `Date must be on or after ${validations.minDate}`;
        }
      }
      if (validations.maxDate) {
        // Handle "today" string or actual date
        const maxDateStr = validations.maxDate === 'today' 
          ? new Date().toISOString().split('T')[0] 
          : validations.maxDate;
        const maxDate = new Date(maxDateStr);
        maxDate.setHours(23, 59, 59, 999); // End of day
        if (date > maxDate) {
          errors[name] = `Date cannot be in the future`;
        }
      }
    }

    // Switch
    if (type === 'switch') {
      if (typeof value !== 'boolean') {
        errors[name] = 'Invalid value';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

module.exports = {
  validateSubmission
};

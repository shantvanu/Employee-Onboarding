// src/features/form/FieldRenderer.jsx
import Input from '../../components/ui/Input.jsx';
import Select from '../../components/ui/Select.jsx';
import Switch from '../../components/ui/Switch.jsx';
import MultiSelectCheckbox from '../../components/ui/MultiSelectCheckbox.jsx';

export default function FieldRenderer({ fieldDef, fieldApi }) {
  const { type, placeholder, options = [] } = fieldDef;
  const value = fieldApi.state.value;
  const onChange = fieldApi.handleChange;

  if (type === 'text' || type === 'number' || type === 'date') {
    // For date, set max attribute to today
    const maxDate = type === 'date' ? new Date().toISOString().split('T')[0] : undefined;
    return (
      <Input
        type={type === 'text' ? 'text' : type}
        placeholder={placeholder || ''}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        max={maxDate}
      />
    );
  }

  if (type === 'textarea') {
    const maxLength = fieldDef.validations?.maxLength;
    const currentLength = (value || '').length;
    const isOverLimit = maxLength && currentLength > maxLength;
    
    return (
      <div className="space-y-1">
        <textarea
          className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-100 ${
            isOverLimit
              ? 'border-rose-500 bg-white text-slate-900 dark:border-rose-500'
              : 'border-slate-300 bg-white text-slate-900 dark:border-slate-700'
          }`}
          placeholder={placeholder || ''}
          rows={4}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength ? maxLength + 10 : undefined}
        />
        {maxLength && (
          <div className="flex items-center justify-between text-xs">
            <span className={isOverLimit ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}>
              {isOverLimit && 'Character limit exceeded. '}
              {currentLength} / {maxLength} characters
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'select') {
    return (
      <Select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder || 'Select option'}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    );
  }

  if (type === 'multi-select') {
    const maxSelected = fieldDef.validations?.maxSelected;
    return (
      <MultiSelectCheckbox
        options={options}
        value={Array.isArray(value) ? value : []}
        onChange={onChange}
        maxSelected={maxSelected}
      />
    );
  }

  if (type === 'switch') {
    return <Switch checked={!!value} onChange={onChange} />;
  }

  return null;
}

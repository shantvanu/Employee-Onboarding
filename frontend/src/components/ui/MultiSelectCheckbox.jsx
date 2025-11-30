// src/components/ui/MultiSelectCheckbox.jsx
export default function MultiSelectCheckbox({ options = [], value = [], onChange, maxSelected }) {
  const selectedValues = Array.isArray(value) ? value : [];
  const isMaxReached = maxSelected && selectedValues.length >= maxSelected;

  const handleToggle = (optionValue) => {
    if (selectedValues.includes(optionValue)) {
      // Deselect
      onChange(selectedValues.filter((v) => v !== optionValue));
    } else {
      // Select (check max limit)
      if (isMaxReached) {
        return; // Don't allow more selections
      }
      onChange([...selectedValues, optionValue]);
    }
  };

  return (
    <div className="space-y-2 rounded-md border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);
        const isDisabled = !isChecked && isMaxReached;

        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
              isChecked
                ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
            } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleToggle(option.value)}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-800"
            />
            <span className="flex-1">{option.label}</span>
          </label>
        );
      })}
      {maxSelected && (
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {selectedValues.length} / {maxSelected} selected
        </div>
      )}
    </div>
  );
}


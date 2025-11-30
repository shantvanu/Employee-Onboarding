// src/components/ui/Input.jsx
export default function Input({ className = '', type, ...props }) {
  // Special styling for date input to match submit button color
  const isDate = type === 'date';
  const dateClasses = isDate
    ? 'border-sky-600 bg-sky-50 text-sky-900 focus:border-sky-600 focus:ring-sky-600 dark:bg-sky-900/20 dark:border-sky-500 dark:text-sky-100 dark:focus:border-sky-500 dark:focus:ring-sky-500'
    : 'border-slate-300 bg-white text-slate-900 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

  return (
    <input
      type={type}
      className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${dateClasses} ${className}`}
      {...props}
    />
  );
}

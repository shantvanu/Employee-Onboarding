// src/components/feedback/Alert.jsx
export default function Alert({ type = 'info', children }) {
  const colors = {
    info: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-700/60',
    error:
      'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/40 dark:text-rose-100 dark:border-rose-700/60',
    success:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-700/60',
  };

  return (
    <div
      className={`mb-3 rounded-md border px-3 py-2 text-xs ${colors[type]}`}
    >
      {children}
    </div>
  );
}

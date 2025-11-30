// src/components/ui/Button.jsx
export default function Button({
  children,
  className = '',
  variant = 'solid',
  size = 'md',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-60 disabled:cursor-not-allowed';
  const variants = {
    solid:
      'bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:bg-slate-400 disabled:hover:bg-slate-400',
    outline:
      'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400',
    ghost:
      'text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 disabled:text-slate-400',
  };
  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-sm',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// src/components/ui/Switch.jsx
export default function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex h-6 w-11 items-center rounded-full border px-0.5 transition ${
        checked
          ? 'border-sky-600 bg-sky-600'
          : 'border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800'
      }`}
    >
      <span
        className={`h-5 w-5 transform rounded-full bg-white shadow transition ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

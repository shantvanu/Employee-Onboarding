// src/components/ui/Toast.jsx
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const colors = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-rose-500 text-white',
    info: 'bg-sky-500 text-white',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
      <div
        className={`${colors[type]} rounded-lg px-4 py-3 shadow-lg min-w-[300px] flex items-center justify-between gap-4`}
      >
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition text-lg leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}


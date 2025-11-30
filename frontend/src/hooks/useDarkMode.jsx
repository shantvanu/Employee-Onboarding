// src/hooks/useDarkMode.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    // Default to light mode if nothing is saved
    const isDark = saved === 'dark';
    // Apply class immediately on initial render
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    return isDark;
  });

  // Update DOM and localStorage when dark state changes
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggleDark = () => {
    setDark((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);

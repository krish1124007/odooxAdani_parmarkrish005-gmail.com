import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('appTheme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('appTheme', JSON.stringify(isDark));
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    colors: isDark ? {
      bg: '#0a0e1a',
      bgSecondary: '#111827',
      bgTertiary: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      primary: '#714B67',
      primaryHover: '#5a3a52',
      primaryLight: '#8d5f80',
      accent: '#017E84',
      accentHover: '#016670',
      neutral: '#8F8F8F',
      danger: '#ef4444',
      dangerHover: '#dc2626',
      success: '#21B799',
      successHover: '#1a9280',
      warning: '#E4A900',
      warningHover: '#c99200',
      info: '#017E84',
      purple: '#714B67',
      teal: '#017E84',
      gold: '#E4A900'
    } : {
      bg: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#e9ecef',
      text: '#212529',
      textSecondary: '#64748b',
      border: '#d1d5db',
      primary: '#714B67',
      primaryHover: '#5a3a52',
      primaryLight: '#8d5f80',
      accent: '#017E84',
      accentHover: '#016670',
      neutral: '#8F8F8F',
      danger: '#ef4444',
      dangerHover: '#dc2626',
      success: '#21B799',
      successHover: '#1a9280',
      warning: '#E4A900',
      warningHover: '#c99200',
      info: '#017E84',
      purple: '#714B67',
      teal: '#017E84',
      gold: '#E4A900'
    }
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

import React from 'react';

const ThemeProvider = ({ children }) => {
  return (
    <div className="theme-provider">
      {children}
    </div>
  );
};

export default ThemeProvider;

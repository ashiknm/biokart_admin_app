// SelectedContext.js
import { createContext, useContext, useState } from 'react';

const SelectedContext = createContext();

export const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState('');

  // Function to set the selected item
  const setDefaultSelected = () => {
    setSelected('dashboard');
  };

  return (
    <SelectedContext.Provider value={{ selected, setSelected, setDefaultSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  return useContext(SelectedContext);
};

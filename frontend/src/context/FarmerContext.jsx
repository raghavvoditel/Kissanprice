import { createContext, useContext, useState } from 'react';

const FarmerContext = createContext(null);

export const FarmerProvider = ({ children }) => {
  const [selection, setSelection] = useState({
    state: 'Maharashtra',
    district: 'Nashik',
    town: 'Lasalgaon',
    commodity: 'onion',
    quantity: 50,
    grade: 'A',
    truck: 'small',
  });

  const update = (patch) => setSelection((s) => ({ ...s, ...patch }));

  return (
    <FarmerContext.Provider value={{ selection, setSelection, update }}>
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => {
  const ctx = useContext(FarmerContext);
  if (!ctx) throw new Error('useFarmer must be used within FarmerProvider');
  return ctx;
};

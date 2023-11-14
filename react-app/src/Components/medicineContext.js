// MedicinesContext.js

import { createContext, useContext, useState } from 'react';

const MedicinesContext = createContext();

export const MedicinesProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);

  const updateMedicines = (newMedicines) => {
    setMedicines(newMedicines);
  };

  return (
    <MedicinesContext.Provider value={{ medicines, updateMedicines }}>
      {children}
    </MedicinesContext.Provider>
  );
};

export const useMedicines = () => {
  const context = useContext(MedicinesContext);
  if (!context) {
    throw new Error('useMedicines must be used within a MedicinesProvider');
  }
  return context;
};

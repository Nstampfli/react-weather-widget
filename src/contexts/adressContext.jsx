import React, { createContext, useState } from 'react';

// Créez le contexte Adresse
export const AdresseContext = createContext();

// Créez le composant Provider pour fournir les données du contexte
function AdresseProvider({ children }) {
  const [adresse, setAdresse] = useState('');

  return (
    <AdresseContext.Provider value={{ adresse, setAdresse }}>
      {children}
    </AdresseContext.Provider>
  );
}

export default AdresseProvider;
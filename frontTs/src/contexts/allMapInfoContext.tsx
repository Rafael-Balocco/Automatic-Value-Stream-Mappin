// MapInfoContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definir o tipo de dados do formulário para o componente MapInfo
type MapInfoFormValues = {
  enterpriseName: string;
  creatorName: string;
};

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

// Definir o tipo para o contexto do componente MapInfo
export type MapInfoContextType = {
  formData: MapInfoFormValues;
  updateFormData: (data: MapInfoFormValues) => void;
};

// Criar o contexto para o componente MapInfo
const MapInfoContext = createContext<MapInfoContextType | undefined>(undefined);

// Provedor do contexto do componente MapInfo
export const MapInfoProvider: React.FC <MyComponentProps>= ({ children }) => {
  const [formData, setFormData] = useState<MapInfoFormValues>({
    enterpriseName: '',
    creatorName: '',
  });

  const updateFormData = (data: MapInfoFormValues) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <MapInfoContext.Provider value={{ formData, updateFormData }}>
      {children}
    </MapInfoContext.Provider>
  );
};

// Hook personalizado para usar o contexto do componente MapInfo
export const useMapInfoContext = () => {
  const context = useContext(MapInfoContext);
  if (!context) {
    throw new Error('useMapInfoContext must be used within a MapInfoProvider');
  }
  return context;
};

import React from 'react';
import {createContext, useState, useContext } from "react";

// Defina o tipo do estado do contexto
export type SupplierContextState = {
  numberOfSuppliers: number;
  updateNumberOfSuppliers: (newNumberOfSuppliers: number) => void;
};

interface MyComponentProps {
  // Other props...
  children?: React.ReactNode; // Optional children prop with ReactNode type
}

// Crie o contexto
export const SupplierContext = createContext<SupplierContextState | null>(null);

// Crie o provider do contexto
export const SupplierProvider: React.FC <MyComponentProps> = ({ children }) => {
  const [numberOfSuppliers, setNumberOfSuppliers] = useState<number>(1);

  // Função para atualizar o valor de "numberOfSuppliers"
  const updateNumberOfSuppliers = (newNumberOfSuppliers: number) => {
    setNumberOfSuppliers(newNumberOfSuppliers);
  };

  // Valor a ser fornecido para os consumidores do contexto
  const contextValue = {
    numberOfSuppliers,
    updateNumberOfSuppliers,
  };

  return (
    <SupplierContext.Provider value={contextValue}>
      {children}
    </SupplierContext.Provider>
  );
};

// Crie o hook para consumir o contexto
export const useSupplierContext = () => {
  const context = useContext(SupplierContext);

  if (!context) {
    throw new Error('useSupplierContext must be used within a SupplierProvider');
  }

  return context;
};

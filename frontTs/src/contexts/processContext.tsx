import React from 'react';
import {createContext, useState, useContext } from "react";

// Defina o tipo do estado do contexto
export type ProcessContextState = {
  numberOfProcess: number;
  updateNumberOfProcess: (newNumberOfProcess: number) => void;
};

interface MyComponentProps {
  // Other props...
  children?: React.ReactNode; // Optional children prop with ReactNode type
}

// Crie o contexto
export const ProcessContext = createContext<ProcessContextState | null>(null);

// Crie o provider do contexto
export const ProcessProvider: React.FC <MyComponentProps> = ({ children }) => {
  const [numberOfProcess, setNumberOfProcess] = useState<number>(0);

  // Função para atualizar o valor de "numberOfProcess"
  const updateNumberOfProcess = (newNumberOfProcess: number) => {
    setNumberOfProcess(newNumberOfProcess);
  };

  // Valor a ser fornecido para os consumidores do contexto
  const contextValue = {
    numberOfProcess,
    updateNumberOfProcess,
  };

  return (
    <ProcessContext.Provider value={contextValue}>
      {children}
    </ProcessContext.Provider>
  );
};

// Crie o hook para consumir o contexto
export const useProcessContext = () => {
  const context = useContext(ProcessContext);

  if (!context) {
    throw new Error('useProcessContext must be used within a ProcessProvider');
  }

  return context;
};

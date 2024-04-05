// CustomerContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definir o tipo de dados do formulário para o componente Customer
type CustomerFormValues = {
  CustomerName: string;
  demand: string;
};

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

// Definir o tipo para o contexto do componente Customer
export type CustomerContextType = {
  formData: CustomerFormValues;
  updateFormData: (data: CustomerFormValues) => void;
};

// Criar o contexto para o componente Customer
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Provedor do contexto do componente Customer
export const CustomerProvider: React.FC <MyComponentProps> = ({ children }) => {
  const [formData, setFormData] = useState<CustomerFormValues>({
    CustomerName: '',
    demand: '',
  });

  const updateFormData = (data: CustomerFormValues) => {
    setFormData({ ...formData, ...data });
  };

  return (
    <CustomerContext.Provider value={{ formData, updateFormData }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Hook personalizado para usar o contexto do componente Customer
export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

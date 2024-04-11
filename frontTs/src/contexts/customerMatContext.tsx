// CustomerMaterialFlowContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/MatFlow';

// Definir o tipo de dados do formulário para o componente de material do cliente

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

// Definir o tipo para o contexto do componente de material do cliente
export type CustomerMaterialFlowContextType = {
  CusformData: FormValues['customer'];
  updateCusFormData: (data: FormValues['customer']) => void;
};

// Criar o contexto para o componente de material do cliente
const CustomerMaterialFlowContext = createContext<CustomerMaterialFlowContextType | undefined>(undefined);

// Provedor do contexto do componente de material do cliente
export const CustomerMaterialFlowProvider: React.FC <MyComponentProps> = ({ children }) => {
  const [CusformData, setCusFormData] = useState<FormValues['customer']>({
    modeCustomer: "Select an Option",
    periodShiftCustomer: null,
    quantityShiftCustomer: null
  });

  const updateCusFormData = (data: FormValues['customer']) => {
    setCusFormData({ ...CusformData, ...data });
  };

  return (
    <CustomerMaterialFlowContext.Provider value={{ CusformData, updateCusFormData }}>
      {children}
    </CustomerMaterialFlowContext.Provider>
  );
};

// Hook personalizado para usar o contexto do componente de material do cliente
export const useCustomerMaterialFlowContext = () => {
  const context = useContext(CustomerMaterialFlowContext);
  if (!context) {
    throw new Error('useCustomerMaterialFlowContext must be used within a CustomerMaterialFlowProvider');
  }
  return context;
};

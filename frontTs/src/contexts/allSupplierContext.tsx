// allsupplierContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definir o tipo de dados dos fornecedores para o componente Supplier
type SupplierData = {
  id: number;
  supplierName: string;
  whatSupplies: string;
};

interface SupplierProviderProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

// Definir o tipo para o contexto do componente Supplier
export type allSupplierContextType = {
  suppliers: SupplierData[];
  addSupplier: () => void;
  removeSupplier: (id: number) => void;
};

// Criar o contexto para o componente Supplier
const allSupplierContext = createContext<allSupplierContextType | undefined>(undefined);

// Provedor do contexto do componente Supplier
export const allSupplierProvider: React.FC <SupplierProviderProps>= ({ children }) => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);

  const addSupplier = () => {
    const newSupplier: SupplierData = { id: Date.now(), supplierName: '', whatSupplies: '' };
    setSuppliers([...suppliers, newSupplier]);
  };

  const removeSupplier = (id: number) => {
    const newSuppliers = suppliers.filter((supplier) => supplier.id !== id);
    setSuppliers(newSuppliers);
  };

  return (
    <allSupplierContext.Provider value={{ suppliers, addSupplier, removeSupplier}}>
      {children}
    </allSupplierContext.Provider>
  );
};

// Hook personalizado para usar o contexto do componente Supplier
export const useAllSupplierContext = () => {
  const context = useContext(allSupplierContext);
  if (!context) {
    throw new Error('useAllSupplierContext must be used within a SupplierProvider');
  }
  return context;
};

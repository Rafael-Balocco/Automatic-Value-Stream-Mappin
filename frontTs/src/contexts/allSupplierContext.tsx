// supplierContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definir o tipo de dados dos fornecedores para o componente Supplier
type SupplierData = {
  id: number;
  supplierName: string;
  whatSupplies: string;
};

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

// Definir o tipo para o contexto do componente Supplier
export type SupplierContextType = {
  suppliers: SupplierData[];
  addSupplier: () => void;
  removeSupplier: (id: number) => void;
  updateSupplier: (id: number, newData: Partial<SupplierData>) => void;
};

// Criar o contexto para o componente Supplier
const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

// Provedor do contexto do componente Supplier
export const SupplierProvider: React.FC <MyComponentProps>= ({ children }) => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);

  const addSupplier = () => {
    const newSupplierId = suppliers.length > 0 ? suppliers[suppliers.length - 1].id + 1 : 1;
    setSuppliers([...suppliers, { id: newSupplierId, supplierName: '', whatSupplies: '' }]);
  };

  const removeSupplier = (id: number) => {
    const newSuppliers = suppliers.filter((supplier) => supplier.id !== id);
    setSuppliers(newSuppliers);
  };

  const updateSupplier = (id: number, newData: Partial<SupplierData>) => {
    const updatedSuppliers = suppliers.map((supplier) => {
      if (supplier.id === id) {
        return { ...supplier, ...newData };
      }
      return supplier;
    });
    setSuppliers(updatedSuppliers);
  };

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier, removeSupplier, updateSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
};

// Hook personalizado para usar o contexto do componente Supplier
export const useAllSupplierContext = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplierContext must be used within a SupplierProvider');
  }
  return context;
};

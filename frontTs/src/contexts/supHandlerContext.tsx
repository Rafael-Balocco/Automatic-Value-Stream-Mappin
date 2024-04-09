
import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/Supplier'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllSupplierContextType {
      suppliers: FormValues['supNumbers'];
      updateSupplier: (index: number, newSupplier: FormValues['supNumbers'][number]) => void;
  }
  
  // Crie o contexto
  const AllSupplierContext = createContext<AllSupplierContextType>({
    suppliers:[],
    updateSupplier: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllSupplierContext = () => {
      const context = useContext(AllSupplierContext);
      if (!context) {
          throw new Error('useAllSupplierContext must be used within a SupplierProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllSupplierProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [suppliers, setSuppliers] = useState<FormValues['supNumbers']>([]);
  
      const updateSupplier = (index: number, newSupplier: FormValues['supNumbers'][number]) => {
        if(index === 0){
            setSuppliers([]);
        }

        setSuppliers((prevSuppliers) => {
          // Create a copy of the previous suppliers array to avoid mutation
          const updatedSuppliers = [...prevSuppliers];
          updatedSuppliers[index] = newSupplier;
          // Return the updated array
          return updatedSuppliers;
        });
      };      
  
      return (
          <AllSupplierContext.Provider value={{ suppliers, updateSupplier }}>
              {children}
          </AllSupplierContext.Provider>
      );
  };
  
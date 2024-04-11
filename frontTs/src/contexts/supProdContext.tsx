import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/infoFlow'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllSupProdContextType {
      SupProds: FormValues['supplierProd'];
      updateSupProd: (index: number, newSupProd: FormValues['supplierProd'][number]) => void;
  }
  
  // Crie o contexto
  const AllSupProdContext = createContext<AllSupProdContextType>({
    SupProds:[],
    updateSupProd: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllSupProdContext = () => {
      const context = useContext(AllSupProdContext);
      if (!context) {
          throw new Error('useAllSupProdContext must be used within a SupProdProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllSupProdProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [SupProds, setSupProds] = useState<FormValues['supplierProd']>([]);
  
      const updateSupProd = (index: number, newSupProd: FormValues['supplierProd'][number]) => {
        if(index === 0){
            setSupProds([]);
        }

        setSupProds((prevSupProds) => {
          // Create a copy of the previous SupProds array to avoid mutation
          const updatedSupProds = [...prevSupProds];
          updatedSupProds[index] = newSupProd;
          // Return the updated array
          return updatedSupProds;
        });
      };      
  
      return (
          <AllSupProdContext.Provider value={{ SupProds, updateSupProd }}>
              {children}
          </AllSupProdContext.Provider>
      );
  };
  
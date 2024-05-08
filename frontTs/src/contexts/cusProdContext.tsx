import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/infoFlow'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllCusProdContextType {
      CusProds: FormValues['customerProd'];
      updateCusProd: (index: number, newCusProd: FormValues['customerProd'][number]) => void;
      transformCusProds: (newArray: FormValues['customerProd']) => void;
  }
  
  // Crie o contexto
  const AllCusProdContext = createContext<AllCusProdContextType>({
    CusProds:[],
    updateCusProd: () =>{},
    transformCusProds: () => {},
  })
  
  // Hook para usar o contexto
  export const useAllCusProdContext = () => {
      const context = useContext(AllCusProdContext);
      if (!context) {
          throw new Error('useAllCusProdContext must be used within a CusProdProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllCusProdProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [CusProds, setCusProds] = useState<FormValues['customerProd']>([]);
  
      const updateCusProd = (index: number, newCusProd: FormValues['customerProd'][number]) => {
        if(index === 0){
            setCusProds([]);
        }

        setCusProds((prevCusProds) => {
          // Create a copy of the previous CusProds array to avoid mutation
          const updatedCusProds = [...prevCusProds];
          updatedCusProds[index] = newCusProd;
          // Return the updated array
          return updatedCusProds;
        });
      };      

      const transformCusProds = (newArray: FormValues['customerProd']) => {
        setCusProds(newArray);
      };

      return (
          <AllCusProdContext.Provider value={{ CusProds, updateCusProd, transformCusProds }}>
              {children}
          </AllCusProdContext.Provider>
      );
  };
  
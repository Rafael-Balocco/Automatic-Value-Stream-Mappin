import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/infoFlow'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllProcProdContextType {
      ProcProds: FormValues['processProd'];
      updateProcProd: (index: number, newProcProd: FormValues['processProd'][number]) => void;
      transformProcProds: (newArray: FormValues['processProd']) => void;
}
  
  // Crie o contexto
  const AllProcProdContext = createContext<AllProcProdContextType>({
    ProcProds:[],
    updateProcProd: () =>{},
    transformProcProds: () => {},
  })
  
  // Hook para usar o contexto
  export const useAllProcProdContext = () => {
      const context = useContext(AllProcProdContext);
      if (!context) {
          throw new Error('useAllProcProdContext must be used within a ProcProdProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllProcProdProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [ProcProds, setProcProds] = useState<FormValues['processProd']>([]);
  
      const updateProcProd = (index: number, newProcProd: FormValues['processProd'][number]) => {
        if(index === 0){
            setProcProds([]);
        }

        setProcProds((prevProcProds) => {
          // Create a copy of the previous ProcProds array to avoid mutation
          const updatedProcProds = [...prevProcProds];
          updatedProcProds[index] = newProcProd;
          // Return the updated array
          return updatedProcProds;
        });
      };
      
      const transformProcProds = (newArray: FormValues['processProd']) => {
        setProcProds(newArray);
    };
  
      return (
          <AllProcProdContext.Provider value={{ ProcProds, updateProcProd, transformProcProds }}>
              {children}
          </AllProcProdContext.Provider>
      );
  };
  
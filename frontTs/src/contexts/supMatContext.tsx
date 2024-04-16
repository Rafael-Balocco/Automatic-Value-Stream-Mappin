
import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/MatFlow'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllSupMatContextType {
      SupMats: FormValues['supplier'];
      updateSupMat: (index: number, newSupMat: FormValues['supplier'][number]) => void;
  }
  
  // Crie o contexto
  const AllSupMatContext = createContext<AllSupMatContextType>({
    SupMats:[],
    updateSupMat: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllSupMatContext = () => {
      const context = useContext(AllSupMatContext);
      if (!context) {
          throw new Error('useAllSupMatContext must be used within a SupMatProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllSupMatProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [SupMats, setSupMats] = useState<FormValues['supplier']>([]);
  
      const updateSupMat = (index: number, newSupMat: FormValues['supplier'][number]) => {
        if(index === 0){
            setSupMats([]);
        }

        setSupMats((prevSupMats) => {
          // Create a copy of the previous SupMats array to avoid mutation
          const updatedSupMats = [...prevSupMats];
          updatedSupMats[index] = newSupMat;
          // Return the updated array
          return updatedSupMats;
        });
      };      
  
      return (
          <AllSupMatContext.Provider value={{ SupMats, updateSupMat }}>
              {children}
          </AllSupMatContext.Provider>
      );
  };
  
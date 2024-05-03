import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/infoFlow'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllSelectedBoxType {
      SelBox: FormValues['selectbox'];
      updateSelBox: (index: number, newSelBox: FormValues['selectbox'][number]) => void;
  }
  
  // Crie o contexto
  const AllSelBoxContext = createContext<AllSelectedBoxType>({
    SelBox:[],
    updateSelBox: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllSelBoxContext = () => {
      const context = useContext(AllSelBoxContext);
      if (!context) {
          throw new Error('useAllSelBoxContext must be used within a SelBoxProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllSelBoxProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [SelBox, setSelBox] = useState<FormValues['selectbox']>([]);
  
      const updateSelBox = (index: number, newSelBox: FormValues['selectbox'][number]) => {
        if(index === 0){
            setSelBox([]);
        }

        setSelBox((prevSelBox) => {
          // Create a copy of the previous SelBox array to avoid mutation
          const updatedSelBox = [...prevSelBox];
          updatedSelBox[index] = newSelBox;
          // Return the updated array
          return updatedSelBox;
        });
      };      
  
      return (
          <AllSelBoxContext.Provider value={{ SelBox, updateSelBox }}>
              {children}
          </AllSelBoxContext.Provider>
      );
  };
  
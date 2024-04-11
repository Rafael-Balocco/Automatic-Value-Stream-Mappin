
import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/Process'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllProcessContextType {
      processes: FormValues['proNumbers'];
      updateProcess: (index: number, newProcess: FormValues['proNumbers'][number]) => void;
  }
  
  // Crie o contexto
  const AllProcessContext = createContext<AllProcessContextType>({
    processes:[],
    updateProcess: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllProcessContext = () => {
      const context = useContext(AllProcessContext);
      if (!context) {
          throw new Error('useAllProcessContext must be used within a SupplierProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllProcessProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [processes, setProcesses] = useState<FormValues['proNumbers']>([]);
  
      const updateProcess = (index: number, newProcess: FormValues['proNumbers'][number]) => {
        if(index === 0){
            setProcesses([]);
        }

        setProcesses((prevProcesses) => {
          // Create a copy of the previous processes array to avoid mutation
          const updatedProcesses = [...prevProcesses];
          updatedProcesses[index] = newProcess;
          // Return the updated array
          return updatedProcesses;
        });
      };      
  
      return (
          <AllProcessContext.Provider value={{ processes, updateProcess }}>
              {children}
          </AllProcessContext.Provider>
      );
  };
  
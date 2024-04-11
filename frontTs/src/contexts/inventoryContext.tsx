
import React, { createContext, useContext, useState } from 'react';
import { FormValues } from '../components/Inventory'; // Importe o tipo FormValues aqui

interface MyComponentProps {
    // Other props...
    children?: React.ReactNode; // Optional children prop with ReactNode type
  }

  // Defina o tipo para o fornecedor
  
  // Defina o tipo para o contexto
  interface AllInventoryContextType {
      inventories: FormValues['inventories'];
      updateInventory: (index: number, newInventory: FormValues['inventories'][number]) => void;
  }
  
  // Crie o contexto
  const AllInventoryContext = createContext<AllInventoryContextType>({
    inventories:[],
    updateInventory: () =>{},
  })
  
  // Hook para usar o contexto
  export const useAllInventoryContext = () => {
      const context = useContext(AllInventoryContext);
      if (!context) {
          throw new Error('useAllInventoryContext must be used within a InventoryProvider');
      }
      return context;
  };
  
  // Provedor do contexto
  export const AllInventoryProvider: React.FC <MyComponentProps> = ({ children }) => {
      const [inventories, setInventories] = useState<FormValues['inventories']>([]);
  
      const updateInventory = (index: number, newInventory: FormValues['inventories'][number]) => {
        if(index === 0){
            setInventories([]);
        }

        setInventories((prevInventories) => {
          // Create a copy of the previous inventories array to avoid mutation
          const updatedInventories = [...prevInventories];
          updatedInventories[index] = newInventory;
          // Return the updated array
          return updatedInventories;
        });
      };      
  
      return (
          <AllInventoryContext.Provider value={{ inventories, updateInventory }}>
              {children}
          </AllInventoryContext.Provider>
      );
  };
  
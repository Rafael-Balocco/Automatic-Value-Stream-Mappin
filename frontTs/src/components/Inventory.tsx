import { useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useProcessContext } from '../contexts/processContext';
import React, {useEffect} from 'react';
import { useAllInventoryContext } from '../contexts/inventoryContext';


export type FormValues = {
  inventories: {
    processINumber: number | null;
  }[]
}

export const Inventory: React.FC = () => {

  const {inventories, updateInventory} = useAllInventoryContext();
  const { numberOfProcess } = useProcessContext();
  const { register, formState, handleSubmit,setValue} = useForm<FormValues>({
    defaultValues:{
      inventories: [{ processINumber: null }]
    }
  });
  const navigate = useNavigate(); // Instancia o hook useNavigate
  const { errors } = formState;

  useEffect(()=>{
    setValue('inventories', inventories)
  }, [inventories, setValue] );


  const renderInventory = () => {
    const inventories = [];
    for (let j = 0; j < numberOfProcess; j++) {
      inventories.push(
        <div key={`inventory${j}`} id={`inventory${j}`} className="inventory">
          <br />
          <label htmlFor={`inventories.${j}.processINumber`}>Process {j + 1} Inventory:</label>
          <input type="number"
            {...register(`inventories.${j}.processINumber`, {
              required: {
                value: true,
                message: "Inventory is Required, and MUST receive only numbers",
              },
              validate: value => {
                if (value != null) {
                  if (value < 0) {
                    return 'Inventory must be positive!'
                  }
                  if (isNaN(Number(value))) {
                    return 'Please enter a valid number!';
                  }
                  return true;
                }
              }
            } as const)} />
          <p className='errorsValidation'>{errors?.inventories?.[j]?.processINumber?.message}</p>
        </div>
      );
      if (j < numberOfProcess - 1) {
        inventories.push(
          <div className='divisionLine'></div>
        )
      }
    }
    return inventories;
  };

  const onSubmit = async (data:any) => {
    try {
      for(let i =0; i< numberOfProcess; i++){
        const updatedInventory = {
          processINumber: data.inventories[i].processINumber
        };
        updateInventory(i, updatedInventory);
        console.log("Inventory: ", updatedInventory, " Saved ", i)
      }
      navigate("/MaterialFlow")
    } catch (error) {
      
    }
  }

  const handlePrevious = () => {
    navigate('/process')
  }

  return (
    <div>
      <Header />
      <main>
        <div className="tabContainer">
          <ul>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Map Infos</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Supplier</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Customer</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Process Creation</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Inventory</a></li>
            <li><a>Material Flow Data</a></li>
            <li><a>Informational Flow Data</a></li>
          </ul>
        </div>
        <div className='tab'>
          <form id="inventoryForm" onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off" noValidate>
            <div className="flex-container">
              <button type="submit">Submit / Next</button>
            </div>
            <div className='previousButton'>
              <button type="button" onClick={handlePrevious}>Previous</button>
            </div>
            <br /><br />
            <h2>Inventory</h2>
            <div className='inventory'>
              {renderInventory()}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inventory;

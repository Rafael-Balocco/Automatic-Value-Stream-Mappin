import {useForm} from 'react-hook-form'
import React from 'react';
import { useProcessContext } from '../contexts/processContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate


type FormValues = {
  inventories:{
    processINumber: number | null;
  }[]
}

export const Inventory: React.FC = () => {
  
  const form = useForm<FormValues>({
    defaultValues:{
      inventories:[{processINumber:null}] 
    },
  });
  
  const { numberOfProcess } = useProcessContext();
  const navigate = useNavigate(); // Instancia o hook useNavigate
  const { register, control, formState, handleSubmit} = form;
  const {errors} = formState;


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
              validate: value =>{
                if(value !=null){
                  if (value<0){
                    return 'Inventory must be positive!'
                  }
                  if (isNaN(Number(value))) {
                    return 'Please enter a valid number!';
                  }
                  return true;
                }
              }
          } as const )} />
          <p className='errorsValidation'>{errors?.inventories?.[j]?.processINumber?.message}</p>                                            
          <br />
        </div>
      );
      if(j < numberOfProcess -1){
        inventories.push(
          <div className='divisionLine'></div>
        )
      }
    }
    return inventories;
  };

  const onSubmit = (dataForm:FormValues) =>{
    console.log('Form Submitted:', dataForm);
    navigate('/MaterialFlow');
  }

  return (
    <div>
      <Header/>
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
          <h2>Inventory</h2>
          <form id="inventoryForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <div className='inventory'>
              {renderInventory()}
            </div>
            <div className="flex-container">
              <button type="submit">Send / Next Page</button>
            </div>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Inventory;

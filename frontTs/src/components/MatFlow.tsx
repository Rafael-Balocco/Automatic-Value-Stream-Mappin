import {useForm} from 'react-hook-form'
import React from 'react';
import { useSupplierContext } from '../contexts/supplierContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

enum Mode {
    Airplane = 'Airplane',
    Bike = 'Bike',
    Car = 'Car',
    MultiModal = 'Multi Modal',
    Ship = 'Ship',
    Train = 'Train',
    Truck = 'Truck',
}

type FormValues = {
    customer:{
        modeCustomer: Mode | "Select an Option";
        periodShiftCustomer: number | null;
        quantityShiftCustomer: number | null;
    }
    supplier: {
        modeSupplier:Mode | "Select an Option";
        periodShiftSupplier: number | null;
        quantityShiftSupplier:number | null;
    }[]
}

export const MatFlow: React.FC = () =>{

    const form = useForm<FormValues>({
        defaultValues:{
            customer:{modeCustomer: "Select an Option", periodShiftCustomer: null, quantityShiftCustomer: null},
            supplier:[{modeSupplier: "Select an Option", periodShiftSupplier: null, quantityShiftSupplier:null}]
        },
      });

    const { numberOfSuppliers } = useSupplierContext();
    const navigate = useNavigate(); // Instancia o hook useNavigate
    const { register, control, formState, handleSubmit} = form;
    const {errors} = formState;

    const onSubmit = (dataForm:FormValues) =>{
        console.log('Form Submitted:', dataForm);
        navigate('/InfoFlow');
      }

    const renderSuppliers = () => {
        const suppliers = [];
        for (let j = 0; j < numberOfSuppliers; j++) {
          suppliers.push(
            <div key={`SupMatFlow${j}`} id={`SupMatFlow${j}`} className="SupMatFlow">
                <br />
                <h3>Supplier Number {j+1}</h3>
                <br/>
                <label htmlFor = {`supplier.${j}.modeSupplier`}>Transport Mode:</label>
                    <select {...register(`supplier.${j}.modeSupplier`, {
                        required:{
                            value:true,
                            message: "Supplier's Mode of Transportation is Required!"
                        }
                    } as const )}>
                        <option value="" disabled hidden>Select an option</option>
                        <option value="Airplane">Airplane</option>
                        <option value="Bike">Bike</option>
                        <option value="Car">Car</option>
                        <option value="Multi">Multi Modal</option>
                        <option value="Ship">Ship</option>
                        <option value="Train">Train</option>
                        <option value="Truck">Truck</option>
                    </select>
                    <p className='errorsValidation'>{errors?.supplier?.[j]?.modeSupplier?.message}</p>  
                <br />
                <br />
                <label htmlFor={`supplier.${j}.periodShiftSupplier`}>Shift Period:</label>
                <input type="text" 
                {...register(`supplier.${j}.periodShiftSupplier`)} />
                
                <label htmlFor={`supplier.${j}.quantityShiftSupplier`}>Quantity per Shift:</label>
                <input type="text" 
                {...register(`supplier.${j}.quantityShiftSupplier`)} />
            </div>
          );
          if(j < numberOfSuppliers -1){
            suppliers.push(
                <div className='divisionLine'></div>
            )
          }
        }
        return suppliers;
      };

    return(
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
                    <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Material Flow Data</a></li>
                    <li><a>Informational Flow Data</a></li>
                </ul>
            </div>

            <form id="MatForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                <div className='consumerTab'>
                    <h2>Customer Material Flow</h2>
                    <div className='consumerMat'>
                        <br/>
                        <label htmlFor = {`customer.modeCustomer`}>Transport Mode:</label>
                        <select {...register(`customer.modeCustomer`, {
                            required:{
                                value:true,
                                message: "Customer's Mode of Transportation is Required!"
                            }
                        } as const )}>
                            <option value="" disabled hidden>Select an option</option>
                            <option value="Airplane">Airplane</option>
                            <option value="Bike">Bike</option>
                            <option value="Car">Car</option>
                            <option value="Multi">Multi Modal</option>
                            <option value="Ship">Ship</option>
                            <option value="Train">Train</option>
                            <option value="Truck">Truck</option>
                        </select>
                        <p className='errorsValidation'>{errors?.customer?.modeCustomer?.message}</p>  
                        <br />
                        <br />
                        <label htmlFor={`customer.periodShiftCustomer`}>Shift Period:</label>
                        <input type="text" 
                        {...register(`customer.periodShiftCustomer`)} />
                        
                        <label htmlFor={`customer.quantityShiftCustomer`}>Quantity per Shift:</label>
                        <input type="text" 
                        {...register(`customer.quantityShiftCustomer`)} />
                    </div>
                </div>
                <div className='tab'>
                    <h2>Supplier Material Flow</h2>
                    <div className='matSupContainer'>
                        {renderSuppliers()}
                    </div>

                    <div className="flex-container">
                    <button type="submit" >Send / Next Page</button>
                    </div>
                </div>
            </form>
            
            </main>
            <Footer/>
        </div>
    )
}
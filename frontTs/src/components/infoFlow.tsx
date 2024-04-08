import {useFieldArray, useForm} from 'react-hook-form'
import React, { useState } from 'react';
import { useProcessContext } from '../contexts/processContext';
import { useSupplierContext } from '../contexts/supplierContext';
import Header from './Header';
import Footer from './Footer';
import finalResultImage from '../images/Final Result.png';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

type FormValues ={
    customerProd:{
        typeCus: "physical" | "eletronic" | "Select an Option";
        receiveCus: "Production Control" | "Supplier" | "Select an Option";
        periodCus: string | null;
        contentCus:string | null;
    }[]
    supplierProd:{
        typeSup: "physical" | "eletronic" | "Select an Option";
        receiveSup: "Production Control" | "Supplier" | "Select an Option";
        periodSup: string | null;
        contentSup:string | null;
        supNumber: number | null;

    }[]
    processProd:{
        typeProcess: "physical" | "eletronic" | "Select an Option";
        receiveProcess: "Production Control" | "Process" | "Select an Option";
        periodProcess: string| null;
        contentProcess: string | null;
        processNumber: number | null;
    }[]

    selectbox:{
        connection: string | "Select an Option";
    }[]
}


const CustomerProductionForm: React.FC<{index:number, register: any, errors:any}> = ({index, register, errors}) => {
    return (
        <div className={`customer&MRP.${index}`}>
            <br/>
            <h3>Flow Between Customer and Production Control</h3>
            <br/>
            <label htmlFor={`typeCus.${index}`}>Type of Information:</label>
            <select {...register (`customerProd.${index}.typeCus`, {
                required:{
                    value:true,
                    message: "Type of Information is Required"
                }
            }as const)}>
                    <option value="" disabled hidden>Select an option</option>
                    <option value="eletronic">Eletronic (Email, Message ...)</option>
                    <option value="physical">Physical (Document, Told ...)</option>
            </select>
            <p className='errorsValidation'>{errors?.customerProd?.[index]?.typeCus?.message}</p>
            <br/><br/>
            <label htmlFor={`receiveCus.${index}`}>Who receive the Information:</label>
            <select {...register (`customerProd.${index}.receiveCus`, {
                required:{
                    value:true,
                    message: "Receiver is Required!"
                }
            })}>
                <option value="" disabled hidden>Select an option</option>
                <option value="Production Control">Production Control</option>
                <option value="Customer">Customer</option>
            </select>
            <p className='errorsValidation'>{errors?.customerProd?.[index]?.receiveCus?.message}</p>
            <br/><br/>
            <label htmlFor={`periodCus.${index}`}>Period (Specify the Unit):</label>
            <input type="text" {...register (`customerProd.${index}.periodCus`)}/>
            <br/>
            <label htmlFor={`contentCus.${index}`}>Information Content:</label>
            <input type="text" {...register (`customerProd.${index}.contentCus`)}/>
            <br/>
        </div>
    );
  };
  
 const SupplierProductionForm: React.FC<{index:number, register: any, errors:any, numberOfSuppliers:number }> = ({index, register, errors, numberOfSuppliers}) => {
    return(
        <div>
            <div className={`supplier&production${index}`}>
                <br/>
                <h3>Flow Between Supplier and Production Control</h3>
                <br/>
                <label htmlFor={`typeSup${index}`}>Type of Information:</label>
                <select {...register(`supplierProd.${index}.typeSup`, {
                    required:{
                        value:true,
                        message: "Type of Information is Required!"
                    }                   
                } as const)}>
                <option value="" disabled hidden>Select an option</option>
                <option value = "eletronic">Eletronic (Email, SMS, ...)</option>
                <option value="physical"> Physical (Documnt, Told, ...)</option>
                </select>
                <p className='errorsValidation'>{errors?.supplierProd?.[index]?.typeSup?.message}</p>
                <br/><br/>
                <label htmlFor={`receiveSup.${index}`}>Who receive the Information:</label>
                  <select {...register(`supplierProd.${index}.receiveSup`, {
                    required:{
                        value:true,
                        message: "Receiver is Required!"
                    }
                  } as const)}>
                    <option value="" disabled hidden>Select an option</option>
                    <option value="Production Control">Production Control</option>
                    <option value="Supplier">Supplier</option>  
                  </select> 
                  <p className='errorsValidation'>{errors?.supplierProd?.[index]?.receiveSup?.message}</p>
                  <br/><br/>
                <label htmlFor={`periodSup.${index}`}>Period (Specify the Unit):</label>
                <input type="text" {...register(`supplierProd.${index}.periodSup`)} />
                <br/>
                <label htmlFor="contentSup">Information Content:</label>
                <input type="text" {...register(`supplierProd.${index}.contentSup`)} />
                <br/>
                <label htmlFor="supNumber">Supplier Number (Same in Supplier Tab):</label>
                <input type="number" 
                {...register(`supplierProd.${index}.supNumber`, {
                    required:{
                        value:true,
                        message: "Supplier Number is Required"
                    },
                    validate: (value:number) =>{
                        if(value !=null){
                            if( value > numberOfSuppliers){
                                return `You just added ${numberOfSuppliers} Suppliers!`
                            }
                            if(value < 1 ){
                                return `Choose a Valid Number Between 1 and ${numberOfSuppliers}`
                            }
                        }
                    }
                })} />    
            <p className='errorsValidation'>{errors?.supplierProd?.[index]?.supNumber?.message}</p>
            <br/><br/>
            </div>
        </div>
    );
};

export const ProcessProductionForm: React.FC<{index:number, register: any, errors:any, numberOfProcess:number}> = ({index, register, errors, numberOfProcess}) => {
    return(
            <div className={`process&MRP.${index}`}>
            <br/>
            <h3>Flow Between Process and Production Control</h3>
            <br />
            <label htmlFor={`typeProcess.${index}`}>Type of Information:</label>
            <select {...register(`processProd.${index}.typeProcess`, {
                required:{
                value:true,
                message: "Type of Information is Required!"
                }
            } as const)}>
                <option value="" disabled hidden>Select an option</option>
                <option value="eletronic">Eletronic (Email, Message ...)</option>
                <option value="physical">Physical (Document, Told ...)</option>
            </select>
            <p className='errorsValidation'>{errors?.processProd?.[index]?.typeProcess?.message}</p>
            <br/><br/>
            <label htmlFor={`receiveProcess.${index}`}>Who receive the Information:</label>
            <select {...register(`processProd.${index}.receiveProcess`, {
                required:{
                value:true,
                message: "Receiver is Required!"
                }
            } as const)}>
                <option value="" disabled hidden>Select an option</option>
                <option value="Production Control">Production Control</option>
                <option value="Process">Process</option>
            </select>
            <p className='errorsValidation'>{errors?.processProd?.[index]?.receiveProcess?.message}</p>
            <br /><br />
            <label htmlFor={`processProd.${index}.periodProcess`}>Period (Specify the Unit):</label>
            <input type="text" 
            {...register (`processProd.${index}.periodProcess`) } />
            <br />
            <label htmlFor={`contentProcess.${index}`}>Information Content:</label>
            <input type="text"
            {...register (`processProd.${index}.contentProcess`)} />
            <br /><br />
            <label htmlFor={`processNumber.${index}`}>Process Number:</label>
            <input type="number"
            {...register (`processProd.${index}.processNumber`, {
                require: {
                    value: true,
                    message: "Process Number is Required"
                },
                validate: (value:number) =>{
                    if(value!=null){
                        if(value > numberOfProcess){
                            return `You Have Just Added ${numberOfProcess} Processes`
                        }
                        if(value < 1){
                            return `Choose a Valid Number Between 1 and ${numberOfProcess}`
                        }
                    }
                }
            }as const)} />
            <p className='errorsValidation'>{errors?.processProd?.[index]?.processNumber?.message}</p>
        </div>
    
    )}


export const InfoFlow: React.FC = () => {
  
    
    const handleOptionChange = (index:number, value:string) => {
        const newSelectedOptions = [...selectedOptions]
        newSelectedOptions[index] = value;
        setSelectedOptions(newSelectedOptions)
    };
    
    const {register,control,handleSubmit, formState} = useForm<FormValues>({
        defaultValues:{
            selectbox:[{connection:"Select an Option"}],
            supplierProd:[{typeSup:"Select an Option", receiveSup: "Select an Option", periodSup: null, contentSup: null, supNumber: null}],
            processProd:[{typeProcess:"Select an Option", receiveProcess: "Select an Option", periodProcess: null, contentProcess: null, processNumber: null}],
            customerProd:[{typeCus:"Select an Option", receiveCus: "Select an Option", periodCus: null, contentCus: null}]

        }
    });
    const {errors} = formState;
    
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'selectbox',
    });
    
    const [selectedOptions, setSelectedOptions] = useState(fields.map(() => ""));
    const [numConections, setNumConections] = useState (1);
    const { numberOfProcess } = useProcessContext();
    const {numberOfSuppliers} = useSupplierContext();
    
    const onSubmit = () => {
        window.location.href = finalResultImage;
    };
    
    
    const renderSelectedForm = (index:number) => {
        switch (selectedOptions[index]) {
          case "customer&MRP-1":
            return <CustomerProductionForm index={index} register={register} errors = {errors}/>;
          case "supplier&MRP-1":
            return <SupplierProductionForm index={index} register={register} errors = {errors} numberOfSuppliers = {numberOfSuppliers} />;
          case "process&MRP-1":
            return <ProcessProductionForm index={index} register={register} errors = {errors} numberOfProcess = {numberOfProcess}/>;
        }
      };

    const handleAdd = () =>{
        append ({ connection: '' });
        setNumConections(prevNumConnections => prevNumConnections + 1);
        console.log(numConections)
    }

    const handleRemoveAndDecrement = (index:number) => {
        // Remove o processo usando o índice fornecido
        remove(index);
        
        // Decrementa o índice
        setNumConections(prevNumConnections => prevNumConnections - 1);
        console.log("index é ", index)
    };

    

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
                <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Material Flow Data</a></li>
                <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Informational Flow Data</a></li>
            </ul>
            </div>
            <div className='tab'>
            <form id="inventoryForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex-container">
                    <button type="submit">Next</button>
                </div>
                <br/><br/>
            <h2>Informational Flow</h2>
                
                {fields.map((field, index) =>(
                    <div key= {field.id}>
                        <label htmlFor="infoType">Connection {index+1}</label>
                        <select  className="options-in-menu-1" value={selectedOptions[index]} onChange={(e) => handleOptionChange(index, e.target.value)}>
                            <option value="" disabled hidden>
                            Select an option
                            </option>
                            <option value="customer&MRP-1">Between Customer and Production Control</option>
                            <option value="supplier&MRP-1">Between Supplier and Production Control</option>
                            <option value="process&MRP-1">Between Process and Production Control</option>
                        </select>
                        {selectedOptions[index] && renderSelectedForm(index)}
                        <br/><br/>
                        <button type="button" id="removeProcessButton" className="removeProcessButton" onClick={() => handleRemoveAndDecrement(index)}>Remove Process</button>
                        <br/><br/>
                    </div>
                ))}
                <button type="button" id="addProcessButton" className="addProcessButton" onClick={() => handleAdd()}>Add Item</button>
            </form>
            </div>
        </main>
        <Footer/>
    </div>
  )
}
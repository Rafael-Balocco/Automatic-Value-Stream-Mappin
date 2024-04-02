import {useForm} from 'react-hook-form'
import React, { useState } from 'react';
import { useProcessContext } from '../contexts/processContext';
import { useSupplierContext } from '../contexts/supplierContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

type FormValues ={
    customerProd:{

    }
    supplierProd:{
        typeSup: "physical" | "eletronic" | "Select an Option";
        receiveSup: "Production Control" | "Supplier" | "Select an Option";
        periodSup: string | null;
        contentSup:string | null;
        supNumber: number | null;

    }[]
    processProd:{

    }
}


const CustomerProductionForm: React.FC = () => {
    console.log("Primeiro")
    return (
        <div className="customer&MRP">
            <br/>
            <h3>Flow Between Customer and Production Control</h3>
            <br/>
            <label htmlFor="typeCus">Type of Information:</label>
            <select className="typeCus">
                    <option value="" disabled selected hidden>Select an option</option>
                    <option value="eletronic">Eletronic (Email, Message ...)</option>
                    <option value="physical">Physical (Document, Told ...)</option>
            </select>
            
            <br/><br/>
            
            <label htmlFor="receiveCus">Who receive the Information:</label>
            <select className="receiveCus">
                <option value="" disabled selected hidden>Select an option</option>
                <option value="Production Control">Production Control</option>
                <option value="Customer">Customer</option>
            </select>
            <br/><br/>
            <label htmlFor="periodCus">Period (Specify the Unit):</label>
            <input type="text" className="periodCus" name="periodCus"/>
            <br/>
            <label htmlFor="contentCus">Information Content:</label>
            <input type="text" className="contentCus" name="contentCus"/>
            <br/>
        </div>
    );
  };
  
 const SupplierProductionForm: React.FC = () => {
    console.log("Entrou no Supplier e Production")
    return(
        <div>
            <div className='supplier&production'>
                <br/>
                <h3>Flow Between Supplier and Production Control</h3>
                <br/>
                <label htmlFor='typeSup'>Type of Information:</label>
                <select className='typeSup'>
                <option value="" disabled hidden>Select an option</option>
                <option value = "eletronic">Eletronic (Email, SMS, ...)</option>
                <option value="physical"> Physical (Documnt, Told, ...)</option>
                </select>
                <br/><br/>
                <label htmlFor="receiveSup">Who receive the Information:</label>
                  <select className="receiveSup">
                    <option value="" disabled selected hidden>Select an option</option>
                    <option value="Production Control">Production Control</option>
                    <option value="Supplier">Supplier</option>
                  </select> 
                  <br/><br/>
                <label htmlFor="periodSup">Period (Specify the Unit):</label>
                <input type="text" className="periodSup" name="periodSup" />
                <br/>
                <label htmlFor="contentSup">Information Content:</label>
                <input type="text" className="contentSup" name="contentSup" />
                <br/>
                <label htmlFor="supNumber">Supplier Number (Same in Supplier Tab):</label>
                <input type="number" className="supNumber" name="supNumber" required /> 
            </div>
        </div>
    );
};

export const ProcessProductionForm: React.FC = () => {
    console.log("Entrou no process e production")
    return(
            <div className="process&MRP-1">
            <br/>
            <h3>Flow Between Process and Production Control</h3>
            <br />
            <label htmlFor="typeProcess">Type of Information:</label>
            <select className="typeProcess">
                <option value="" disabled selected hidden>Select an option</option>
                <option value="eletronic">Eletronic (Email, Message ...)</option>
                <option value="physical">Physical (Document, Told ...)</option>
            </select>
            
            <br />
            <br />
            
            <label htmlFor="periodProcess">Period (Specify the Unit):</label>
            <input type="text" className="periodProcess" name="periodProcess" />
            <br />
            <label htmlFor="contentProcess">Information Content:</label>
            <input type="text" className="contentProcess" name="contentProcess" />
            <br />
            <label htmlFor="receiveProcess">Who receive the Information:</label>
            <select name="receiveProcess" required>
                <option value="" disabled selected hidden>Select an option</option>
                <option value="Production Control">Production Control</option>
                <option value="Process">Process</option>
            </select>
            <br />
            <br />
            <label htmlFor="processNumber">Process Number:</label>
            <input type="number" className="processNumber" name="processNumber" required />
        </div>
    
    )}


export const InfoFlow: React.FC = () => {
  
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    };

    const form = useForm<FormValues>({
        defaultValues:{
            supplierProd:[{typeSup:"Select an Option", receiveSup: "Select an Option", periodSup: null, contentSup: null, supNumber: null}]
        }
    })
    
    const renderSelectedForm = () => {
        switch (selectedOption) {
          case "customer&MRP-1":
            return <CustomerProductionForm />;
          case "supplier&MRP-1":
            return <SupplierProductionForm />;
          case "process&MRP-1":
            return <ProcessProductionForm />;
        }
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
            <h2>Informational Flow</h2>
            <form id="inventoryForm" autoComplete="off" noValidate>
                <div className='infoFlow'>
                    <label htmlFor="infoType">Connection 1</label>
                    <select  className="options-in-menu-1" value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled selected hidden>
                        Select an option
                        </option>
                        <option value="customer&MRP-1">Between Customer and Production Control</option>
                        <option value="supplier&MRP-1">Between Supplier and Production Control</option>
                        <option value="process&MRP-1">Between Process and Production Control</option>
                    </select>
                    {selectedOption && renderSelectedForm()}
                </div>
                <div className="flex-container">
                    <button type="submit">Send / Next Page</button>
                </div>
            </form>
            </div>
        </main>
        <Footer/>
    </div>
  )
}
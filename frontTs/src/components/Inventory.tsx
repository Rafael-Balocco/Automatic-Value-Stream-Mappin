import {useForm, useFieldArray} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import {useLocation} from 'react-router-dom';

type FormValues = {
    proInventory:{
        quantity:number;
    }[]
  }


    interface InventoryProps {
    numberOfProcess: number; // Define the type of numberOfProcess prop as number
  }
  
  export const Inventory: React.FC<InventoryProps> = () => {
    
    const navigate = useNavigate(); // Instancia o hook useNavigate
    const form = useForm<FormValues>();
    const { state } = useLocation();
    const numberOfProcess = state?.numberOfProcess;
    const { register, formState, handleSubmit} = form;
    const {errors} = formState;


    const onSubmit = (data:FormValues) =>{
        console.log('Form Submitted:', data);
        navigate('/supplier'); // Redireciona para a página Sup1.html
    }

    const generateProcessInputs = (): JSX.Element[] => {
    const processInputs: JSX.Element[] = [];

        for (let j = 0; j < numberOfProcess; j++) {
            processInputs.push(
            <div key={j}>
                <br />
                <label htmlFor={`relatedProcess${j}`}>Process {j + 1} Inventory:</label>
                <input type="number" id="processQuantity" 
                {...register(`proInventory.${j}.quantity`,{
                    required:{
                        value:true,
                        message: 'Inventory is Required'
                    },
                    validate: value =>{
                        if(value!=null){
                            if(value<0){
                                return "Inventory has to be positive or zero!"
                            }
                        }
                        return true;
                    }
                } as const)} />
                <p className='errorsValidation'>{errors?.proInventory?.[j]?.quantity?.message}</p>
                <br />
            </div>
            );
        }
    
        return processInputs;
    };

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
                    <div className="tab">
                        <h2>Inventory</h2>
                        <form id="inventoryForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                                {generateProcessInputs()}
                            <div className="flex-container">
                                <button type="submit">Send / Next Page</button>
                            </div>
                        
                        </form>
                    </div>     
        </main>
        <Footer />
    </div>
    )
}
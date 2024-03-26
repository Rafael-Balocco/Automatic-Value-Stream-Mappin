    import {useForm, useFieldArray} from 'react-hook-form'
    import Header from './Header';
    import Footer from './Footer';
    import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate


    type FormValues = {
        supNumbers:{ 
            supplierName: string;
            whatSupplies: string;
        }[]
    }

    export const Process = () => {

        const form = useForm<FormValues>({
            defaultValues:{
                supNumbers: [{supplierName: '', whatSupplies: ''}]
            },
        });
        
        const { register, control, formState, handleSubmit} = form;
        const {errors} = formState;
        const navigate = useNavigate(); // Instancia o hook useNavigate
        
        const {fields, append, remove} = useFieldArray({
            name:'supNumbers',
            control
        })

        const onSubmit = (data:FormValues) =>{
            console.log('Form Submitted:', data);
            navigate('/customer'); // Redireciona para a página Sup1.html
        }

        return (
            <div>
            <Header />
            <main>
                <div className="tabContainer">
                    <ul>
                        <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Map Infos</a></li>
                        <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Supplier</a></li>
                        <li><a>Customer</a></li>
                        <li><a>Process Creation</a></li>
                        <li><a>Inventory</a></li>
                        <li><a>Material Flow Data</a></li>
                        <li><a>Informational Flow Data</a></li>
                    </ul>
                </div>
                    <form id="supplierForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                    <div className="tab">
                        <div>
                            {
                                fields.map((field,index) =>{
                                    return(
                                        <div className='form-control' key = {field.id}>
                                            <h2>Supplier Number {index+1}</h2>
                                            <br/><br/>
                                            <label htmlFor={`supNumbers.${index}.supplierName`}>Supplier Name:</label>
                                            <input type="text"
                                            {...register(`supNumbers.${index}.supplierName`,{
                                            required: {
                                                value: true,
                                                message: "Supplier Name is Required",
                                            },
                                            } as const)} />
                                            <p className='errorsValidation'>{errors?.supNumbers?.[index]?.supplierName?.message}</p>                                            
                                            <br />
                                            <label htmlFor={`supNumbers.${index}.whatSupplies`}>What it Supplies:</label>
                                            <input type="text" id="whatSupplies" {...register(`supNumbers.${index}.whatSupplies` as const)}/>
                                            <br />
                                            {
                                                index >0 && (
                                                    <button type = "button" id="removeSupplierButton" className="removeSupplierButton" onClick={() => remove(index)}>Remove Supplier</button> 
                                                )
                                            }
                                            <br/>
                                        </div>    
                                    );
                                })}
                                <br/>
                                <button type = "button" id="addSupplierButton" className="addSupplierButton" onClick={() => append({supplierName: "", whatSupplies: "" })}>Add Supplier</button> 
                            </div>

                            <div className="flex-container">
                            <button type="submit">Send / Next Page</button>
                            </div>
                        </div>
                    </form>
            </main>
            <Footer />
        </div>
    )
    }
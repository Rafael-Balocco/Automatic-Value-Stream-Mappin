import { useForm, useFieldArray } from 'react-hook-form'
import React, { useEffect } from 'react';
import { useSupplierContext } from '../contexts/supplierContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useCustomerMaterialFlowContext } from '../contexts/customerMatContext'
import { useAllSupMatContext } from '../contexts/supMatContext';

enum Mode {
    Airplane = 'Airplane',
    Bike = 'Bike',
    Car = 'Car',
    MultiModal = 'Multi Modal',
    Ship = 'Ship',
    Train = 'Train',
    Truck = 'Truck',
}

export type FormValues = {
    customer: {
        modeCustomer: Mode | "Select an Option";
        periodShiftCustomer: number | null;
        quantityShiftCustomer: number | null;
    }
    supplier: {
        modeSupplier: Mode | "Select an Option";
        periodShiftSupplier: number | null;
        quantityShiftSupplier: number | null;
    }[]
}

export const MatFlow: React.FC = () => {

    const {SupMats, updateSupMat} = useAllSupMatContext();
    const { CusformData, updateCusFormData } = useCustomerMaterialFlowContext(); // Use o contexto do componente de material do cliente
    const { numberOfSuppliers } = useSupplierContext();

    const { register, formState, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            customer: CusformData,
            supplier: [{ modeSupplier: "Select an Option", periodShiftSupplier: null, quantityShiftSupplier: null }]
        },
    })
    const { errors } = formState;
    const navigate = useNavigate(); // Instancia o hook useNavigate

    useEffect (() =>{
        setValue('supplier', SupMats)
    }, [SupMats, setValue]);


    const onSubmit = async (data: any) => {
        try {
            console.log('Form Submitted:', data.customer);
            updateCusFormData(data.customer); // Atualiza os dados do formulário no contexto
            for(let i = 0 ; i < numberOfSuppliers ; i++){
                const updatedSupMats = {
                    modeSupplier: data.supplier[i].modeSupplier,
                    periodShiftSupplier: data.supplier[i].periodShiftSupplier,
                    quantityShiftSupplier: data.supplier[i].quantityShiftSupplier
                }
                updateSupMat(i, updatedSupMats)
                console.log('Supplier: ', updatedSupMats, 'adicionado na posição', i);
            }
            navigate('/infoFlow')
            // Redireciona para a próxima página do formulário
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const renderSuppliers = () => {
        const suppliers = [];
        for (let j = 0; j < numberOfSuppliers; j++) {
            suppliers.push(
                <div key={`SupMatFlow${j}`} id={`SupMatFlow${j}`} className="SupMatFlow">
                    <br />
                    <h3>Supplier Number {j + 1}</h3>
                    <br />
                    <label htmlFor={`supplier.${j}.modeSupplier`}>Transport Mode:</label>
                    <select {...register(`supplier.${j}.modeSupplier`, {
                        required: {
                            value: true,
                            message: "Supplier's Mode of Transportation is Required!"
                        }
                    } as const)}>
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
            if (j < numberOfSuppliers - 1) {
                suppliers.push(
                    <div className='divisionLine'></div>
                )
            }
        }
        return suppliers;
    };

    const handlePrevious = () => {
        navigate('/Inventory')
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
                        <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Material Flow Data</a></li>
                        <li><a>Informational Flow Data</a></li>
                    </ul>
                </div>

                <form id="MatForm" onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off" noValidate>
                    <div className='consumerTab'>
                        <div className="flex-container">
                            <button type="submit" >Submit / Next</button>
                        </div>

                        <div className='previousButton'>
                            <button type="button" onClick={handlePrevious}>Previous</button>
                        </div>
                        <br /><br />
                        
                        <h2>Customer Material Flow</h2>
                        <div className='consumerMat'>
                            <br />
                            <label htmlFor={`customer.modeCustomer`}>Transport Mode:</label>
                            <select {...register(`customer.modeCustomer`, {
                                required: {
                                    value: true,
                                    message: "Customer's Mode of Transportation is Required!"
                                }
                            } as const)}>
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
                    </div>

                </form>
            </main>
            <Footer />
        </div>
    )
}
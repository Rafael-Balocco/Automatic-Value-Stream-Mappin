import { useForm, useFieldArray } from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { Router, useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { SupplierContext, useSupplierContext, SupplierProvider } from '../contexts/supplierContext';
import React from 'react';
import { useEffect } from 'react';
import SupplierForm from './SupplierForm'; // Importe o novo componente
import { useAllSupplierContext } from '../contexts/supHandlerContext';

export type FormValues = {
    supNumbers: {
        supplierName: string;
        whatSupplies: string;
    }[]
}

export const Supplier: React.FC = () => {
    
    const { suppliers, updateSupplier } = useAllSupplierContext();
    const { numberOfSuppliers, updateNumberOfSuppliers } = useSupplierContext();
    const { register, control, formState, handleSubmit, setValue } = useForm();
    const { errors } = formState;
    const navigate = useNavigate(); // Instancia o hook useNavigate

    useEffect(() => {
        // Atualiza os defaultValues do formulário sempre que suppliers mudar
        setValue('supNumbers', suppliers);
      }, [suppliers, setValue]);

    const { fields, append, remove } = useFieldArray({
        name: "supNumbers",
        control
    });
    
    const onSubmit = async (data: any) => {
        try {
            parentToChild();
            const newNumberOfSuppliers = numberOfSuppliers;
            console.log(numberOfSuppliers)
            updateNumberOfSuppliers(newNumberOfSuppliers);
            for(let i = 0 ; i < numberOfSuppliers; i++ ){
                console.log(i)
                const updatedSupplier = {
                    supplierName: data.supNumbers[i].supplierName,
                    whatSupplies: data.supNumbers[i].whatSupplies
                };
                updateSupplier(i, updatedSupplier);
                console.log(updatedSupplier)
            } 
            navigate('/customer')

        }
        catch (error) {
            console.log('Error submiting form:', error);
        }
    };

    const handleAppendAndIncrement = () => {
        // Adiciona um novo processo usando o append
        append({ supplierName: "", whatSupplies: "" });

        // Incrementa o índice
        updateNumberOfSuppliers(numberOfSuppliers + 1);
    };

    const handleRemoveAndDecrement = (index: number) => {
        // Remove o processo usando o índice fornecido
        remove(index);

        // Decrementa o índice
        updateNumberOfSuppliers(numberOfSuppliers - 1);
    };

    const parentToChild = () => {
        updateNumberOfSuppliers(numberOfSuppliers);
    };

    const handlePrevious = () => {
        navigate('/mapInfos')
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
                <form id="supplierForm" onSubmit={handleSubmit((data) => onSubmit(data))} autoComplete="off" noValidate>
                    <div className="tab">
                        <div className="flex-container">
                            <button type="submit">Next Page</button>
                        </div>
                        <div className='previousButton'>
                            <button type="button" onClick={handlePrevious}>Previous</button>
                        </div>
                        <br /><br />
                        <div>
                            {fields.map((field, index) => (
                                <SupplierForm
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    register={register}
                                    errors={errors}
                                    handleRemoveAndDecrement={handleRemoveAndDecrement}
                                />
                            ))}
                            <br />
                            <button type="button" id="addSupplierButton" className="addSupplierButton" onClick={handleAppendAndIncrement}>Add Supplier</button>
                        </div>
                    </div>
                </form>
                <div>
                <h2>Estado do Fornecedor</h2>
                    <pre>{JSON.stringify(suppliers, null, 2)}</pre>
                </div>
            </main>
            <Footer />
        </div>
    )
}
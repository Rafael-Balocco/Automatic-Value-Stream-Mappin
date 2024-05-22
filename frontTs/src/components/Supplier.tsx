import { useForm, useFieldArray,  } from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; 
import { useSupplierContext } from '../contexts/supplierContext';
import React, { useEffect } from 'react';
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
    const { register, control, formState, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            supNumbers: suppliers.length > 0 ? suppliers : [{ supplierName: '', whatSupplies: '' }] // verify if there is previous suppliers, if not, add an empty one
        }
    });
    const { errors } = formState;
    const navigate = useNavigate(); 

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'supNumbers'
    });

    useEffect(() => {
        if (numberOfSuppliers === 0) {
            handleAppendAndIncrement();
            const updatedSupplier = {
                supplierName: '',
                whatSupplies: ''
            };
            updateSupplier(0, updatedSupplier);
        }
    }, []);

    useEffect(() => {
        // Update the form values with the values saved on the context
        setValue('supNumbers', suppliers);
    }, [suppliers, setValue]);


    //update the context
    const onSubmit = async (data: any) => {
        try {
            parentToChild();
            const newNumberOfSuppliers = numberOfSuppliers;
            updateNumberOfSuppliers(newNumberOfSuppliers);
            for (let i = 0; i < numberOfSuppliers; i++) {
                const updatedSupplier = {
                    supplierName: data.supNumbers[i].supplierName,
                    whatSupplies: data.supNumbers[i].whatSupplies
                };
                updateSupplier(i, updatedSupplier);
                console.log("Supplier:", updatedSupplier, "updated in the position :", i)
            }
            navigate('/customer')
            
        }
        catch (error) {
            console.log('Error submiting form:', error);
        }
    };

    
    const handleAppendAndIncrement = () => {
        append({ supplierName: "", whatSupplies: "" });
        
        updateNumberOfSuppliers(numberOfSuppliers + 1);
    };

    
    const handleRemoveAndDecrement = (index: number) => {
        remove(index);

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
                            <button type="submit">Submit / Next</button>
                        </div>
                        <div className='previousButton'>
                            <button type="button" onClick={handlePrevious}>Previous</button>
                        </div>
                        <br /><br />
                        <div>
                            {fields.map((field, index) => (
                                <div className='form-control' key={field.id}>
                                    <h2>Supplier Number {index + 1}</h2>
                                    <br /><br />
                                    <label htmlFor={`supNumbers.${index}.supplierName`}>Supplier Name:</label>
                                    <input
                                        type="text"
                                        {...register(`supNumbers.${index}.supplierName`, {
                                            required: {
                                                value: true,
                                                message: "Supplier Name is Required",
                                            },
                                        } as const)}
                                    />
                                    <p className='errorsValidation'>{errors?.supNumbers?.[index]?.supplierName?.message}</p>
                                    <br />
                                    <label htmlFor={`supNumbers.${index}.whatSupplies`}>What it Supplies:</label>
                                    <input
                                        type="text"
                                        id="whatSupplies"
                                        {...register(`supNumbers.${index}.whatSupplies` as const)}
                                    />
                                    <br />
                                    {
                                        index > 0 && (
                                            <button
                                                type="button"
                                                id="removeSupplierButton"
                                                className="removeSupplierButton"
                                                onClick={() => handleRemoveAndDecrement(index)}
                                            >
                                                Remove Supplier
                                            </button>
                                        )
                                    }
                                    <div className='divisionLine'></div>
                                    <br />
                                </div>

                            ))}
                            <br />
                            <button type="button" id="addSupplierButton" className="addSupplierButton" onClick={handleAppendAndIncrement}>Add Supplier</button>
                        </div>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}
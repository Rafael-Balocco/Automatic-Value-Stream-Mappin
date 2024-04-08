import { useForm, useFieldArray } from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useState } from 'react';
import React from 'react';
import { ProcessContext, useProcessContext, ProcessProvider } from '../contexts/processContext';
import App from '../App'


type FormValues = {
    proNumbers: {
        processName: string;
        cycleTime: number | null;
        availableTime: number | null;
        upTime: number | null;
        scrapRate: number | null;
    }[]
    index: number;
    indexProcess: number;
    numberOfProcess: number;

}

export const Process: React.FC = () => {

    const form = useForm<FormValues>({
        defaultValues: {
            proNumbers: [{ processName: '', cycleTime: null, availableTime: null, upTime: null, scrapRate: null }]
        },
    });

    const { register, control, formState, handleSubmit } = form;
    const { errors } = formState;
    const navigate = useNavigate(); // Instancia o hook useNavigate

    const { numberOfProcess, updateNumberOfProcess } = useProcessContext();
    console.log(numberOfProcess);

    const { fields, append, remove } = useFieldArray({
        name: 'proNumbers',
        control
    })

    const onSubmit = (dataForm: FormValues) => {
        parentToChild();
        console.log('Form Submitted:', dataForm);
        const newNumberOfProcess = numberOfProcess;
        updateNumberOfProcess(newNumberOfProcess);
        console.log("The number of processes is ", newNumberOfProcess);
        navigate('/inventory');
    }


    const handleAppendAndIncrement = () => {
        // Adiciona um novo processo usando o append
        append({ processName: '', cycleTime: null, availableTime: null, upTime: null, scrapRate: null });

        // Incrementa o índice
        updateNumberOfProcess(numberOfProcess + 1);
    };

    const handleRemoveAndDecrement = (index: number) => {
        // Remove o processo usando o índice fornecido
        remove(index);

        // Decrementa o índice
        updateNumberOfProcess(numberOfProcess - 1);
    };

    const parentToChild = () => {
        updateNumberOfProcess(numberOfProcess);
        console.log("Salvando o seguinte índice: ", numberOfProcess);
    }

    const handlePrevious = () => {
        navigate('/customer')
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
                        <li><a>Inventory</a></li>
                        <li><a>Material Flow Data</a></li>
                        <li><a>Informational Flow Data</a></li>
                    </ul>
                </div>
                <form id="processForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
                    <div className="tab">
                        <div className="flex-container">
                            <button type="submit">Next</button>
                        </div>
                        <div className='previousButton'>
                            <button type="button" onClick={handlePrevious}>Previous</button>
                        </div>
                        <br /><br />
                        <div>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <div className='form-control' key={field.id}>
                                            <h2>Process Number {index + 1}</h2>
                                            <br /><br />
                                            <label htmlFor={`proNumbers.${index}.processName`}>Process Name:</label>
                                            <input type="text"
                                                {...register(`proNumbers.${index}.processName`, {
                                                    required: {
                                                        value: true,
                                                        message: "Supplier Name is Required",
                                                    },
                                                } as const)} />
                                            <p className='errorsValidation'>{errors?.proNumbers?.[index]?.processName?.message}</p>
                                            <br />

                                            <label htmlFor={`proNumbers.${index}.cycleTime`}>Cycle Time (seconds):</label>
                                            <input type="number"
                                                {...register(`proNumbers.${index}.cycleTime`, {
                                                    required: {
                                                        value: true,
                                                        message: "Cycle Time is Required",
                                                    },
                                                    validate: value => {
                                                        if (value != null) {
                                                            if (value < 0) {
                                                                return "Cycle Time must be positive!"
                                                            }
                                                            return true;
                                                        }
                                                    }
                                                } as const)} />
                                            <p className='errorsValidation'>{errors?.proNumbers?.[index]?.cycleTime?.message}</p>
                                            <br />


                                            <label htmlFor={`proNumbers.${index}.availableTime`}>Available Time (seconds):</label>
                                            <input
                                                type="number"
                                                id="availableTime"
                                                {...register(`proNumbers.${index}.availableTime`, {
                                                    validate: value => {
                                                        if (value != null) {
                                                            if (value < 0) {
                                                                return "This value must be positive or empty!";
                                                            }
                                                            return true;
                                                        }
                                                    }
                                                } as const)} />
                                            <p className='errorsValidation'>{errors?.proNumbers?.[index]?.availableTime?.message}</p>
                                            <br />



                                            <label htmlFor={`proNumbers.${index}.upTime`}>Up Time (%):</label>
                                            <input
                                                type="number"
                                                id="upTime"
                                                {...register(`proNumbers.${index}.upTime`, {
                                                    validate: value => {
                                                        if (value != null) {
                                                            if (value < 0 || value > 100) {
                                                                return "Up Time (%) must be between 0 and 100, or empty!";
                                                            }
                                                            return true;
                                                        }
                                                    }
                                                } as const)} />
                                            <p className='errorsValidation'>{errors?.proNumbers?.[index]?.upTime?.message}</p>
                                            <br />

                                            <label htmlFor={`proNumbers.${index}.scrapRate`}>Scrap Rate (%):</label>
                                            <input
                                                type="number"
                                                id="scrapRate"
                                                {...register(`proNumbers.${index}.scrapRate`, {
                                                    validate: value => {
                                                        if (value != null) {
                                                            if (value < 0 || value > 100) {
                                                                return "Scrap Rate (%) must be between 0 and 100, or empty!";
                                                            }
                                                            return true;
                                                        }
                                                    }
                                                } as const)} />
                                            <p className='errorsValidation'>{errors?.proNumbers?.[index]?.scrapRate?.message}</p>
                                            <br />

                                            {

                                                index > 0 && (
                                                    <React.Fragment>
                                                        <button type="button" id="removeProcessButton" className="removeProcessButton" onClick={() => handleRemoveAndDecrement(index)}>Remove Process</button>
                                                        <br />
                                                    </React.Fragment>)
                                            }


                                            <br />
                                        </div>
                                    );
                                })}
                            <br />
                            <button type="button" id="addProcessButton" className="addProcessButton" onClick={handleAppendAndIncrement}>Add Process</button>
                        </div>

                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

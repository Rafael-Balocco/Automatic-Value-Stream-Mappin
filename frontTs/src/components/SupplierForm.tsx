import React from 'react';

interface SupplierFormProps {
    field: any; // Substitua 'any' pelo tipo correto de 'field' se possível
    index: number;
    register: any; // Substitua 'any' pelo tipo correto de 'register'
    errors: any; // Substitua 'any' pelo tipo correto de 'errors'
    handleRemoveAndDecrement: (index: number) => void; // Substitua 'void' pelo tipo de retorno correto
}

const SupplierForm: React.FC<SupplierFormProps> = ({ field, index, register, errors, handleRemoveAndDecrement }) => {
    
    return (
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
            <br />
        </div>
    );
};

export default SupplierForm;

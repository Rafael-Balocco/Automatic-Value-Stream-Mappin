import React from 'react';
import axios from 'axios';
import { useAllCusProdContext } from '../contexts/cusProdContext';
import { useAllProcProdContext } from '../contexts/proProdContext';
import { useAllSupProdContext } from '../contexts/supProdContext';
import { useMapInfoContext } from '../contexts/allMapInfoContext';
import { useAllSupplierContext } from '../contexts/supHandlerContext';
import { useCustomerContext } from '../contexts/customerContext';
import { useAllProcessContext } from '../contexts/proHandlerContext';
import { useAllInventoryContext } from '../contexts/inventoryContext';
import { useCustomerMaterialFlowContext } from '../contexts/customerMatContext';
import { useAllSupMatContext } from '../contexts/supMatContext';
import { useNavigate } from 'react-router-dom';

const DataSubmissionComponent: React.FC = () => {
    const { CusProds } = useAllCusProdContext();
    const { SupProds } = useAllSupProdContext();
    const { ProcProds } = useAllProcProdContext();
    const { formData } = useMapInfoContext();
    const { suppliers } = useAllSupplierContext();
    const { customerForm } = useCustomerContext();
    const { processes } = useAllProcessContext();
    const { inventories } = useAllInventoryContext();
    const { SupMats } = useAllSupMatContext();
    const { CusformData } = useCustomerMaterialFlowContext(); 
    const navigate = useNavigate();
    
    const handleSubmitData = async () => {
        try {

            const dados = {
                CusProds,
                SupProds,
                ProcProds,
                formData,
                suppliers,
                customerForm,
                processes,
                inventories,
                SupMats,
                CusformData,
            };

            // Faça a requisição POST para enviar os dados para o servidor
            const resposta = await axios.post('http://localhost:3000/api/enviar-dados', dados);

            console.log(resposta.data); // Exibir resposta do servidor
        } catch (error) {
            console.error('Erro ao enviar dados para o backend:', error);
        }
    };

    const handlePrevious = () =>{
        navigate('/InfoFlow')
    }

    return (
        <div>
    <button className="previous-button" onClick={handlePrevious}>Previous Page</button>
    <button className="submit-button" onClick={handleSubmitData}>Confirm and Submit Form</button>

        </div>
    );
};

export default DataSubmissionComponent;

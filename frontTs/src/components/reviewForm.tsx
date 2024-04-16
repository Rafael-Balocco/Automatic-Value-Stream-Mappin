import React from 'react';
import DataSubmissionComponent from './DataSubmission';
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

export const ShowDataComponent: React.FC = () => {
    const { CusProds } = useAllCusProdContext();
    const { SupProds } = useAllSupProdContext();
    const { ProcProds } = useAllProcProdContext();
    const { formData } = useMapInfoContext(); // Use o contexto do componente MapInfo
    const { suppliers } = useAllSupplierContext();
    const { customerForm } = useCustomerContext();
    const { processes } = useAllProcessContext();
    const { inventories } = useAllInventoryContext();
    const { SupMats } = useAllSupMatContext();
    const { CusformData } = useCustomerMaterialFlowContext(); // Use o contexto do componente de material do cliente

    return (
        <div className="data-review-container">
            <h1>Data Submitted Review</h1>
            <div className="form-data-section">
                <h2>Form Data</h2>
                <div className='project'>
                    <p><strong>Enterprise Name:</strong> {formData.enterpriseName}</p>
                    <p><strong>Creator Name:</strong> {formData.creatorName}</p>
                </div>
            </div>

            <div className="customer-form-data-section">
                <h2>Customer Form Data</h2>
                <div className='customer'>
                    <p><strong>Customer Name:</strong> {customerForm.CustomerName}</p>
                    <p><strong>Demand:</strong> {customerForm.demand}</p>
                </div>
            </div>

            <div className="suppliers-section">
                <h2>Suppliers</h2>
                {suppliers.map((supplier, index) => (
                    <div key={index} className="supplier-item">
                        <h3>Supplier #{index + 1}</h3>
                        <p><strong>Name:</strong> {supplier.supplierName}</p>
                        <p><strong>Supplies:</strong> {supplier.whatSupplies}</p>
                    </div>
                ))}
            </div>

            <div className="processes-section">
                <h2>Processes</h2>
                {processes.map((process, index) => (
                    <div key={index} className="process-item">
                        <h3>Process #{index + 1}</h3>
                        <p><strong>Name:</strong> {process.processName}</p>
                        <p><strong>Cycle Time:</strong> {process.cycleTime}</p>
                        <p><strong>Available Time:</strong> {process.availableTime}</p>
                        <p><strong>Up Time:</strong> {process.upTime}</p>
                        <p><strong>Scrap Rate:</strong> {process.scrapRate}</p>
                    </div>
                ))}
            </div>

            <div className="inventories-section">
                <h2>Inventories</h2>
                {inventories.map((inventory, index) => (
                    <div key={index} className="inventory-item">
                        <h3>Inventory #{index + 1}</h3>
                        <p><strong>Process Number:</strong> {inventory.processINumber}</p>
                    </div>
                ))}
            </div>

            <div className="material-flow-section">
                <h2>Customer Material Flow Data</h2>
                <div className='customer-mat'>
                    <p><strong>Mode:</strong> {CusformData.modeCustomer}</p>
                    <p><strong>Period Shift:</strong> {CusformData.periodShiftCustomer}</p>
                    <p><strong>Quantity Shift:</strong> {CusformData.quantityShiftCustomer}</p>
                </div>
                <h2>Supplier Material Data</h2>
                {SupMats.map((supplier, index) => (
                    <div key={index} className="supplier-material-item">
                        <h3>Supplier #{index + 1}</h3>
                        <p><strong>Mode:</strong> {supplier.modeSupplier}</p>
                        <p><strong>Period Shift:</strong> {supplier.periodShiftSupplier}</p>
                        <p><strong>Quantity Shift:</strong> {supplier.quantityShiftSupplier}</p>
                    </div>
                ))}
            </div>

            <div className="production-section">
                <h2>Informational Flow</h2>
                <div className="customer-productions">
                    <h3>Customer</h3>
                    {CusProds.map((prod, index) => (
                        <div key={index} className="customer-production-item">
                            <p><strong>Type:</strong> {prod.typeCus}</p>
                            <p><strong>Receiver:</strong> {prod.receiveCus}</p>
                            <p><strong>Period:</strong> {prod.periodCus}</p>
                            <p><strong>Content:</strong> {prod.contentCus}</p>
                        </div>
                    ))}
                </div>

                <div className="supplier-productions">
                    <h3>Supplier</h3>
                    {SupProds.map((prod, index) => (
                        <div key={index} className="supplier-production-item">
                            <p><strong>Type:</strong> {prod.typeSup}</p>
                            <p><strong>Receiver:</strong> {prod.receiveSup}</p>
                            <p><strong>Period:</strong> {prod.periodSup}</p>
                            <p><strong>Content:</strong> {prod.contentSup}</p>
                            <p><strong>Number:</strong> {prod.supNumber}</p>
                        </div>
                    ))}
                </div>

                <div className="process-productions">
                    <h3>Process</h3>
                    {ProcProds.map((prod, index) => (
                        <div key={index} className="process-production-item">
                            <p><strong>Type:</strong> {prod.typeProcess}</p>
                            <p><strong>Receiver:</strong> {prod.receiveProcess}</p>
                            <p><strong>Period:</strong> {prod.periodProcess}</p>
                            <p><strong>Content:</strong> {prod.contentProcess}</p>
                            <p><strong>Number:</strong> {prod.processNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
            <DataSubmissionComponent />
        </div>
    );
}

export default ShowDataComponent;

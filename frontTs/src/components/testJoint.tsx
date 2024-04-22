import React, { useEffect, useRef } from 'react';
import { dia, shapes } from '@joint/core';
import '../styles/tabsCSS.css'

//importing contexts:
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

export const TestJoint: React.FC = () => {

    const canvas: any = useRef(null);

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

    console.log("Processos salvos:", processes.length);

    useEffect(() => {

        const rect: any[] = [];
        const link: any[] =[];

        const graph = new dia.Graph();

        const paper = new dia.Paper({
            model: graph,
            background: {
                color: '#F8F9FA',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            width: 6000,
            height: 1000,
            gridSize: 1,
            cellViewNamespace: shapes
        });

        canvas.current.appendChild(paper.el);
        paper.render();

        rect[0] = new shapes.standard.Rectangle({
            position: { x: 100, y: 30 },
            size: { width: 200, height: 100 },
            attrs: {
                body: {
                    fill: 'blue'
                },
                label: {
                    text: processes[0].processName ,
                    fill: 'white',
                    fontSize: 20,
                }
            }
        });

        for(let i = 1; i < processes.length; i++){
            rect[i] = rect[0].clone();
            rect[i].translate(300*i, 0);
            rect[i].attr('label/text', processes[i].processName);
            rect[i].addTo(graph);

            link [i]= new shapes.standard.Link();
            link[i].source(rect[i-1]);
            link[i].target(rect[i]);
            link[i].addTo(graph);
            
        }


        rect[0].addTo(graph);
        paper.unfreeze();

        return () => {
            paper.remove();
        };

    }, []);

    return (
        <div className="canvas" ref={canvas} />
    );
}

export default TestJoint;

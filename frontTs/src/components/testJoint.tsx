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

    useEffect(() => {

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

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 30 },
            size: { width: 200, height: 100 },
            attrs: {
                body: {
                    fill: 'blue'
                },
                label: {
                    text: formData.enterpriseName,
                    fill: 'white',
                    fontSize: 20,
                }
            }
        });

        const rect2 = rect.clone()
        rect2.translate(300, 0);
        rect2.attr('label/text', formData.creatorName)


        rect.addTo(graph);
        rect2.addTo(graph)
        paper.unfreeze();

        const link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);

        return () => {
            paper.remove();
        };

    }, []);

    return (
        <div className="canvas" ref={canvas} />
    );
}

export default TestJoint;

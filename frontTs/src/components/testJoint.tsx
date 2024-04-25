import React, { useEffect, useRef } from 'react';
import { dia, shapes, util } from '@joint/core';
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

const start = 500;

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

    const numProcess = processes.length;
    console.log(SupMats)

    useEffect(() => {

        const procArray: any[] = [];
        const link: any[] = [];
        const linkSup: any[] = [];
        const supArray: any[] = [];
        const invArray: any[] = [];
        const graph = new dia.Graph();

        const paper = new dia.Paper({
            width: 6000,
            height: 7000,
            model: graph,
            background: {
                color: '#F8F9FA',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            gridSize: 1,
            cellViewNamespace: shapes,
            interactive: {
                linkMove: false,
                labelMove: true
            }
        });

        canvas.current.appendChild(paper.el);
        paper.render();

        class ForeignObjectElement extends dia.Element {

            defaults() {
                return {
                    ...super.defaults,
                    attrs: {
                        body: {
                            rx: 10,
                            ry: 10,
                            width: 'calc(w)',
                            height: 'calc(h)',
                            stroke: '#333333',
                            fill: '#D4D9D7',
                            strokeWidth: 2
                        },
                        foreignObject: {
                            width: 'calc(w)',
                            height: 'calc(h)'
                        }
                    }
                };
            }
        }

        class Process extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'Process',
                    size: {
                        width: 160,
                        height: 240
                    }
                };
            }

            preinitialize() {
                this.markup = util.svg/* xml */`
                    <rect @selector="body" />
                    <foreignObject @selector="foreignObject" overflow="hidden">
                        <div @selector="content"
                            class="jj-form"
                            xmlns="http://www.w3.org/1999/xhtml"
                        >
                            <div class="process-field-vertical">
                                <h2><strong @selector="label"></strong></h2>
                                <label>
                                Cycle Time
                                <input @selector="cycleTime" class="jj-input" type="number"/>
                                </label>

                                <label>
                                Available Time
                                <input @selector="availableTime" class="jj-input" type="number"/>
                                </label>

                                <label>
                                Scrap Rate
                                <input @selector="scrapRate" class="jj-input" type="number"/>
                                </label>

                                <label>
                                Up Time
                                <input @selector="upTime" class="jj-input" type="number"/>
                                </label>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
        }

        class SupCus extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'SupCus',
                    size: {
                        width: 160,
                        height: 120
                    }
                };
            }

            preinitialize() {
                this.markup = util.svg/* xml */`
                    <rect @selector="body" />
                    <foreignObject @selector="foreignObject" overflow="hidden">
                        <div @selector="content"
                            class="jj-form"
                            xmlns="http://www.w3.org/1999/xhtml"
                        >
                            <div class="supCus-field-vertical">
                                <h2><strong @selector="label"></strong></h2>
                                <label>
                                    <input @selector="nameSupplier" class="jj-input" type="text"/>
                                </label>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
        }

        class Inventory extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'inventory',
                    size: {
                        width: "calc(w)",
                        height: "calc(h)"
                    }
                };
            }

            preinitialize() {
                this.markup = util.svg/* xml */`
                    <path d="M 50 10 L 90 90 L 10 90 Z" fill="yellow" stroke="black" />
                    <text @selector ="label" text-anchor="middle" fill="black"/> 

                `;
            }
        }


        function figMat(which: number, mode:string) {
            let period = SupMats[which].periodShiftSupplier === undefined ?  '' : SupMats[which].periodShiftSupplier?.toString();
            let quantity = SupMats[which].quantityShiftSupplier === undefined? '' : SupMats[which].periodShiftSupplier?.toString();
            const modeMap = {
                Airplane: "https://www.svgrepo.com/show/522355/airplane.svg",
                Bike: "https://www.svgrepo.com/show/487074/bike.svg",
                Car: "https://www.svgrepo.com/show/533553/car-side.svg",
                MultiModal: "https://www.svgrepo.com/show/522355/multimodal.svg",
                Ship: "https://www.svgrepo.com/show/510190/ship-it.svg",
                Train: "https://www.svgrepo.com/show/533566/train-tram.svg",
                Truck: "https://www.svgrepo.com/show/533567/truck.svg",
              };
              
            const chosen = modeMap[(mode as keyof typeof modeMap)] || ""; // Type assertion              
            var link = new shapes.standard.Link({
                source: supArray[which],
                target: procArray[0],
                labels: [
                    {
                        position: { distance: 0.5, offset: { x: 20, y: 20 } },
                        attrs: {
                            text: {
                                'font-size': 12,
                                fill: 'black',
                                'font-family': 'Arial, sans-serif'
                            }
                        }
                    }
                ],
                labelMarkup: [
                    '<g class="label">',
                    '<image href="' + chosen + '" width="130" height="130" x="-100" y="-125" />',
                    '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="25">',
                        '<tspan>' + period + '</tspan>',
                        '<tspan x="40" dy="25">' + quantity + '</tspan>', // Adjust dy for line spacing
                    '</text>',
                    '</g>'
                ].join('')
            });
            return link;
        }



        function processLink() {

            for (let i = 0; i < processes.length; i++) {
                procArray[i] = new Process({
                    position: { x: start * (i + 1), y: 600 },
                    name: 'p'[i],
                    z: 3,
                    attrs: {
                        body: {
                            fill: '#F7E3AE'
                        },
                        label: {
                            html: processes[i].processName
                        },
                        cycleTime: {
                            props: { value: processes[i].cycleTime }
                        },
                        availableTime: {
                            props: { value: processes[i].availableTime }
                        },
                        scrapRate: {
                            props: { value: processes[i].scrapRate }
                        },
                        upTime: {
                            props: { value: processes[i].upTime }
                        }
                    }
                });
                procArray[i].addTo(graph);

            }
            for (let i = 0; i <= (processes.length - 2); i++) {

                link[i] = new shapes.standard.Link();
                link[i].source(procArray[i]);
                link[i].target(procArray[i + 1]);
                link[i].addTo(graph);
            }

        }

        processLink();

        function supCus() {
            let i;

            for (i = 0; i < suppliers.length; i++) {
                supArray[i] = new SupCus({
                    position: { x: start - 250, y: 150 * (i + 1) },
                    name: 's'[i],
                    z: 3,
                    attrs: {
                        body: {
                            fill: '#EAECEA'
                        },
                        label: {
                            html: "Supplier"
                        },
                        nameSupplier: {
                            props: { value: suppliers[i].supplierName }
                        }
                    }
                });
                supArray[i].addTo(graph);

            }
            for (i = 0; i <= (suppliers.length - 1); i++) {

                    linkSup[i] = figMat(i,SupMats[i].modeSupplier);
                    linkSup[i].addTo(graph);
                
            }

            const customer = new SupCus({
                position: { x: start * ((numProcess)) + 250, y: 150 },
                name: 'c',
                z: 3,
                attrs: {
                    body: {
                        fill: '#EAECEA'
                    },
                    label: {
                        html: "Customer"
                    },
                    nameSupplier: {
                        props: { value: customerForm.CustomerName }
                    }
                }
            })

            let period = CusformData.periodShiftCustomer === undefined ?  '' : CusformData.periodShiftCustomer?.toString();
            let quantity = CusformData.quantityShiftCustomer === undefined? '' : CusformData.quantityShiftCustomer?.toString();

            customer.addTo(graph);
            const modeMap = {
                Airplane: "https://www.svgrepo.com/show/522355/airplane.svg",
                Bike: "https://www.svgrepo.com/show/487074/bike.svg",
                Car: "https://www.svgrepo.com/show/533553/car-side.svg",
                MultiModal: "https://www.svgrepo.com/show/522355/multimodal.svg",
                Ship: "https://www.svgrepo.com/show/510190/ship-it.svg",
                Train: "https://www.svgrepo.com/show/533566/train-tram.svg",
                Truck: "https://www.svgrepo.com/show/533567/truck.svg",
              };
              
            const chosen = modeMap[(CusformData.modeCustomer as keyof typeof modeMap)] || ""; // Type assertion              
            var linkCus = new shapes.standard.Link({
                source: customer,
                target: procArray[(procArray.length -1)],
                labels: [
                    {
                        position: { distance: 0.5, offset: { x: 20, y: 20 } },
                        attrs: {
                            text: {
                                'font-size': 12,
                                fill: 'black',
                                'font-family': 'Arial, sans-serif'
                            }
                        }
                    }
                ],
                labelMarkup: [
                    '<g class="label">',
                    '<image href="' + chosen + '" width="130" height="130" x="-70" y="-125" />',
                    '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="25">',
                        '<tspan>' + period + '</tspan>',
                        '<tspan x="40" dy="25">' + quantity + '</tspan>', // Adjust dy for line spacing
                    '</text>',
                    '</g>'
                ].join('')
            });
            linkCus.addTo(graph)
        }

        supCus();

        function prodControl() {
            const company = new SupCus({
                position: { x: start * ((numProcess + 1) / 2), y: 100 },
                name: 'p',
                z: 3,
                attrs: {
                    body: {
                        fill: '#EAECEA'
                    },
                    label: {
                        html: formData.enterpriseName
                    },
                    nameSupplier: {
                        props: { value: formData.creatorName }
                    }
                }
            })
            company.addTo(graph);
            return (company)
        }

        prodControl();


        function invFun() {
            let i = 0;

            for (i; i <= (inventories.length - 1); i++) {
                invArray[i] = new Inventory({
                    position: { x: start * (i + 1) - 120, y: 720 },
                    name: 'i',
                    z: 3,
                    size: { width: 100, height: 100 },
                    attrs: {
                        label: {
                            x: "calc(w/2)",
                            y: "calc(h/2)",
                            text: inventories[i].processINumber?.toString(),
                            textVerticalAnchor: "middle"
                        },
                        body: {
                            width: 'calc(w)',
                            height: 'calc(h)',
                            fill: "yellow"
                        }
                    }
                })
                invArray[i].addTo(graph);
            }

        }

        invFun();
        // Definição do link em formato de raio


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

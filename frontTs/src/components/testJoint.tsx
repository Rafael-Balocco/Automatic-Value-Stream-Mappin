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
    console.log(ProcProds)


    useEffect(() => {

        const procArray: any[] = [];
        const link: any[] = [];
        const linkSup: any[] = [];
        const supArray: any[] = [];
        const invArray: any[] = [];
        const company: any[] = [];
        const graph = new dia.Graph();
        let SupProdLink: any[] = [];
        let ProcProdLink: any[] = [];
        let CusProdLink : any[] = [];
        const customer:any[] = [];

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


        function figMat(which: number, mode: string) {
            let period = SupMats[which].periodShiftSupplier === undefined ? '' : SupMats[which].periodShiftSupplier?.toString();
            let quantity = SupMats[which].quantityShiftSupplier === undefined ? '' : SupMats[which].quantityShiftSupplier?.toString();
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

                linkSup[i] = figMat(i, SupMats[i].modeSupplier);
                linkSup[i].addTo(graph);

            }

            customer[0] = new SupCus({
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

            let period = CusformData.periodShiftCustomer === undefined ? '' : CusformData.periodShiftCustomer?.toString();
            let quantity = CusformData.quantityShiftCustomer === undefined ? '' : CusformData.quantityShiftCustomer?.toString();

            customer[0].addTo(graph);
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
                source: customer[0],
                target: procArray[(procArray.length - 1)],
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
            company[0] = new SupCus({
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
            company[0].addTo(graph);
        }

        prodControl()

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

        function procInvGlued() {

            for (let i = 0; i < procArray.length; i++) {
                procArray[i].on('change:position', function () {
                    var proc1Position = procArray[i].position();
                    invArray[i].position(proc1Position.x - 120, proc1Position.y + 120)
                })

                invArray[i].on('change:position', function () {
                    var proc1Position = invArray[i].position();
                    procArray[i].position(proc1Position.x + 120, proc1Position.y - 120)
                })

            }

        }

        invFun();
        procInvGlued();

        function updateLinkVertices(link: any, which: number, id:number) {
            let companyPos = company[0].position();
            let other;
            let receiver;
            let supNumber: number;
            let processNumber:number;
            let inverter = 1;
            let otherPos;

            if(id === 1){ //supplier
                supNumber = SupProds[which].supNumber;
                other = supArray[supNumber-1];
                receiver = SupProds[which].receiveSup;
                otherPos = other.position();
                console.log('Other:', other);
            }    
            else if(id === 2 ){
                processNumber = ProcProds[which].processNumber;
                other = procArray[processNumber-1];
                receiver = ProcProds[which].receiveProcess;
                otherPos = other.position();
                console.log('Other:', other);
            }
            else if(id ===3 ){
                other = customer[0];
                receiver = CusProds[which].receiveCus;
                otherPos = other.position();
                console.log('Other:', other);
            } 

            let left = otherPos.x <= companyPos.x ? otherPos.x : companyPos.x; let right = otherPos.x <= companyPos.x ? companyPos.x : otherPos.x;
            let upper = otherPos.y <= companyPos.y ? otherPos.y : companyPos.y; let lower = otherPos.y <= companyPos.y ? companyPos.y : otherPos.y;
            let target = receiver === 'Production Control'? company[0] : other; let source = receiver === 'Production Control'? other : company[0];

            if(target === company[0]) inverter =-1;

            let meiox = left + 80 + ((right - left) / 2);
            console.log("Meiox", meiox)
            let meioy = lower + 60 - ((lower - upper) / 2);
            console.log("Meioy", meioy)
            link.vertices([
                { x: meiox, y: meioy },
                { x: meiox + (30*inverter), y: meioy + (30*inverter) }
            ]);
        }

        function eletronicLink(which:number, id:number) {
                let companyPos = company[0].position();
                let other;
                let receiver;
                let supNumber: number;
                let processNumber:number;
                let inverter = 1;
                let otherPos;
                if(id === 1){ //supplier
                    supNumber = SupProds[which].supNumber;
                    other = supArray[supNumber-1];
                    receiver = SupProds[which].receiveSup;
                    otherPos = other.position();
                    console.log('Other:', other);
                }    
                else if(id === 2 ){
                    processNumber = ProcProds[which].processNumber;
                    other = procArray[processNumber-1];
                    receiver = ProcProds[which].receiveProcess;
                    otherPos = other.position();
                    console.log('Other:', other);
                }
                else if(id ===3 ){
                    other = customer[0];
                    receiver = CusProds[which].receiveCus;
                    otherPos = other.position();
                    console.log('Other:', other);
                } 

                let left = otherPos.x <= companyPos.x ? otherPos.x : companyPos.x; let right = otherPos.x <= companyPos.x ? companyPos.x : otherPos.x;
                let upper = otherPos.y <= companyPos.y ? otherPos.y : companyPos.y; let lower = otherPos.y <= companyPos.y ? companyPos.y : otherPos.y;
                let target = receiver === 'Production Control'? company[0] : other; let source = receiver === 'Production Control'? other : company[0];

                if(target === company[0]) inverter =-1;

                let meiox = left + 80 + ((right - left) / 2);
                console.log("Meiox", meiox)
                let meioy = lower + 60 - ((lower - upper) / 2);
                console.log("Meioy", meioy)

                if(id === 1){
                    SupProdLink[which] = new shapes.standard.Link();
                    SupProdLink[which].source(source);
                    SupProdLink[which].target(target);
                    SupProdLink[which].vertices([
                        { x: meiox, y: meioy },
                        { x: meiox + (30*inverter), y: meioy + (30*inverter) },
                    ]);
                    SupProdLink[which].addTo(graph);
                }

                else if(id === 2){
                    ProcProdLink[which] = new shapes.standard.Link();
                    ProcProdLink[which].source(source);
                    ProcProdLink[which].target(target);
                    ProcProdLink[which].vertices([
                        { x: meiox, y: meioy },
                        { x: meiox + (30*inverter), y: meioy + (30*inverter) },
                    ]);
                    ProcProdLink[which].addTo(graph);
                }
                else if(id === 3){
                    CusProdLink[which] = new shapes.standard.Link();
                    CusProdLink[which].source(source);
                    CusProdLink[which].target(target);
                    CusProdLink[which].vertices([
                        { x: meiox, y: meioy },
                        { x: meiox + (30*inverter), y: meioy + (30*inverter) },
                    ]);
                    CusProdLink[which].addTo(graph);
                }


        }
        


        function createInfoLink() {
            for (let i = 0; i < SupProds.length; i++) {
                if (SupProds[i].typeSup === 'eletronic') {
                    eletronicLink(i, 1);
                }
            }    
            for(let i =0 ; i< ProcProds.length; i++ ){
                if(ProcProds[i].typeProcess === 'eletronic'){
                    eletronicLink(i,2);
                }

            }
            for(let i = 0 ; i< CusProds.length ; i++){
                if(CusProds[i].typeCus === 'eletronic'){
                    eletronicLink(i,3)
                }
            }
        }

        createInfoLink();

        
        for(let i = 0 ; i < procArray.length; i ++ ){
            procArray[i].on('change:position', function () {
                updateLinkVertices(ProcProdLink[i], i, 2);
            });
            
            company[0].on('change:position', function () {
                updateLinkVertices(ProcProdLink[i], i,2);
            });
            
        }
        
        for( let i = 0 ; i < customer.length ; i++){
            customer[0].on('change:position', function () {
                updateLinkVertices(CusProdLink[i], i, 3);
            });
            
            company[0].on('change:position', function () {
                updateLinkVertices(CusProdLink[i], i,3);
            });
        }
        for (let i = 0; i < supArray.length; i++) {

            supArray[i].on('change:position', function () {
                updateLinkVertices(SupProdLink[i], i, 1);
            });

            company[0].on('change:position', function () {
                updateLinkVertices(SupProdLink[i], i,1);
            });
        }

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

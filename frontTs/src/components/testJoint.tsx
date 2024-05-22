import React, { useEffect, useRef, useState } from 'react';
import { dia, shapes, util } from '@joint/core';
import Header from './Header';
import Footer from './Footer';
import '../styles/tabsCSS.css'
import multiModal from '../images/noun-multi-modal-476756.svg'

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

const procWidth = 180;
const procHeight = 240;

type TimeResultValues = {
    VATime: number;
    ratio: number;
    lead: number;
  };


export const TestJoint: React.FC = () => {

    let paperRef: any = useRef(null);

    const canvas: any = useRef(null);

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
    const [refreshKey, setRefreshKey] = useState(0); 


    const numProcess = processes.length;

    const start = 600;

    const [scale, setScale] = useState<number>();
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [initialState, setInitialState] = useState(null);
    const graphRef = useRef(null);
    const [cycleInitial, setCycleInitial] = useState<number[]>([]);
    const [demandInitial, setdemandInitial] = useState<number>();
    const [inventoryInitial, setinventoryInitial] = useState<number[]>([]);
    const [timeResultInitial, settimeResultInitial] = useState<TimeResultValues[]>([]);

    let procArray: any[] = [];
    

    useEffect(() => {

        const link: any[] = [];
        const linkSup: any[] = [];
        const supArray: any[] = [];
        const invArray: any[] = [];
        const company: any[] = [];
        let SupProdLink: any[] = [];
        let ProcProdLink: any[] = [];
        let CusProdLink: any[] = [];
        const customer: any[] = [];
        const timeLadderResult: any[] = [];
        const demandArray: any[] = [];
        let totalLead = 0;
        let VAT = 0;

        
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
                        width: procWidth,
                        height: procHeight
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
                                <input @selector="cycleTime" class="jj-input" type="number" joint-input-name="cycleTime"/>
                                </label>

                                <label>
                                Available Time
                                <input @selector="availableTime" class="jj-input" type="number" joint-input-name="availableTime"/>
                                </label>

                                <label>
                                Scrap Rate
                                <input @selector="scrapRate" class="jj-input" type="number" joint-input-name="scrapRate"/>
                                </label>

                                <label>
                                Up Time
                                <input @selector="upTime" class="jj-input" type="number" joint-input-name="upTime"/>
                                </label>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
            getCycleTime() {
                return Number(this.attr('cycleTime/props/value'))
            }
            setCycleTime(value: any) {
                this.attr('cycleTime/props/value', value.toString());
            }
        }

        class SupCus extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'SupCus',
                    size: {
                        width: 180,
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
                                    <input @selector="nameSupplier" class="jj-input" type="text" joint-input-name="nameSupplier"/>
                                </label>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
        }

        class Demand extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'Demand',
                    size: {
                        width: 180,
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
                                    <input @selector="dailyDemand" class="jj-input" type="text" joint-input-name="dailyDemand"/>
                                </label>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
            getDemand() {
                return Number(this.attr('dailyDemand/props/value'))
            }
            setDemand(value: any) {
                this.attr('dailyDemand/props/value', value.toString());
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
                <foreignObject @selector="foreignObject" overflow="hidden">
                <div @selector="content"
                    class="jj-form"
                    xmlns="http://www.w3.org/1999/xhtml"
                    style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-left: -25px; width: 160px; height: 120px"
                >
                        <div class="inventory-field-vertical">
                            <label>
                            <input @selector="inventoryLabel" class="jj-input" type="number" joint-input-name="inventoryLabel"/>
                            </label>
                        </div>
                    </div>
                </foreignObject>
            `;
            }
            getInventory() {
                return Number(this.attr('inventoryLabel/props/value'))
            }
            setInventory(value:any){
                this.attr('inventoryLabel/props/value', value.toString());
            }
        }

        class timeResult extends ForeignObjectElement {

            defaults() {
                return {
                    ...super.defaults(),
                    type: 'timeResult',
                    size: {
                        width: "calc(w)",
                        height: "calc(h)"
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
                            <div class="timeResult-field-vertical">
                            <h2>Lead Time</h2>
                                <text @selector ="label" text-anchor="middle" fill="black"></text><text> Seconds</text> 
                                <br></br>
                                <h2>Value Added Time</h2>
                                <text @selector ="VATime" text-anchor="middle" fill="black"></text><text> Seconds </text> 
                                <br></br>
                            <h2>Ratio</h2>
                            <text @selector = "Ratio" text-anchor = "middle" fill="black"></text><text> %</text>
                            </div>
                        </div>
                    </foreignObject>
                `;
            }
            getVATime() {
                return Number(this.attr('VATime/html'))
            }
            setVATime(value: any) {
                this.attr('VATime/html', value.toString());
            }
            setRatio(value: any) {
                this.attr('Ratio/html', value.toFixed(6).toString());
            }
            getRatio() {
                return Number(this.attr('Ratio/html'));
            }
            getLead() {
                return Number(this.attr('label/html'));
            }
            setLead(value: any) {
                this.attr('label/html', value.toString());
            }

        }
        const adjustSize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
          
            let lastElx = timeLadderResult[0].position() ;
            let lastEly = demandArray[0].position();  
            let scaleX = (window.innerWidth/(lastElx.x + 270 -start))*0.8 ;
            let scaleY = (window.innerHeight /(lastEly.y + 200)) *0.8;
            let scale = scaleX < scaleY? scaleX :scaleY 

            
            if (paperRef.current) {
                setScale(scale)
                paperRef.current.setDimensions(width, height);
                paper.scale(scale,scale);
            }

        };

        const cellNamespace = {
            Process: Process,
            timeResult:timeResult,
            Inventory:Inventory,
            inventory:Inventory,
            Demand:Demand,
            SupCus:SupCus
        };

        const combinedNamespace = {
            ...shapes,
            ...cellNamespace,
            standard: {
                ...shapes.standard,
                Link: shapes.standard.Link
            }
        };

        // Criar o graph
        const graph = new dia.Graph({}, { cellNamespace: combinedNamespace });
        graphRef.current = graph;



        const paper = new dia.Paper({
            width: window.innerWidth ,
            height: window.innerHeight,
            model: graph,
            background: {
                color: '#ccccca',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            gridSize: 1,
            cellViewNamespace: combinedNamespace,
            interactive: {
                linkMove: false,
                labelMove: true
            },
            elementView: dia.ElementView.extend({

                events: {
                    'change input,select': 'onInputChange'
                },

                onInputChange: function (evt: any) {
                    const input = evt.target;
                    if (!input.validity.valid) return;
                    const valuePath = input.getAttribute('joint-selector') + '/props/value';
                    const currentValue = this.model.attr(valuePath);
                    this.model.attr(valuePath, input.value, { previousValue: currentValue, calc: true });
                }
            })
        });

        paperRef.current = paper;
        graphRef.current = graph;

        canvas.current.appendChild(paper.el);
        paper.render();



        function figMat(which: number, mode: string) {
            let period = SupMats[which].periodShiftSupplier === undefined ? '' : SupMats[which].periodShiftSupplier?.toString();
            let quantity = SupMats[which].quantityShiftSupplier === undefined ? '' : SupMats[which].quantityShiftSupplier?.toString();
            const modeMap = {
                Airplane: "https://www.svgrepo.com/show/522355/airplane.svg",
                Bike: "https://www.svgrepo.com/show/487074/bike.svg",
                Car: "https://www.svgrepo.com/show/533553/car-side.svg",
                MultiModal: "https://www.svgrepo.com/show/533567/truck.svg",
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
                    position: { x: start * (i + 1), y: 500 },
                    name: 'p'[i],
                    z: 3,
                    attrs: {
                        body: {
                            fill: '#F0F0F0'
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
                    position: { x: start - 250, y: 50 * (i + 1) },
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
                position: { x: start * ((numProcess)) + 250, y: 50 },
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
                MultiModal: "https://www.svgrepo.com/show/533567/truck.svg",
                Ship: "https://www.svgrepo.com/show/510190/ship-it.svg",
                Train: "https://www.svgrepo.com/show/533566/train-tram.svg",
                Truck: "https://www.svgrepo.com/show/533567/truck.svg",
            };

            const chosen = modeMap[(CusformData.modeCustomer as keyof typeof modeMap)] || ""; // Type assertion              
            var linkCus = new shapes.standard.Link({
                source: procArray[(procArray.length - 1)],
                target: customer[0],
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
                position: { x: start * ((numProcess + 1) / 2), y: 0 },
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
                    position: { x: start * (i + 1) - 175, y: 620 },
                    name: 'i',
                    z: 3,
                    size: { width: 100, height: 100 },
                    attrs: {
                        inventoryLabel: {
                            x: "calc(w/2)",
                            y: "calc(h/2)",
                            props: { value: inventories[i].processINumber },
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
                    invArray[i].position(proc1Position.x - 200, proc1Position.y + 120)
                })

                invArray[i].on('change:position', function () {
                    var proc1Position = invArray[i].position();
                    procArray[i].position(proc1Position.x + 200, proc1Position.y - 120)
                })

            }

        }

        invFun();
        procInvGlued();

        function updateLinkVertices(link: any, which: number, id: number) {
            let companyPos = company[0].position();
            let other;
            let receiver;
            let supNumber: number;
            let processNumber: number;
            let inverterx = 1;
            let invertery = 1;
            let otherPos;

            if (id === 1) { //supplier
                supNumber = SupProds[which].supNumber;
                other = supArray[supNumber - 1];
                receiver = SupProds[which].receiveSup;
                otherPos = other.position();
            }
            else if (id === 2) {
                processNumber = ProcProds[which].processNumber;
                other = procArray[processNumber - 1];
                receiver = ProcProds[which].receiveProcess;
                otherPos = other.position();
            }
            else if (id === 3) {
                other = customer[0];
                receiver = CusProds[which].receiveCus;
                otherPos = other.position();
            }

            let left = otherPos.x <= companyPos.x ? otherPos.x : companyPos.x; let right = otherPos.x <= companyPos.x ? companyPos.x : otherPos.x;
            let upper = otherPos.y <= companyPos.y ? otherPos.y : companyPos.y; let lower = otherPos.y <= companyPos.y ? companyPos.y : otherPos.y;
            let target = receiver === 'Production Control' ? company[0] : other; let source = receiver === 'Production Control' ? other : company[0];

            if (source.position().x > target.position().x && source.position().y > target.position().y || source.position().x < target.position().x && source.position().y < target.position().y) {
                inverterx = -1;
            }

            let meiox = left + 80 + ((right - left) / 2);
            let meioy = lower + 60 - ((lower - upper) / 2);
            link.vertices([
                { x: meiox, y: meioy },
                { x: meiox + (35 * inverterx), y: meioy + (35 * invertery) }
            ]);
        }

        function eletronicLink(which: number, id: number) {
            let companyPos = company[0].position();
            let other;
            let receiver;
            let supNumber: number;
            let processNumber: number;
            let inverterx = 1;
            let invertery = 1;
            let otherPos;
            if (id === 1) { //supplier
                supNumber = SupProds[which].supNumber;
                other = supArray[supNumber - 1];
                receiver = SupProds[which].receiveSup;
                otherPos = other.position();
            }
            else if (id === 2) {
                processNumber = ProcProds[which].processNumber;
                other = procArray[processNumber - 1];
                receiver = ProcProds[which].receiveProcess;
                otherPos = other.position();
            }
            else if (id === 3) {
                other = customer[0];
                receiver = CusProds[which].receiveCus;
                otherPos = other.position();
            }

            let left = otherPos.x <= companyPos.x ? otherPos.x : companyPos.x; let right = otherPos.x <= companyPos.x ? companyPos.x : otherPos.x;
            let upper = otherPos.y <= companyPos.y ? otherPos.y : companyPos.y; let lower = otherPos.y <= companyPos.y ? companyPos.y : otherPos.y;
            let target = receiver === 'Production Control' ? company[0] : other; let source = receiver === 'Production Control' ? other : company[0];

            if (source.position().x > target.position().x && source.position().y > target.position().y || source.position().x < target.position().x && source.position().y < target.position().y) {
                inverterx = -1;
            }

            let meiox = left + 80 + ((right - left) / 2);
            let meioy = lower + 60 - ((lower - upper) / 2);
            if (id === 1) {
                SupProdLink[which] = new shapes.standard.Link({
                    source: source,
                    target: target,
                    vertices: ([
                        { x: meiox, y: meioy },
                        { x: meiox + (35 * inverterx), y: meioy + (35 * invertery) },
                    ]),
                    labels: [
                        {
                            position: { distance: 0.5, offset: { x: 20, y: 20 } },
                            attrs: {
                                text: {
                                    'font-size': 10,
                                    fill: 'black',
                                    'font-family': 'Arial, sans-serif'
                                }
                            }
                        }
                    ],
                    labelMarkup: [
                        '<g class="label">',
                        '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                        '<tspan>' + SupProds[which].periodSup + '</tspan>',
                        '<tspan x="40" dy="25">' + SupProds[which].contentSup + '</tspan>', // Adjust dy for line spacing
                        '</text>',
                        '</g>'

                    ].join('')
                });
                SupProdLink[which].addTo(graph);

            }

            else if (id === 2) {

                ProcProdLink[which] = new shapes.standard.Link({
                    source: source,
                    target: target,
                    vertices: ([
                        { x: meiox, y: meioy },
                        { x: meiox + (35 * inverterx), y: meioy + (35 * invertery) },
                    ]),
                    labels: [
                        {
                            position: { distance: 0.5, offset: { x: 20, y: 20 } },
                            attrs: {
                                text: {
                                    'font-size': 10,
                                    fill: 'black',
                                    'font-family': 'Arial, sans-serif'
                                }
                            }
                        }
                    ],
                    labelMarkup: [
                        '<g class="label">',
                        '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                        '<tspan>' + ProcProds[which].periodProcess + '</tspan>',
                        '<tspan x="40" dy="25">' + ProcProds[which].contentProcess + '</tspan>', // Adjust dy for line spacing
                        '</text>',
                        '</g>'

                    ].join('')
                });
                ProcProdLink[which].addTo(graph);
            }
            else if (id === 3) {

                CusProdLink[which] = new shapes.standard.Link({
                    source: source,
                    target: target,
                    vertices: ([
                        { x: meiox, y: meioy },
                        { x: meiox + (35 * inverterx), y: meioy + (35 * invertery) },
                    ]),
                    labels: [
                        {
                            position: { distance: 0.5, offset: { x: 20, y: 20 } },
                            attrs: {
                                text: {
                                    'font-size': 5,
                                    fill: 'black',
                                    'font-family': 'Arial, sans-serif'
                                }
                            }
                        }
                    ],
                    labelMarkup: [
                        '<g class="label">',
                        '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                        '<tspan>' + CusProds[which].periodCus + '</tspan>',
                        '<tspan x="40" dy="25">' + CusProds[which].contentCus + '</tspan>', // Adjust dy for line spacing
                        '</text>',
                        '</g>'

                    ].join('')
                });
                CusProdLink[which].addTo(graph);
            }


        }



        function createInfoLink() {
            for (let i = 0; i < SupProds.length; i++) {
                if (SupProds[i].typeSup === 'eletronic') {
                    eletronicLink(i, 1);
                }
                else {
                    let other = supArray[(SupProds[i].supNumber) - 1];
                    let receiver = SupProds[i].receiveSup;
                    let target = receiver === 'Production Control' ? company[0] : other; let source = receiver === 'Production Control' ? other : company[0];
                    SupProdLink[i] = new shapes.standard.Link({
                        source: source,
                        target: target,
                        labels: [
                            {
                                position: { distance: 0.5, offset: { x: 20, y: 20 } },
                                attrs: {
                                    text: {
                                        'font-size': 10,
                                        fill: 'black',
                                        'font-family': 'Arial, sans-serif'
                                    }
                                }
                            }
                        ],
                        labelMarkup: [
                            '<g class="label">',
                            '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                            '<tspan>' + SupProds[i].periodSup + '</tspan>',
                            '<tspan x="40" dy="25">' + SupProds[i].contentSup + '</tspan>', // Adjust dy for line spacing
                            '</text>',
                            '</g>'

                        ].join('')
                    });
                    SupProdLink[i].addTo(graph);
                }
            }
            for (let i = 0; i < ProcProds.length; i++) {
                if (ProcProds[i].typeProcess === 'eletronic') {
                    eletronicLink(i, 2);
                }
                else {
                    let other = procArray[(ProcProds[i].processNumber) - 1];
                    let receiver = ProcProds[i].receiveProcess;
                    let target = receiver === 'Production Control' ? company[0] : other; let source = receiver === 'Production Control' ? other : company[0];
                    ProcProdLink[i] = new shapes.standard.Link({
                        source: source,
                        target: target,
                        labels: [
                            {
                                position: { distance: 0.5, offset: { x: 20, y: 20 } },
                                attrs: {
                                    text: {
                                        'font-size': 10,
                                        fill: 'black',
                                        'font-family': 'Arial, sans-serif'
                                    }
                                }
                            }
                        ],
                        labelMarkup: [
                            '<g class="label">',
                            '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                            '<tspan>' + ProcProds[i].periodProcess + '</tspan>',
                            '<tspan x="40" dy="25">' + ProcProds[i].contentProcess + '</tspan>', // Adjust dy for line spacing
                            '</text>',
                            '</g>'

                        ].join('')
                    });
                    ProcProdLink[i].addTo(graph);
                }

            }
            for (let i = 0; i < CusProds.length; i++) {
                if (CusProds[i].typeCus === 'eletronic') {
                    eletronicLink(i, 3)
                }
                else {
                    let other = customer[0];
                    let receiver = CusProds[i].receiveCus;
                    let target = receiver === 'Production Control' ? company[0] : other; let source = receiver === 'Production Control' ? other : company[0];
                    CusProdLink[i] = new shapes.standard.Link({
                        source: source,
                        target: target,
                        labels: [
                            {
                                position: { distance: 0.5, offset: { x: 20, y: 20 } },
                                attrs: {
                                    text: {
                                        'font-size': 10,
                                        fill: 'black',
                                        'font-family': 'Arial, sans-serif'
                                    }
                                }
                            }
                        ],
                        labelMarkup: [
                            '<g class="label">',
                            '<text x="40" y="20" text-anchor="middle" alignment-baseline="middle" font-size="20">',
                            '<tspan>' + CusProds[0].periodCus + '</tspan>',
                            '<tspan x="40" dy="25">' + CusProds[0].contentCus + '</tspan>', // Adjust dy for line spacing
                            '</text>',
                            '</g>'

                        ].join('')
                    });
                    CusProdLink[i].addTo(graph);
                }
            }
        }

        createInfoLink();


        for (let i = 0; i < ProcProds.length; i++) {
            if (ProcProds[i].typeProcess === 'eletronic') {
                procArray[i].on('change:position', function () {
                    for(let j =0 ; j <ProcProdLink.length;j++){
                        if(ProcProds[j].typeProcess === 'eletronic'){
                            updateLinkVertices(ProcProdLink[j], i, 2);
                        }
                    }
                });
                company[0].on('change:position', function () {
                    for(let j =0 ; j < ProcProdLink.length;j++){
                        if(ProcProds[j].typeProcess === 'eletronic'){
                            updateLinkVertices(ProcProdLink[j], i, 2);
                        }
                    }
                });
            }
        }

        for (let i = 0; i < customer.length; i++) {

            if (CusProds[i]) {
                if (CusProds[i].typeCus === 'eletronic') {
                    customer[0].on('change:position', function () {
                        for(let j =0; j<CusProdLink.length; j++){
                            if(CusProds[j].typeCus === 'eletronic'){
                                updateLinkVertices(CusProdLink[j], i, 3);
                            }
                        }
                    });

                    company[0].on('change:position', function () {
                        for(let j =0; j<CusProdLink.length; j++){
                            if(CusProds[j].typeCus === 'eletronic'){
                                updateLinkVertices(CusProdLink[j], i, 3);
                            }
                        }
                    });
                }
            }


        }
        for (let i = 0; i < SupProds.length; i++) {

            if (SupProds[i].typeSup === 'eletronic') {
                supArray[i].on('change:position', function () {
                    console.log("entra vez: ", i)
                    for(let j=0 ; j<SupProdLink.length ;j++ ){
                        if(SupProds[j].typeSup === 'eletronic'){
                            updateLinkVertices(SupProdLink[j], i, 1);
                        }
                    }
                });

                company[0].on('change:position', function () {
                    for(let j=0 ; j<SupProdLink.length ;j++ ){
                        if(SupProds[j].typeSup === 'eletronic'){
                            updateLinkVertices(SupProdLink[j], i, 1);
                        }
                    }
                });
            }

        }

        var vertices: any[] = [];
        var labels: any[] = [];


        for (let i = 0; i < procArray.length; i++) {
            let cycle = procArray[i].getCycleTime();
            vertices.push(
                { x: start * (i + 1), y: 550 + procHeight },
                { x: start * (i + 1), y: 600 + procHeight },
                { x: start * (i + 1) + procWidth, y: 600 + procHeight },
                { x: start * (i + 1) + procWidth, y: 550 + procHeight }
            );
            labels.push({
                position: { distance: (300 + (procWidth / 2) + start * i + 2 * i * 50), offset: -10 },
                attrs: {
                    text: {
                        text: (cycle + ' Seconds'), 
                        'font-size': 17,
                        fill: 'black',
                        'font-family': 'Arial, sans-serif',
                        'font-weight': 'bold' 
                    },
                    rect: {
                        fill: 'transparent', 
                        rx: 4, 
                        ry: 4 
                    }
                }
            });
            labels.push({
                position: { distance: (120 + start * i + 2 * i * 50), offset: -10 },
                attrs: {
                    text: {
                        text: (inventories[i].processINumber / customerForm.demand + ' Day(s)'), 
                        'font-size': 17,
                        fill: 'black',
                        'font-family': 'Arial, sans-serif',
                        'font-weight': 'bold' 
                    },
                    rect: {
                        fill: 'transparent', 
                        rx: 4, 
                        ry: 4 
                    }
                }
            });
        }

        function timeLadder() {

            for (let i = 0; i < inventories.length; i++) { totalLead += (inventories[i].processINumber / customerForm.demand); let cycleTimeNumber: number = parseInt(processes[i].cycleTime); VAT += cycleTimeNumber; }
            let ratio = (VAT / (totalLead * 86400))
            let leadSeconds = totalLead * 86400;
            timeLadderResult[0] = new timeResult({
                position: { x: (start * procArray.length + procWidth + 50), y: 460 + procHeight },
                name: 'timeLadderResult',
                z: 3,
                size: { width: 250, height: 180 },
                attrs: {
                    label: {
                        html: leadSeconds.toString()
                    },
                    VATime: {
                        html: VAT.toString()
                    },
                    Ratio: {
                        html: ratio.toFixed(6).toString()
                    },
                    body: {
                        fill: '#EAECEA'
                    },
                }
            });
            timeLadderResult[0].addTo(graph);
            let timeLadderLink = new shapes.standard.Link({
                name: 'timeLadderLink',
                source: { x: start - 250, y: (550 + procHeight) },
                target: (timeLadderResult[0]),
                vertices: vertices,
                labels: labels
            });
            timeLadderLink.addTo(graph);
            return timeLadderLink;
        }

        let timeLadderLink = timeLadder();
        timeLadderLink.set('vertices', vertices);
        timeLadderLink.set('labels', labels);

        function dailyDemand() {
            demandArray[0] = new Demand({
                position: { x: start * ((numProcess + 1) / 2), y: 700 + procHeight },
                name: 'p',
                z: 3,
                attrs: {
                    body: {
                        fill: '#EAECEA'
                    },
                    label: {
                        html: "Daily Demand"
                    },
                    dailyDemand: {
                        props: { value: customerForm.demand }
                    }
                }
            })
            demandArray[0].addTo(graph);
        }

        dailyDemand()

        let newCycle: any[] = [];

        function cycleProcess(graph) {
            let value = 0;
            for (let i = 0; i < procArray.length; i++) {
                newCycle[i] = procArray[i].getCycleTime();
                value = value + procArray[i].getCycleTime();
            }
            let lead = timeLadderResult[0].getLead();
            let ratio = value / lead;
            graph.getCells().forEach((cell) => {
                if (cell.get('type') === 'timeResult') { 
                  const attrs = cell.get('attrs');
                  if (attrs['VATime']) {
                    cell.attr('VATime/html', value);
                  }
                  if(attrs['Ratio']){
                    cell.attr('Ratio/html', ratio.toFixed(6).toString())
                  }
                }
              });
            return newCycle;
        }



        function changeLabels(newInventory, newCycle, newDemand) {
            let j = 0;
            let newLabel: any[] = []

            for (let i = 0; i < procArray.length; i++) {

                newLabel.push({
                    position: { distance: (300 + (procWidth / 2) + start * i + 2 * i * 50), offset: -10 },
                    attrs: {
                        text: {
                            text: (newCycle[j] + ' Seconds'),
                            'font-size': 17,
                            fill: 'black',
                            'font-family': 'Arial, sans-serif',
                            'font-weight': 'bold' 
                        },
                        rect: {
                            fill: 'transparent', 
                            rx: 4, 
                            ry: 4 
                        }
                    }
                });
                newLabel.push({
                    position: { distance: (120 + start * i + 2 * i * 50), offset: -10 },
                    attrs: {
                        text: {
                            text: (newInventory[i] / newDemand + ' Day(s)'), 
                            'font-size': 17,
                            fill: 'black',
                            'font-family': 'Arial, sans-serif',
                            'font-weight': 'bold' 
                        },
                        rect: {
                            fill: 'transparent', 
                            rx: 4, 
                            ry: 4 
                        }
                    }
                });
                j++;
            }
            graph.getCells().forEach(cell => {
                if (cell.get('name') === 'timeLadderLink') {
                  const labels = cell.get('labels');
                    if (labels) {
                        cell.set('labels', newLabel);
                  }
                }
            });

            timeLadderLink.prop('labels', null);
            timeLadderLink.prop('labels', newLabel);
            timeLadderLink.addTo(graph)
        }

        function inventoryChange(newDemand: number) {
            let newInventory: any[] = [];
            let value = 0;
            for (let i = 0; i < invArray.length; i++) {
                newInventory[i] = (invArray[i].getInventory())
                value = value + (newInventory[i] / newDemand)
            }
            timeLadderResult[0].setLead(value * 86400)
            let VATime = timeLadderResult[0].getVATime()
            let ratio = VATime / value
            let leadTime = value*86400
            timeLadderResult[0].setRatio(ratio)

            graph.getCells().forEach((cell) => {
                if (cell.get('type') === 'timeResult') { 
                  const attrs = cell.get('attrs');
                  if (attrs['label']) {
                    cell.attr('label/html', leadTime.toFixed(6).toString());
                  }
                  if(attrs['Ratio']){
                    cell.attr('Ratio/html', ratio.toFixed(6).toString());
                  }
                }
              });

            return newInventory;
        }

        graph.on('change:attrs', (cell, attrs) => {
            if ('cycleTime' in attrs) {
                let where;
                for (let i = 0; i < procArray.length; i++) if (cell.id === procArray[i].id) { where = i}
                procArray[where].setCycleTime(attrs['cycleTime'].props.value);
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess(graphRef.current);
                changeLabels(newInventory, newCycle, newDemand)
            }
            if ('inventoryLabel' in attrs) {
                let where;
                for (let i = 0; i < invArray.length; i++) if (cell.id === invArray[i].id) { where = i}
                invArray[where].setInventory(attrs['inventoryLabel'].props.value);
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess(graphRef.current);
                changeLabels(newInventory, newCycle, newDemand)
            }
            if ('dailyDemand' in attrs) {
                demandArray[0].setDemand(attrs['dailyDemand'].props.value);
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess(graphRef.current);
                changeLabels(newInventory, newCycle, newDemand)
            }
        });

        graph.set('graphCustomProperty', true);
        graph.set('graphExportTime', Date.now());


        adjustSize();

        window.addEventListener('resize', adjustSize);

        setInitialState(graph.toJSON());

        paper.unfreeze();

        return () => {
            graphRef.current.off('change:attrs')
            paper.remove();
        };


    }, [refreshKey]);


    const exportDiagram = () => {


        const paper = paperRef.current;
        if (!paper) return;
      
        // Get the SVG element from the paper's DOM representation
        const svgElement = paper.svg;
      
        // Clone the SVG element to preserve the original
        const clonedSvg = svgElement.cloneNode(true);
      
        // Get the stylesheets from the document
        const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
          .map(tag => tag.outerHTML)
          .join('');
      
        // Create a new SVG element to hold the styles
        const styleContainer = document.createElementNS('http://www.w3.org/2000/svg', 'style');
        styleContainer.textContent = styleTags;
      
        // Insert the styles into the cloned SVG's defs element
        const defs = clonedSvg.querySelector('defs');
        if (defs) {
          defs.appendChild(styleContainer);
        } else {
          // If defs element is not found, create one and append to the cloned SVG
          const newDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          newDefs.appendChild(styleContainer);
          clonedSvg.insertBefore(newDefs, clonedSvg.firstChild);
        }
      
        // Replace input values in the cloned SVG with updated values
        const inputs = document.querySelectorAll('.jj-input');
        inputs.forEach(input => {
          const selector = input.getAttribute('id');
          if (selector) {
            const inputInSVG = clonedSvg.querySelector(`[id="${selector}"]`);
            if (inputInSVG) {
                inputInSVG.setAttribute('value', input.value);
            }
          }
        });
      
        const procSize = document.querySelectorAll('.process-field-vertical')


        const width = start * procSize.length + procWidth + 200 - start +1000


        let minX = 100 * (scale)

        let widthSVG = (width*scale) > 1600 ? (width*scale) : 1600
        
        // Set the viewBox attribute based on the bounding box
        clonedSvg.setAttribute('viewBox', `${minX} 100 ${widthSVG} ${height*scale}`);
    


        // Serialize the cloned SVG element to XML string
        const serializer = new XMLSerializer();
        let svgData = serializer.serializeToString(clonedSvg);

        // Include CSS styles in the SVG
        svgData = svgData.replace('</defs>', `${styleTags}</defs>`);

        // Create a blob from the SVG data
        const blob = new Blob([svgData], { type: 'image/svg+xml' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to initiate the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.svg'; // Set desired file name
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
         URL.revokeObjectURL(url);
      };
      
      const changeScale = (signal: number) => {
        const paper = paperRef.current;
        if (paper) {
          let newScale = scale + signal;
          setScale(newScale);
          paper.scale(newScale, newScale);
        }
      };

      const handleRefresh = () => {
        if (graphRef.current && initialState) {
            setRefreshKey(prevKey=>prevKey+1)
        }
      };
      
    return (
        <div>
          <Header />
          <div>
            <div className='buttonDiv'>
                    <p className='scale'>Scale: </p>
                    <button className="reduceScale" onClick={() => changeScale(-0.05)}>  -  </button>
                    <button className="increaseScale" onClick={() => changeScale(0.05)}> + </button>
                    <button id="refreshButton" className='refresh-button' onClick={handleRefresh}>Refresh</button>
                    <button className='button-download' onClick={exportDiagram}>Download SVG</button>
                </div>
                <div className="canvas" ref={canvas}/>
            </div>
            <Footer />
        </div>
    );
}

export default TestJoint;

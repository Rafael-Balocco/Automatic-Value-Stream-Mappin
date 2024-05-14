import React, { useEffect, useRef } from 'react';
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

const start = 440;
const procWidth = 180;
const procHeight = 240;

export const TestJoint: React.FC = () => {

    let paperRef: any = useRef(null);

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
        let CusProdLink: any[] = [];
        const customer: any[] = [];
        const timeLadderResult: any[] = [];
        const demandArray: any[] = [];
        let totalLead = 0;
        let VAT = 0;

        const paper = new dia.Paper({
            width: (start * ((numProcess)) + 500),
            height: 1200,
            model: graph,
            background: {
                color: '#ccccca',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            gridSize: 1,
            cellViewNamespace: shapes,
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
            getLead() {
                return Number(this.attr('label/html'));
            }
            setLead(value: any) {
                this.attr('label/html', value.toString());
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
                const teste = procArray[i].getCycleTime();
                console.log("valor process", i, ": ", teste)
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
                MultiModal: "https://www.svgrepo.com/show/533553/multi-modal.svg",
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
                    position: { x: start * (i + 1) - 175, y: 720 },
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
                    updateLinkVertices(ProcProdLink[i], i, 2);
                });
                company[0].on('change:position', function () {
                    updateLinkVertices(ProcProdLink[i], i, 2);
                });
            }
        }

        for (let i = 0; i < customer.length; i++) {

            if (CusProds[0]) {
                if (CusProds[0].typeCus === 'eletronic') {
                    customer[0].on('change:position', function () {
                        updateLinkVertices(CusProdLink[i], i, 3);
                    });

                    company[0].on('change:position', function () {
                        updateLinkVertices(CusProdLink[i], i, 3);
                    });
                }
            }


        }
        for (let i = 0; i < SupProds.length; i++) {

            if (SupProds[i].typeSup === 'eletronic') {
                supArray[i].on('change:position', function () {
                    updateLinkVertices(SupProdLink[i], i, 1);
                });

                company[0].on('change:position', function () {
                    updateLinkVertices(SupProdLink[i], i, 1);
                });
            }

        }

        var vertices: any[] = [];
        var labels: any[] = [];


        for (let i = 0; i < procArray.length; i++) {
            let cycle = procArray[i].getCycleTime();
            vertices.push(
                { x: start * (i + 1), y: 650 + procHeight },
                { x: start * (i + 1), y: 700 + procHeight },
                { x: start * (i + 1) + procWidth, y: 700 + procHeight },
                { x: start * (i + 1) + procWidth, y: 650 + procHeight }
            );
            labels.push({
                position: { distance: (240 + (procWidth / 2) + start * i + 2 * i * 50), offset: -10 },
                attrs: {
                    text: {
                        text: (cycle + ' Seconds'), // Ou qualquer outra propriedade desejada
                        'font-size': 17,
                        fill: 'black',
                        'font-family': 'Arial, sans-serif',
                        'font-weight': 'bold' // Define a fonte como negrito
                    },
                    rect: {
                        fill: '#ccccca', // Define a cor de fundo da label como cinza
                        rx: 4, // Raio do canto arredondado (opcional)
                        ry: 4 // Raio do canto arredondado (opcional)
                    }
                }
            });
            labels.push({
                position: { distance: (65 + start * i + 2 * i * 50), offset: -10 },
                attrs: {
                    text: {
                        text: (inventories[i].processINumber / customerForm.demand + ' Day(s)'), // Ou qualquer outra propriedade desejada
                        'font-size': 17,
                        fill: 'black',
                        'font-family': 'Arial, sans-serif',
                        'font-weight': 'bold' // Define a fonte como negrito
                    },
                    rect: {
                        fill: '#ccccca', // Define a cor de fundo da label como cinza
                        rx: 4, // Raio do canto arredondado (opcional)
                        ry: 4 // Raio do canto arredondado (opcional)
                    }
                }
            });
        }

        function timeLadder() {

            for (let i = 0; i < inventories.length; i++) { totalLead += (inventories[i].processINumber / customerForm.demand); let cycleTimeNumber: number = parseInt(processes[i].cycleTime); VAT += cycleTimeNumber; console.log('Passada', i, ': ', typeof cycleTimeNumber) }
            let ratio = (VAT / (totalLead * 86400))
            let leadSeconds = totalLead * 86400;
            timeLadderResult[0] = new timeResult({
                position: { x: (start * procArray.length + procWidth + 50), y: 560 + procHeight },
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
                source: { x: 250, y: (650 + procHeight) },
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
                position: { x: start * ((numProcess + 1) / 2), y: 800 + procHeight },
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

        function cycleProcess() {
            let value = 0;
            for (let i = 0; i < procArray.length; i++) {
                newCycle[i] = procArray[i].getCycleTime();
                value = value + procArray[i].getCycleTime();
                console.log("valor cycle", i, ": ", value)
            }
            timeLadderResult[0].setVATime(value)
            let lead = timeLadderResult[0].getLead();
            let ratio = value / lead;
            timeLadderResult[0].setRatio(ratio)
            return newCycle;
        }

        function changeLabels(newInventory, newCycle, newDemand) {
            let j = 0;
            let newLabel: any[] = []

            for (let i = 0; i < procArray.length; i++) {
                newLabel.push({
                    position: { distance: (240 + (procWidth / 2) + start * i + 2 * i * 50), offset: -10 },
                    attrs: {
                        text: {
                            text: (newCycle[j] + ' Seconds'), // Ou qualquer outra propriedade desejada
                            'font-size': 17,
                            fill: 'black',
                            'font-family': 'Arial, sans-serif',
                            'font-weight': 'bold' // Define a fonte como negrito
                        },
                        rect: {
                            fill: '#ccccca', // Define a cor de fundo da label como cinza
                            rx: 4, // Raio do canto arredondado (opcional)
                            ry: 4 // Raio do canto arredondado (opcional)
                        }
                    }
                });
                newLabel.push({
                    position: { distance: (65 + start * i + 2 * i * 50), offset: -10 },
                    attrs: {
                        text: {
                            text: (newInventory[i] / newDemand + ' Day(s)'), // Ou qualquer outra propriedade desejada
                            'font-size': 17,
                            fill: 'black',
                            'font-family': 'Arial, sans-serif',
                            'font-weight': 'bold' // Define a fonte como negrito
                        },
                        rect: {
                            fill: '#ccccca', // Define a cor de fundo da label como cinza
                            rx: 4, // Raio do canto arredondado (opcional)
                            ry: 4 // Raio do canto arredondado (opcional)
                        }
                    }
                });
                j++;
            }
            timeLadderLink.prop('labels', null);
            timeLadderLink.prop('labels', newLabel);
        }

        function inventoryChange(newDemand: number) {
            let newInventory: any[] = [];
            let value = 0;
            for (let i = 0; i < invArray.length; i++) {
                newInventory[i] = (invArray[i].getInventory())
                value = value + (newInventory[i] / newDemand)
                console.log("passada ", i, "tem valor", value)
            }
            timeLadderResult[0].setLead(value * 86400)
            let VATime = timeLadderResult[0].getVATime()
            timeLadderResult[0].setRatio(VATime / value)

            return newInventory;
        }

        graph.on('change:attrs', (cell, attrs) => {
            if ('cycleTime' in attrs) {
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess();
                changeLabels(newInventory, newCycle, newDemand)
            }
            if ('inventoryLabel' in attrs) {
                console.log('Entra no inventoryChange')
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess();
                changeLabels(newInventory, newCycle, newDemand)
            }
            if ('dailyDemand' in attrs) {
                console.log('Entra em Demand')
                let newDemand = demandArray[0].getDemand();
                let newInventory = inventoryChange(newDemand);
                let newCycle = cycleProcess();
                changeLabels(newInventory, newCycle, newDemand)
            }
        });

        // Definição do link em formato de raio
        graph.set('graphCustomProperty', true);
        graph.set('graphExportTime', Date.now());
        var jsonObject = graph.toJSON();
        console.log(jsonObject)

        paper.unfreeze();

        return () => {
            paper.remove();
        };


    }, []);


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
          const selector = input.getAttribute('joint-selector');
          if (selector) {
            const inputInSVG = clonedSvg.querySelector(`[joint-selector="${selector}"]`);
            if (inputInSVG) {
                inputInSVG.setAttribute('value', input.value);
            }
          }
        });
      
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
      




    return (
        <div>

            <Header />
            <main>
                <div className="canvas" ref={canvas} style={{ position: 'relative', zIndex: '1' }} />
                <button onClick={exportDiagram}>Download Diagram</button>
            </main>
            <Footer />
        </div>
    );
}

export default TestJoint;

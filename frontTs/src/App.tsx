//regular imports
import {  Routes, Route  } from 'react-router-dom';
import { Home } from "./components/Home";
import './styles/stylesMonster.css';
import './styles/tabsCSS.css';

//components
import {  MapInfo  } from './components/MapInfo';
import {  Supplier  } from './components/Supplier'
import {  Customer  } from './components/Customer'
import {  Process  } from './components/Process'
import {  Inventory  } from "./components/Inventory";
import {  MatFlow  } from "./components/MatFlow"
import {ShowDataComponent} from './components/reviewForm'
import {TestJoint} from './components/testJoint'

//contexts
import { ProcessProvider } from "./contexts/processContext";
import { InfoFlow } from "./components/infoFlow";
import { SupplierProvider } from "./contexts/supplierContext";
import { MapInfoProvider } from "./contexts/allMapInfoContext";
import { CustomerProvider } from "./contexts/customerContext";
import { CustomerMaterialFlowProvider } from "./contexts/customerMatContext";
import { AllSupplierProvider } from "./contexts/supHandlerContext";
import { AllProcessProvider } from './contexts/proHandlerContext';
import { AllInventoryProvider } from './contexts/inventoryContext';
import { AllSupMatProvider } from './contexts/supMatContext';
import { AllCusProdProvider } from './contexts/cusProdContext';
import { AllSupProdProvider } from './contexts/supProdContext';
import { AllProcProdProvider } from './contexts/proProdContext';
import { AllSelBoxProvider } from './contexts/selectedBoxContext';

function App() {

  return (
    <AllSupProdProvider>
      <AllCusProdProvider>
        <AllProcProdProvider>
          <AllSupMatProvider>
            <AllInventoryProvider>
              <AllProcessProvider>
                <ProcessProvider>
                  <AllSupplierProvider>
                    <SupplierProvider>
                      <MapInfoProvider>
                        <CustomerProvider>
                          <CustomerMaterialFlowProvider>
                            <AllSelBoxProvider>

                            <Routes>
                              <Route path="/home/*" element={<Home />} />
                              <Route path="/*" element={<Home />} />
                              <Route path="/mapInfos/*" element={<MapInfo />} />
                              <Route path="/supplier/*" element={<Supplier />} />
                              <Route path="/customer/*" element={<Customer />} />

                              <Route
                                path="/process/*"
                                element={<Process />}
                              />


                              <Route
                                path="/inventory/*"
                                element={<Inventory />}
                              />

                              <Route
                                path="/inventory/*"
                                element={<Inventory />}
                              />


                              <Route
                                path="/MaterialFlow/*"
                                element={<MatFlow />}
                              />

                              <Route
                                path="/InfoFlow/*"
                                element={<InfoFlow />}
                              />

                              <Route path= "/review/*" element ={<ShowDataComponent/>}/>

                              <Route path='/result/*' element = {<TestJoint/>}/>
                              <Route path= "/review/" element ={<ShowDataComponent/>}/>
                            </Routes>
                          
                            </AllSelBoxProvider>
                          </CustomerMaterialFlowProvider>
                        </CustomerProvider>
                      </MapInfoProvider>
                    </SupplierProvider>
                  </AllSupplierProvider>
                </ProcessProvider>
              </AllProcessProvider>
            </AllInventoryProvider>
          </AllSupMatProvider>
        </AllProcProdProvider>
      </AllCusProdProvider>
    </AllSupProdProvider>
  )
}

export default App;

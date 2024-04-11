//regular imports
import {Routes, Route} from 'react-router-dom';
import { Home } from "./components/Home";
import './styles/stylesMonster.css';
import './styles/tabsCSS.css';

//components
import {MapInfo} from './components/MapInfo';
import {Supplier} from './components/Supplier'
import {Customer} from './components/Customer'
import {Process} from './components/Process'
import {Inventory} from "./components/Inventory";
import {MatFlow} from "./components/MatFlow"

//contexts
import { ProcessProvider } from "./contexts/processContext";
import { InfoFlow } from "./components/infoFlow";
import { SupplierProvider } from "./contexts/supplierContext";
import { MapInfoProvider } from "./contexts/allMapInfoContext";
import { CustomerProvider } from "./contexts/customerContext";
import { CustomerMaterialFlowProvider } from "./contexts/customerMatContext";
import { AllSupplierProvider } from "./contexts/supHandlerContext";
import { AllProcessProvider } from './contexts/proHandlerContext';

function App () {

  return (
      <AllProcessProvider>
      <ProcessProvider>
      <AllSupplierProvider>
      <SupplierProvider>
      <MapInfoProvider>
      <CustomerProvider>
      <CustomerMaterialFlowProvider>
      
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
              path="/MaterialFlow/*"
              element={<MatFlow />}
            />
        
            <Route
            path="/InfoFlow/*"
            element = {<InfoFlow/>}
            />
          
        </Routes>    
      </CustomerMaterialFlowProvider>     
      </CustomerProvider>
      </MapInfoProvider>
      </SupplierProvider>
      </AllSupplierProvider>
      </ProcessProvider>
      </AllProcessProvider>
  )
}

export default App;

import React from "react";
import {Routes, Route, useLocation} from 'react-router-dom';
import { Home } from "./components/Home";
import './styles/stylesMonster.css';
import './styles/tabsCSS.css';
import {MapInfo} from './components/MapInfo';
import {Supplier} from './components/Supplier'
import {Customer} from './components/Customer'
import {Process} from './components/Process'
import { Inventory } from "./components/Inventory";
import { ProcessProvider } from "./contexts/processContext";
import {MatFlow} from "./components/MatFlow"
import { SupplierProvider } from "./contexts/supplierContext";
import { InfoFlow } from "./components/infoFlow";
import { MapInfoProvider } from "./contexts/allMapInfoContext";

interface AppProps {
  numberOfProcess: number;
}

function App({ numberOfProcess }: AppProps) {
  const location = useLocation ();

  return (
      <ProcessProvider>
      <SupplierProvider>
      <MapInfoProvider>
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
          {location.pathname === '/inventory' && (
          <Route
            path="/inventory/*"
            element={<Inventory />}
          />
          )}

          {location.pathname === '/MaterialFlow' && (
            <Route
              path="/MaterialFlow/*"
              element={<MatFlow />}
            />
          )}

          {location.pathname === '/InfoFlow' && (
            <Route
            path="/InfoFlow/*"
            element = {<InfoFlow/>}
            />
          )}

          
        </Routes> 
      </MapInfoProvider>
      </SupplierProvider>
      </ProcessProvider>
  )
}

export default App;

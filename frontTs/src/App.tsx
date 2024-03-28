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

interface AppProps {
  numberOfProcess: number;
}

function App({ numberOfProcess }: AppProps) {
  const location = useLocation ();

  return (
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
        element={<Inventory numberOfProcess={numberOfProcess} />}
      />
      )}
    </Routes>
  )
}

export default App;

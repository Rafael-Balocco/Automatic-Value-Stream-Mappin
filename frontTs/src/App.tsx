import React from "react";
import {Routes, Route} from 'react-router-dom';
import { Home } from "./components/Home";
import './styles/stylesMonster.css';
import './styles/tabsCSS.css';
import {MapInfo} from './components/MapInfo';
import {Supplier} from './components/Supplier'
import {Customer} from './components/Customer'
import {Process} from './components/Process'

function App() {

  return (
    <Routes>
      <Route path="/home" element = {<Home/>} />
      <Route path="/" element = {<Home/>} />
      <Route path="/home" element = {<Home/>} />
      <Route path="/mapInfos" element = {<MapInfo />} />
      <Route path="/supplier" element = {<Supplier />} />
      <Route path="/customer" element = {<Customer />} />
      <Route path="/process" element = {<Customer />} />
    </Routes>
  )
}

export default App

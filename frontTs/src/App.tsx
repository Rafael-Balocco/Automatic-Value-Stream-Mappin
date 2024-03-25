import React from "react";
import {Routes, Route} from 'react-router-dom';
import { Home } from "./components/Home";
import './styles/stylesMonster.css';
import './styles/tabsCSS.css';
import {MapInfo} from './components/MapInfo';

function App() {

  return (
    <Routes>
      <Route path="/home" element = {<Home/>} />
      <Route path="/" element = {<Home/>} />
      <Route path="/home.html" element = {<Home/>} />
      <Route path="/mapInfos.html" element = {<MapInfo />} />
    </Routes>
  )
}

export default App

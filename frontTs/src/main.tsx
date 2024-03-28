import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App numberOfProcess={0} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import {useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';

export const MapInfo = () => {

  const form = useForm()

  return (
    <div>
    <Header />
    <main>
        <div className="tabContainer">
          <ul>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a href="mapInfos.html" style={{ color: 'white' }}>Map Infos</a></li>
            <li><a>Supplier</a></li>
            <li><a>Customer</a></li>
            <li><a>Process Creation</a></li>
            <li><a>Inventory</a></li>
            <li><a>Material Flow Data</a></li>
            <li><a>Informational Flow Data</a></li>
          </ul>
        </div>
        <div className="tab">
          <h2>Basic Information</h2>

          <form id="mapInfoForm" action="/submit-form-mapInfo" method="POST" autoComplete="off">
            <br />
            <label htmlFor="enterpriseName">Enterprise Name:</label>
            <input type="text" id="enterpriseName" name="enterpriseName" />
            <br />
            <label htmlFor="creatorName">Creator Name:</label>
            <input type="text" id="creatorName" name="creatorName" required />
            <br />
            <div className="flex-container">
              <button type="submit">Send / Next Page</button>
            </div>
          </form>
        </div>

      </main>
    <Footer />
  </div>
  )
}

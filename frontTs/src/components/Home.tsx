import Header from './Header'
import Footer from './Footer'
import background from '../images/Benefits_VSM.png'

export const Home = () => {
  return (
    <div>
    <Header />
    <main>
      <div className="tabContainer">
        <ul>
          <li><a href="mapInfos.html">Map Infos</a></li>
          <li><a href="Sup1.html">Supplier</a></li>
          <li><a href="Sup2.html">Customer</a></li>
          <li><a href="process.html">Process Creation</a></li>
          <li><a href="inventory.html">Inventory</a></li>
          <li><a href="matFlow.html">Material Flow Data</a></li>
          <li><a href="infoFlow.html">Informational Flow Data</a></li>
        </ul>
      </div>
      <img src= {background} alt="background" className="background-section" />
      <div className="center-container">
        <a href="mapInfos" className="start-button">Start The Process!</a>
      </div>
    </main>
    <Footer />
  </div>
  )
}

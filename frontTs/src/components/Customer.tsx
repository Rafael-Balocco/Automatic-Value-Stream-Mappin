import {useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import { useCustomerContext } from '../contexts/customerContext';

type FormValues = {
    CustomerName: string
    demand: string
}

export const Customer = () => {

  const navigate = useNavigate(); // Instancia o hook useNavigate
  const {customerForm, updatecustomerForm} = useCustomerContext();
  const { register, formState, handleSubmit} = useForm({ defaultValues: customerForm });
  const {errors} = formState;

  const onSubmit = async (data:FormValues) =>{
    try{
      console.log('Form Submitted:', data);
      updatecustomerForm(data)
      navigate('/process'); // Redireciona para a página Sup1.html
    }
    catch(error){
      console.log("Error submitting form", error)
    }

  }

  const handlePrevious = () =>{
    navigate('/Supplier')
  }


  return (
    <div>
    <Header />
    <main>
        <div className="tabContainer">
          <ul>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Map Infos</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Supplier</a></li>
            <li style={{ backgroundColor: 'rgb(0, 99, 228)' }}><a style={{ color: 'white' }}>Customer</a></li>
            <li><a>Process Creation</a></li>
            <li><a>Inventory</a></li>
            <li><a>Material Flow Data</a></li>
            <li><a>Informational Flow Data</a></li>
          </ul>
        </div>
        <div className="tab">

          <form id="customerForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
          <div className="flex-container">
            <button type="submit">Submit / Next</button>
          </div>
          <div className='previousButton'>
            <button type="button" onClick={handlePrevious}>Previous</button>
          </div>
          <br/><br/>
          <h2>Customer</h2>
            <br />
            <label htmlFor="CustomerName">Customer Name:</label>
            <input type="text" id="CustomerName" {...register("CustomerName",{
                required:{
                    value:true,
                    message:"Customer Name is Required"
                }
            })}/>
            <p className='errorsValidation'>{errors.CustomerName?.message}</p>
            <br />
            <label htmlFor="demand">Daily Demand:</label>
            <input type="number" id="demand" {...register("demand", {
              required:{
                value:true,
                message:"Daily Demand is Required"
              }
            })} />
            <p className='errorsValidation'>{errors.demand?.message}</p>
            <br />

          </form>
        </div>
      </main>
    <Footer />
  </div>
  )
}

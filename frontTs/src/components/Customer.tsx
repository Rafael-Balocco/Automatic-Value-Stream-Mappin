import React from 'react';
import {useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

type FormValues = {
    CustomerName: string
    demand: string
}

export const Customer = () => {

  const navigate = useNavigate(); // Instancia o hook useNavigate
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit} = form;
  const {errors} = formState;

  const onSubmit = (data:FormValues) =>{
    console.log('Form Submitted:', data);
    navigate('/process'); // Redireciona para a página Sup1.html

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
          <h2>Customer</h2>

          <form id="customerForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
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
            <input type="text" id="demand" {...register("demand", {
              required:{
                value:true,
                message:"Daily Demand is Required"
              }
            })} />
            <p className='errorsValidation'>{errors.demand?.message}</p>
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

import React from 'react';
import {useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

type FormValues = {
  enterpriseName: string
  creatorName: string
}

export const MapInfo = () => {

  const navigate = useNavigate(); // Instancia o hook useNavigate
  const form = useForm<FormValues>();
  const { register, formState, handleSubmit} = form;
  const {errors} = formState;

  const onSubmit = (data:FormValues) =>{
    console.log('Form Submitted:', data);
    navigate('/supplier'); // Redireciona para a página Sup1.html
  }


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

          <form id="mapInfoForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <br />
            <label htmlFor="enterpriseName">Enterprise Name:</label>
            <input type="text" id="enterpriseName" {...register("enterpriseName")}/>
            <br />
            <label htmlFor="creatorName">Creator Name:</label>
            <input type="text" id="creatorName" {...register("creatorName",{
              required: {
                value: true,
                message: "Creator Name is Required",
              },
            })} />
            <p className='errorsValidation'>{errors.creatorName?.message}</p>
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

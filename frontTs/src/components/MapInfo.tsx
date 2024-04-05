import React from 'react';
import {useForm} from 'react-hook-form'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import axios from "axios";
import { useMapInfoContext } from '../contexts/allMapInfoContext';

type FormValues = {
  enterpriseName: string
  creatorName: string
}

export const MapInfo = () => {

  const navigate = useNavigate(); // Instancia o hook useNavigate
  const { formData, updateFormData } = useMapInfoContext(); // Use o contexto do componente MapInfo
  const { register, formState, handleSubmit} = useForm({ defaultValues: formData });
  const {errors} = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Form Submitted:', data);
      updateFormData(data)
      navigate('/Supplier')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


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

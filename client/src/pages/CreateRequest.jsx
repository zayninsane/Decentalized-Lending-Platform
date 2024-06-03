import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
//import { money } from "../assets";
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from "../utils";



const CreateRequest = () => {

  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
      const { createRequest } = useStateContext();
    const [form, setForm] = useState({
      name: '',
      title: '',
      description: '',
      amount: '',
      interest: '',
      deadline: '',
      image: ''
    });

    const handleFormFieldChange = (fieldName, e) => {
      setForm({...form, [fieldName]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      checkIfImage(form.image, async (exists) => {
        if (exists) {
          setIsLoading(true)
          await createRequest({ ...form, amount: ethers.utils.parseUnits(form.amount, 18)})
          setIsLoading(false);
          navigate('/');
        }else{
          alert('Input a valid image link')
          setForm({ ...form, image: ''});
        }
      })

      
    }
  return (
    <div className="bg-purple-500 flex justify-center items-center flex-col rounded-[10px] mt-8 sm:p-10 p-4">
      {isLoading && <Loader/> }
      <div className="flex justify-center items-center p-[16px] sm:min-w[380px] bg-purple-400 rounded-[10px] ">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">Create a loan Request</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]" action="">
        <div className="flex flex-col gap-[20px]">
          <FormField 
            labelName= "Loan Name*"
            placeholder= "Student Loan"
            inputType= "text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange ('name', e) }
          />
          <FormField 
               labelName= "Collateral*"
               placeholder= "Collateral Amount(%)"
               inputType= "number"
               value={form.title}
               handleChange={(e) => handleFormFieldChange ('title', e) }
          />
        </div>
         
        <FormField 
               labelName= "Reason*"
               placeholder= "Reason for Loan"
               isTextArea
               value={form.description}
               handleChange={(e) => handleFormFieldChange ('description', e) }
          />

          <FormField 
            labelName= "Amount*"
            placeholder= "ETH"
            inputType= "number"
            value={form.amount}
            handleChange={(e) => handleFormFieldChange ('amount', e) }
          />
          <FormField 
               labelName= "Interest*"
               placeholder= "(%)"
               inputType= "number"
               value={form.interest}
               handleChange={(e) => handleFormFieldChange ('interest', e) }
          />

          <FormField 
               labelName= "Duration*"
               placeholder= "Pickdate"
               inputType= "date"
               value={form.deadline}
               handleChange={(e) => handleFormFieldChange ('deadline', e) }
          />

          <FormField 
               labelName= "Loan Image*"
               placeholder= "Add Link"
               inputType= "url"
               value={form.image}
               handleChange={(e) => handleFormFieldChange ('image', e) }
          />

          <div className='flex justify-center items-center mt-[40px]'>
            <CustomButton 
            btnType="submit"
            title="Submit Request"
            styles="bg-gradient-to-r from-indigo-800 via-blue-800 to-violet-600"
            />
          </div>
          
      </form>
    </div>
  )
}

export default CreateRequest

import React from 'react'

import { tagType, threweb } from '../assets';
import { daysLeft } from '../utils';

const PayCard = ({ borrower, title, description, name, amount, deadline, amountCollected, image, handleClick}) => {
  
  const remainingDays = daysLeft(deadline);

    return (
    <div className='sm:w-[288px] w-full rounded-lg bg-purple-500 cursor-pointer' onClick={handleClick}>
      <img src={image} alt='fund' className='w-full h-[158px] object-cover rounded-lg'/>
      <div className='flex flex-col p-4'>
        <div className='flex flex-row items-center mb-[18px]'>
            <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain bg-slate-100 rounded-sm'/>
            <p className='ml-[13px] mt-[4px] font-epilogue font-medium text-[13px] text-semibold text-black'>Loan Details</p>
        </div>

        <div className='block '>
            <h3 className='font-epilogue font-semibold text-[18px] text-black text-left leading-[26px] truncate'>Collateral: {title}</h3>
            <h3 className='font-epilogue font-semibold text-[18px] text-black text-left leading-[26px] truncate'>{name}</h3>
            <p className='mt-[5px] font-epilogue font-normal font-[13px] text-zinc-800 text-left leading-[18px] truncate'>{description}</p>
        </div>

        <div className='flex justify-between flex-wrap mt-[15px] gap-4'>
            <div className='flex flex-col'>
               <h4 className='font-epilogue font-semibold text-[16px] text-neutral-900 leading-[22px] '>Recieved: {amountCollected}</h4> 
               <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-zinc-800 sm:max-w-[120px] truncate' >Requested: {amount}</p>
            </div>
            <div className='flex flex-col'>
               <h4 className='font-epilogue font-semibold text-[16px] text-neutral-900 leading-[22px] '>{remainingDays}</h4> 
               <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-zinc-800 sm:max-w-[120px] truncate' >Countdown</p>
            </div>
        </div>
        <div className='flex items-center mt-[20px] gap-[12px]'>
            <div className='w-[30px] h-[30px] flex justify-center items-center '>
                <img src={threweb} alt="lender" className='w-8 h-8 object-contain' />
            </div>
            <p className='flex-1 font-epilogue font-normal text-[12px] text-zinc-800 truncate '>Request Made by: <span className='text-zinc-800'>{borrower}</span></p>
        </div>
      </div>
    </div>
  )
}

export default PayCard

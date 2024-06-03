import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components'; 
import { calculateBarPercentage, daysLeft } from '../utils';
import { threweb } from '../assets';

const RequestDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { lend, getLendings, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [fund, setFund] = useState('')
  const [lenders, setLenders] = useState([]); 

  const remainingDays = daysLeft(state.deadline);

  const getLenders = async () => {
    const data = await getLendings(state.pId);

    setLenders(data);
  }

  useEffect(() => {
    if(contract) getLenders();
  }, [contract, address])

  const handleLend = async () => {
    setIsLoading(true);

    await lend(state.pId, fund);

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader/>}

      <div className='w-full flex md:flex-row flex-col mt-12 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="image" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative mt-4 rounded-lg w-full h-[5px] bg-purple-500'>
            <div className='absolute h-full bg-sky-600' style={{ width: `${calculateBarPercentage(state.amount, state.amountCollected)}%`, maxWidth: '100%'}}></div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title="Remaining Days" value={remainingDays}/>
          <CountBox title={`Recieved Amount: ${state.amount}`}value={state.amountCollected}/>
          <CountBox title="Lender" value={lenders.length}/>
        </div>
      </div>

      <div className='mt-[70px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div>
          <h4 className='font-epilogue font-semibold text-[20px] text-purple-500 '>Borrower</h4>

          <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
            <div className='w-[52px] h-[52px] flex items-center justify-center bg-transparent cursor-pointer'>
              <img src={threweb} alt="user" className='w-[60%] h-[60%] object-contain' />
            </div>
            <div>
              <h4 className='font-epilogue  text-[16px] font-semibold text-purple-500 '>{state.borrower}</h4>
            </div>
          </div>
          </div>

          <div>
          <h4 className='font-epilogue font-semibold text-[20px] text-purple-500  '>Reason</h4>

            <div className='mt-[10px]'>
              <p className='font-epilogue font-normal text-[12px] text-purple-300 leading-[26px] text-justify'>{state.description}</p>
            </div>
          </div>

          <div>
          <h4 className='font-epilogue font-semibold text-[20px] text-purple-500  '>Lender Account</h4>

            <div className='mt-[10px] flex flex-col gap-4'>
                {lenders.length > 0 ? lenders.map((item, index) => (
                  <div key={`${item.lender}-${index}`} className='flex justify-between items-center gap-4'>
                    <p className='font-epilogue font-normal text-[16px] text-purple-400 leading-[26px] break-11'>{index + 1}. {item.lender}</p>
                    LENDER
                  </div>
                )) : (
                  <p className='font-epilogue font-normal text-[12px] text-purple-300 leading-[26px] text-justify'>Loan has not been funded</p>
                )}


            </div>
          </div>

        </div>

        <div className='flex-1'>
        <h4 className='font-epilogue font-semibold text-[20px] text-purple-500  '>Fund Loan</h4>

        <div className='mt-[10px] flex flex-col p-4 bg-neutral-700 rounded-lg  '>
          <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-purple-500'>Accept</p>
          <div className='mt-[30px]'>
                <input type="number" placeholder='Fund loan request in ETH' step='0.01' className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-purple-700 bg-transparent font-epilogue text-purple-400 text-[18px] leading-[30px] placeholder:text-purple-700 rounded-lg  ' value={fund}
                onChange={(e) => setFund(e.target.value)}  />
          </div>
          

          <CustomButton 
            btnType="button"
            title="Fund"
            styles="mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            handleClick={handleLend}
          />
        </div>

        <div className='mt-[10px] flex flex-col p-4 bg-neutral-700 rounded-lg  '>
          <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-purple-500'>Repay Loan</p>
          <div className='mt-[30px]'>
                <input type="number" placeholder='Repay loan in ETH' step='0.01' className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-purple-700 bg-transparent font-epilogue text-purple-400 text-[18px] leading-[30px] placeholder:text-purple-700 rounded-lg  ' value={fund}
                onChange={(e) => setFund(e.target.value)}  />
          </div>
          

          <CustomButton 
            btnType="button"
            title="Repay"
            styles="mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            handleClick={handleLend}
          />
        </div>
        </div>
      </div>
    </div>
  )
}

export default RequestDetails

import React from 'react'
import { useNavigate } from 'react-router-dom';

import PayCard from './PayCard';
import { loader } from '../assets';

const ShowRequests = ({ title, isLoading, requests }) => {
    const navigate = useNavigate();

    const handleNavigate = (request) => {
        navigate(`/request-details/${request.title}`, {state:request})
    }
  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[24px] text-purple-500 text-center mt-10'>{title} ({requests.length})</h1>

        <div className='flex flex-wrap mt-[20px] gap-[34px]'>
            {isLoading && (
                <img src={loader} alt="loader"  className='w-[100px] h-[100px] object-contain' />
            )}

            {!isLoading && requests.length === 0 && (
                <p className='font-epilogue font-semibold text-[18px] text-center text-white'>
                    No Loan Requests Made .
                </p>
            )}
            {!isLoading && requests.length > 0 && requests.map 
            ((request) => ( <PayCard
            key={request.id}
            {...request}
            handleClick={() => {handleNavigate(request)
            }}
            />
        ))}
        </div>

    </div>
  )
}

export default ShowRequests

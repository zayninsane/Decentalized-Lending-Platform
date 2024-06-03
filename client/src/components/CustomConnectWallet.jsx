import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ConnectWallet } from '@thirdweb-dev/react';
import CustomButton from './CustomButton';
import { useStateContext } from '../context';

const CustomConnectWallet = () => {
    const navigate = useNavigate();
    const { address } = useStateContext();

  return (
    <div>
      {address ? (
        <CustomButton 
        btnType="button"
        title="Create Request"
        styles={address ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-[#8c6dfd]' }
        handleClick={() => navigate ('create-campaign')}
        />
      ): (
        <ConnectWallet styles={'bg-purple-500'}
        //accentColor="#1dc071"
        //colorMode="light"
        //showOption
        />
      )}
    </div>
  )
}

export default CustomConnectWallet

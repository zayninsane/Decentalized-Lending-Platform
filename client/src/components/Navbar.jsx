import React, { useState }from 'react'
import { Form, Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { ConnectWallet } from '@thirdweb-dev/react';
import { dashboard, logo, menu, search, threweb } from '../assets';
import { navlinks } from "../constants";


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(dashboard);

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { address } = useStateContext();

    return (
    <div className="flex md:flex-row flex-col-reverse justify-between-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[100px]">
            <input type="text" placeholder="Search Loan Request" className="flex w-full font-epilouge font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-violet-600 flex justify-center items-center cursor-pointer">
          <img src={search} alt='search' className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>
      
      <div className="sm:flex hidden flex-row justify-end gap-4">
      
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
      
      
         

        <Link to = "/profile">
            <div className="w-[52px] h-[52px] rounded-10px bg-transparent flex justify-center items-center cursor-pointer ">
              <img src={threweb} alt="user" className = "w-[60%] h-[60%] object-contain" />
            </div>
        </Link>

      </div>

          <div className="sm:hidden  flex justify-between items-center relative">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-transparent flex justify-center items-center cursor-pointer ">
              <img src={threweb} alt="user" className = "w-[60%] h-[60%] object-contain" />
            </div>

            <img
            src={menu}
            alt='menu'
            className="w-[34px] h-[34px] object-contain cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
            />

            <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
              <ul className="mb-4">
                {navlinks.map((Link) => (
                 <li 
                 key={Link.name}
                 className={`flex p-4 ${isActive === Link.name && 'bg-[#3a3a43]'
                 }`}
                 onClick={() => {
                  setIsActive(Link.name);
                  setToggleDrawer(false);
                  navigate(Link.link);
                 }}>

                    <img
                        src={Link.imgUrl}
                        alt={Link.name}
                        className={`w-[24px] h-[24px]
                        object-contain ${isActive === Link.name ? 'grayscale-0' : 'grayscale'}`}
                    />
                      <p className={` ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === Link.name ? 'text-purple-500' : 'text-[#808191]' }`} >
                        {Link.name}
                      </p>
                 </li> 
                ))}
              </ul>

              <div className="flex mx-4">
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
            </div>
          </div>

    </div>
  )
}

export default Navbar

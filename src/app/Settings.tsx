import React, { useState } from 'react'
import Sidenav from "./components/Sidenav";
import notify from "../images/ri_notification-4-line.png";
import profile from '../images/ProfilePic.png'
import { Link } from "react-router-dom";
import searchIcon from '../images/ic_round-search.svg'
import on from '../images/SwitcherOn.svg'
import off from '../images/SwitcherOff.svg'


export default function Settings() {
    const [isOn, setIsOn] = useState(true);
    const [isOn2, setIsOn2] = useState(true);
    const [isOn3, setIsOn3] = useState(true);
    const [isOn4, setIsOn4] = useState(true);
    

  
  const toggleImage = () => {
    setIsOn(!isOn);
  }
  const toggleImage2 = () => {
    setIsOn2(!isOn2);
  }
  const toggleImage3 = () => {
    setIsOn3(!isOn3);
  }
  const toggleImage4 = () => {
    setIsOn4(!isOn4);
  }
  
    return (
      <div
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '400',
      }}
      >
        <div className='  items-center w-full '>
          <div className=' flex text-center'>
            <h1
                     style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: '500',
                  }}
              className=' w-full md:mt-[50px] mt-[30px] md:ml-[40px] text-[#263A5C] text-bold text-[20px]'>Settings</h1>
            <div className='flex p-[5px] md:mr-[20px] md:mt-[20px]  ml-auto'>
              <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
              <Link to='/profile'>
                <img src={profile} alt="" className='m-[3px]' />
              </Link>
            </div>
          </div>
        </div>
        <div className='flex w-fit m-auto mt-[30px] bg-[#F2F2F2] rounded-lg p-1' >
          <img src={searchIcon} alt="" className='w-[20px] md:w-[40px]' />
          <input className='bg-[#F2F2F2] w-[20rem] rounded-md p-1 md:p-3 outline-none' type="text" placeholder='search' />
        </div>
        <div className=' h-[45vh] sm:h-[50vh]  w-4/5 m-auto mt-[30px]  flex flex-col justify-between'>
  <div className='flex items-center '>
    <div>
      <b><h1>Notification</h1> </b>
      <p>Allow notifications from this app</p>
    </div>
    <img onClick={toggleImage} className='ml-auto hover:cursor-pointer' src={isOn ? on : off} alt="" />
  </div>
  <div className='flex items-center'>
    <b><p>Show notifications from this app</p></b> 
    <img onClick={toggleImage2} className='ml-auto hover:cursor-pointer' src={isOn2 ? on : off} alt="" />
  </div>
  <div className='flex items-center'>
  <div>
     <b><h1>Sounds</h1> </b>  
      <p>None</p>
    </div>
    <img onClick={toggleImage3} className='ml-auto hover:cursor-pointer' src={isOn3 ? on : off} alt="" />
  </div>
  <div className='flex items-center'>
   <b><p>Vibrate</p></b> 
    <img onClick={toggleImage4} className='ml-auto hover:cursor-pointer' src={isOn4 ? on : off} alt="" />
          </div>
  <p>Change email adress</p>
  <p>Reset Password</p>        
</div>

      </div>
    )
  }

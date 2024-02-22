import React from 'react'
import Sidenav from "./components/Sidenav";
import notify from "../images/ri_notification-4-line.png";
import profile from '../images/ProfilePic.png'
import searchIcon from '../images/ic_round-search.svg'
import bigIcon from '../images/ProfilePic.svg'
import notification from '../images/clarity_notification-solid.svg'
import { Link } from "react-router-dom";


export default function Notification() {
  return (
    <div className='sm:flex'>
      {/* <Sidenav /> */}
      <div className='  items-center w-full'>
      <div className=' flex '>
          <h1 className=' sm:m-auto md:w-full md:mt-[50px]  md:ml-[40px] text-[#263A5C] text-[20px]'>Notification</h1>
          <div className='flex p-[5px] mr-[20px] mt-[20px]'>
          <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
          <Link to='/profile'>
          <img src={profile} alt="" className='m-[3px]'/>          
          </Link>
          </div>
        </div>
        <div >
          <div className='flex w-fit m-auto mt-[30px] bg-[#F2F2F2] rounded-lg p-1' >
            <img src={searchIcon} alt=""className='w-[20px] md:w-[40px]'  />
            <input className='bg-[#F2F2F2] w-[20rem] rounded-md p-1 md:p-3 outline-none' type="text" placeholder='search' />
          </div>
          <div className=' w-fit m-auto mt-[50px]'>
            <div className='flex'>
            <img src={bigIcon} alt="" className='p-[5px] w-[90px]' />
            <h1 className='m-auto text-[30px] p-[5px]'>Tosin Poppins</h1>
            </div>
          <p className='ml-[30px] mb-[30px] text-[25px]'>789001827</p>
          </div>
          <div>
          <div
            style={{
              borderLeft: '1px rgba(161,164,170 ,0.5)  solid',
              boxShadow:'3px 4px 2px rgba(161,164,170 ,0.5)'

            }}
            className='flex m-auto mt-[15px] w-4/5 p-[5px] rounded-md'>
            <img src={notification} alt="" className='w-[25px] h-[25px]  md:w-[50px] md:h-[50px] p-[1px] mt-auto mb-auto mr-[20px] ml-[20px]' />
            <div>
              <p className='text-[#464E5F] w-full text-[18px] md:text-[30px] md:pr-[2rem] '>Congratulations You completed today’s task</p>
              <span className='text-[#A1A4AA] ml-[3px] '>2:00pm</span>
            </div>
          </div> 
          </div>
          <div>
          <div
            style={{
              borderLeft: '1px rgba(161,164,170 ,0.5)  solid',
              boxShadow:'3px 4px 2px rgba(161,164,170 ,0.5)'

            }}
            className='flex m-auto mt-[15px] w-4/5 p-[5px] rounded-md'>
            <img src={notification} alt="" className='w-[25px] h-[25px]  md:w-[50px] md:h-[50px] p-[1px] mt-auto mb-auto mr-[20px] ml-[20px]' />
            <div>
              <p className='text-[#464E5F] w-full text-[18px] md:text-[30px] md:pr-[2rem] '>Congratulations You completed today’s task</p>
              <span className='text-[#A1A4AA] ml-[3px] '>2:00pm</span>
            </div>
          </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
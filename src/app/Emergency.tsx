import React from 'react'
import { Link } from 'react-router-dom'
import Sidenav from "./components/Sidenav";
import notify from "../images/ri_notification-4-line.svg";
import profile from '../images/profilepic2.svg'
import contact from '../images/mdi_contact.svg'
import compass from '../images/compass.svg'
import Map from './components/Map'
import emergency from '../images/jam_triangle-danger-f.svg'

export default function Settings() {
  return (
    <div
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '300',
  }}
    >
      <div className=' flex text-center '>
          <h1 className=' w-fit md:mt-[50px] font-medium mt-[30px] ml-[40%] md:ml-[40px] text-[#263A5C] text-[20px]'>Emergency</h1>
          <div className='flex p-[5px] md:mr-[20px] md:mt-[20px] mr-[30px] mt-[15px] ml-auto'>
            <Link to='/notification'>
            <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
            </Link>
          <Link to='/profile'>
          <img src={profile} alt="" className='m-[3px]  w-[30px] h-[30px]'/>          
          </Link>
        </div>
        </div>
        <div className=' m-auto w-[fit]'>
        <div
          style={{
          boxShadow:'2px 2px 3px rgba(0, 0 ,0 ,0.5)'
          }}
          className=' w-[22rem] flex bg-white m-auto mt-[30px] p-[6px] '>
          <img className='ml-4' src={contact} alt="" />
          <div className='m-auto text-[18px]'>
            <p>Tosin Poppins</p>
            <p className='text-gray-400'>tosinpoppins@gmail.com</p>
          </div>
          <img className='ml-auto mr-3 mt-[10px]' src={compass} alt="" />
        </div>
        <div
          style={{
          boxShadow:'2px 2px 3px rgba(0, 0 ,0 ,0.5)'
          }}
          className='w-[22rem] flex bg-white m-auto mt-[30px] p-[6px] '>
          <img className='ml-4' src={contact} alt="" />
          <div className='m-auto text-[18px]'>
            <p>Tosin Poppins</p>
            <p className='text-gray-400'>tosinpoppins@gmail.com</p>
          </div>
          <img className='ml-auto mr-3 mt-[10px]' src={compass} alt="" />
        </div>
        <Map></Map>
      </div>
      <img src={emergency} className='m-auto mt-[30px]' alt="" />
    </div>
  )
}